import initSqlJs from 'sql.js'
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import instagramSql from './Instagram.sql?raw'
import type { SocialUser } from '../../../data/socialUser'
import type {
  SocialHighlight,
  SocialPost,
  SocialPostMedia,
  SocialProfile,
} from '../../../data/socialPost'

// Media referenced from the database is resolved from the Insta assets folder.
// Files in subfolders are stored with their relative path, e.g. 'posts/photo.png'.
const mediaAssets = import.meta.glob<string>('../Insta/assets/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?url',
})

type SqlRow = (number | string | Uint8Array | null)[]

let sqlPromise: ReturnType<typeof initSqlJs> | undefined
let usersPromise: Promise<SocialUser[]> | undefined
const profilePromises = new Map<string, Promise<SocialProfile | undefined>>()
const postsPromises = new Map<number, Promise<SocialPost[]>>()

async function openDatabase() {
  sqlPromise ??= initSqlJs({ locateFile: () => sqlWasmUrl })
  const SQL = await sqlPromise
  const database = new SQL.Database()
  database.run(instagramSql)
  return database
}

function resolveMediaUrl(filename: string): string {
  const url = mediaAssets[`../Insta/assets/${filename}`]
  if (!url) {
    throw new Error(`Instagram database references an unknown media file: ${filename}.`)
  }
  return url
}

function mapUserRow(row: SqlRow, index: number): SocialUser {
  const [id, username, name, bio, profilePicture, verified, followers] = row

  if (
    typeof id !== 'number' ||
    typeof username !== 'string' ||
    typeof name !== 'string' ||
    (bio !== null && typeof bio !== 'string') ||
    (profilePicture !== null && typeof profilePicture !== 'string') ||
    typeof verified !== 'number' ||
    typeof followers !== 'number'
  ) {
    throw new Error(`Instagram database contains an invalid user record at row ${index + 1}.`)
  }

  const user: SocialUser = {
    id,
    username,
    name,
    bio: bio ?? '',
    followers,
    verified: verified === 1,
  }

  if (typeof profilePicture === 'string') {
    user.avatar = resolveMediaUrl(profilePicture)
  }

  return user
}

export function loadInstagramUsers(): Promise<SocialUser[]> {
  usersPromise ??= (async () => {
    const database = await openDatabase()

    try {
      const [result] = database.exec(`
        SELECT id, username, full_name, bio, profile_pic_filename, is_verified, followers_count
        FROM users
        ORDER BY id
      `)

      return (result?.values ?? []).map((row, index) => mapUserRow(row, index))
    } finally {
      database.close()
    }
  })()

  return usersPromise
}

// Profile for one user: account info, post/following counts and story highlights.
export function loadInstagramProfile(username: string): Promise<SocialProfile | undefined> {
  let promise = profilePromises.get(username)

  promise ??= (async () => {
    const database = await openDatabase()

    try {
      const statement = database.prepare(`
        SELECT
          u.id, u.username, u.full_name, u.bio, u.profile_pic_filename, u.is_verified, u.followers_count,
          (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id),
          (SELECT COUNT(*) FROM follows f WHERE f.follower_id = u.id),
          u.category, u.website_url
        FROM users u
        WHERE u.username = ?
      `)
      statement.bind([username])
      const row = statement.step() ? statement.get() : undefined
      statement.free()

      if (!row) {
        return undefined
      }

      const user = mapUserRow(row, 0)
      const postCount = row[7]
      const following = row[8]
      const category = row[9]
      const website = row[10]

      if (
        typeof postCount !== 'number' ||
        typeof following !== 'number' ||
        (category !== null && typeof category !== 'string') ||
        (website !== null && typeof website !== 'string')
      ) {
        throw new Error('Instagram database returned invalid profile statistics.')
      }

      // Real users following this profile, for the "Gevolgd door ..." row.
      // Synthetic follower ids (1000+) have no user row, so the join skips them.
      const followedByStatement = database.prepare(`
        SELECT u.id, u.username, u.full_name, u.bio, u.profile_pic_filename, u.is_verified, u.followers_count
        FROM follows f
        JOIN users u ON u.id = f.follower_id
        WHERE f.followee_id = ?
        ORDER BY u.followers_count DESC
        LIMIT 2
      `)
      followedByStatement.bind([user.id])
      const followedBy: SocialUser[] = []

      while (followedByStatement.step()) {
        followedBy.push(mapUserRow(followedByStatement.get(), followedBy.length))
      }
      followedByStatement.free()

      const highlightsStatement = database.prepare(`
        SELECT id, highlight_title, media_filename
        FROM stories
        WHERE user_id = ? AND is_highlight = 1 AND highlight_title IS NOT NULL
        ORDER BY id
      `)
      highlightsStatement.bind([user.id])
      const highlights: SocialHighlight[] = []

      while (highlightsStatement.step()) {
        const [id, title, cover] = highlightsStatement.get()

        if (
          typeof id !== 'number' ||
          typeof title !== 'string' ||
          (cover !== null && typeof cover !== 'string')
        ) {
          throw new Error('Instagram database contains an invalid story highlight record.')
        }

        const highlight: SocialHighlight = { id, title }
        if (typeof cover === 'string') {
          highlight.coverUrl = resolveMediaUrl(cover)
        }
        highlights.push(highlight)
      }
      highlightsStatement.free()

      const profile: SocialProfile = { ...user, postCount, following, highlights, followedBy }
      if (typeof category === 'string') {
        profile.category = category
      }
      if (typeof website === 'string') {
        profile.website = website
      }
      return profile
    } finally {
      database.close()
    }
  })()

  profilePromises.set(username, promise)
  return promise
}

// All posts of one user, newest first, including media and like/comment counts.
export function loadInstagramPosts(userId: number): Promise<SocialPost[]> {
  let promise = postsPromises.get(userId)

  promise ??= (async () => {
    const database = await openDatabase()

    try {
      const postsStatement = database.prepare(`
        SELECT
          p.id, p.user_id, p.caption, p.location_name, p.posted_at,
          (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id),
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id)
        FROM posts p
        WHERE p.user_id = ?
        ORDER BY p.posted_at DESC, p.id DESC
      `)
      postsStatement.bind([userId])
      const posts: SocialPost[] = []
      const postsById = new Map<number, SocialPost>()

      while (postsStatement.step()) {
        const [id, postUserId, caption, location, postedAt, likeCount, commentCount] =
          postsStatement.get()

        if (
          typeof id !== 'number' ||
          typeof postUserId !== 'number' ||
          (caption !== null && typeof caption !== 'string') ||
          (location !== null && typeof location !== 'string') ||
          typeof postedAt !== 'string' ||
          typeof likeCount !== 'number' ||
          typeof commentCount !== 'number'
        ) {
          throw new Error('Instagram database contains an invalid post record.')
        }

        const post: SocialPost = {
          id,
          userId: postUserId,
          caption: caption ?? '',
          postedAt,
          likeCount,
          commentCount,
          media: [],
        }
        if (typeof location === 'string') {
          post.location = location
        }
        posts.push(post)
        postsById.set(id, post)
      }
      postsStatement.free()

      const mediaStatement = database.prepare(`
        SELECT m.id, m.post_id, m.position, m.media_type, m.filename, m.alt_text
        FROM post_media m
        JOIN posts p ON p.id = m.post_id
        WHERE p.user_id = ?
        ORDER BY m.post_id, m.position
      `)
      mediaStatement.bind([userId])

      while (mediaStatement.step()) {
        const [id, postId, position, mediaType, filename, alt] = mediaStatement.get()

        if (
          typeof id !== 'number' ||
          typeof postId !== 'number' ||
          typeof position !== 'number' ||
          typeof mediaType !== 'string' ||
          typeof filename !== 'string' ||
          (alt !== null && typeof alt !== 'string')
        ) {
          throw new Error('Instagram database contains an invalid post media record.')
        }

        const media: SocialPostMedia = {
          id,
          position,
          mediaType,
          url: resolveMediaUrl(filename),
        }
        if (typeof alt === 'string') {
          media.alt = alt
        }
        postsById.get(postId)?.media.push(media)
      }
      mediaStatement.free()

      return posts
    } finally {
      database.close()
    }
  })()

  postsPromises.set(userId, promise)
  return promise
}
