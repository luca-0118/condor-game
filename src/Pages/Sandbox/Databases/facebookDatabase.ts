import initSqlJs from 'sql.js'
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import facebookSql from './Facebook.sql?raw'
import type { SocialUser } from '../../../data/socialUser'

const profileAssets = import.meta.glob<string>('../Insta/assets/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
  query: '?url',
})

type SqlRow = (number | string | Uint8Array | null)[]

type FacebookPostMedia = {
  id: number
  mediaType: string
  url: string
  alt?: string
}

export type FacebookPost = {
  id: number
  userId: number
  text: string
  location?: string
  postedAt: string
  reactionCount: number
  shareCount: number
  media: FacebookPostMedia[]
}

let sqlPromise: ReturnType<typeof initSqlJs> | undefined
let usersPromise: Promise<SocialUser[]> | undefined

async function openDatabase() {
  sqlPromise ??= initSqlJs({ locateFile: () => sqlWasmUrl })
  const SQL = await sqlPromise
  const database = new SQL.Database()
  database.run(facebookSql)
  return database
}

function mapFacebookUserRow(row: SqlRow, index: number): SocialUser {
  const [
    id,
    username,
    name,
    bio,
    profilePicture,
    verified,
    followers,
    website,
    category,
    location,
  ] = row

  if (
    typeof id !== 'number' ||
    typeof username !== 'string' ||
    typeof name !== 'string' ||
    (bio !== null && typeof bio !== 'string') ||
    (profilePicture !== null && typeof profilePicture !== 'string') ||
    typeof verified !== 'number' ||
    typeof followers !== 'number' ||
    (website !== null && typeof website !== 'string') ||
    (category !== null && typeof category !== 'string') ||
    (location !== null && typeof location !== 'string')
  ) {
    throw new Error(`Facebook database contains an invalid user record at row ${index + 1}.`)
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
    const avatar = profileAssets[`../Insta/assets/${profilePicture}`]
    if (!avatar) {
      throw new Error(`Facebook database references an unknown profile image: ${profilePicture}.`)
    }
    user.avatar = avatar
  }
  if (typeof website === 'string') user.website = website
  if (typeof category === 'string') user.category = category
  if (typeof location === 'string') user.location = location

  return user
}

export function loadFacebookUsers(): Promise<SocialUser[]> {
  usersPromise ??= (async () => {
    const database = await openDatabase()

    try {
      const [result] = database.exec(`
        SELECT
          id, username, full_name, bio, profile_pic_filename, is_verified,
          followers_count, website_url, category, current_city
        FROM users
        ORDER BY id
      `)

      return (result?.values ?? []).map((row, index) => mapFacebookUserRow(row, index))
    } finally {
      database.close()
    }
  })()

  return usersPromise
}

export async function loadFacebookPosts(userId: number): Promise<FacebookPost[]> {
  const database = await openDatabase()

  try {
    const statement = database.prepare(`
      SELECT id, user_id, text, location_name, posted_at, reaction_count, share_count
      FROM posts
      WHERE user_id = ? AND visibility = 'public'
      ORDER BY posted_at DESC, id DESC
    `)
    statement.bind([userId])
    const posts: FacebookPost[] = []
    const postsById = new Map<number, FacebookPost>()

    while (statement.step()) {
      const [id, postUserId, text, location, postedAt, reactionCount, shareCount] =
        statement.get()
      if (
        typeof id !== 'number' ||
        typeof postUserId !== 'number' ||
        (text !== null && typeof text !== 'string') ||
        (location !== null && typeof location !== 'string') ||
        typeof postedAt !== 'string' ||
        typeof reactionCount !== 'number' ||
        typeof shareCount !== 'number'
      ) {
        throw new Error('Facebook database contains an invalid post record.')
      }

      const post: FacebookPost = {
        id,
        userId: postUserId,
        text: text ?? '',
        postedAt,
        reactionCount,
        shareCount,
        media: [],
      }
      if (typeof location === 'string') post.location = location
      posts.push(post)
      postsById.set(id, post)
    }

    statement.free()

    const mediaStatement = database.prepare(`
      SELECT m.id, m.post_id, m.media_type, m.filename, m.alt_text
      FROM post_media m
      JOIN posts p ON p.id = m.post_id
      WHERE p.user_id = ? AND p.visibility = 'public'
      ORDER BY m.post_id, m.position
    `)
    mediaStatement.bind([userId])

    while (mediaStatement.step()) {
      const [id, postId, mediaType, filename, alt] = mediaStatement.get()
      if (
        typeof id !== 'number' ||
        typeof postId !== 'number' ||
        typeof mediaType !== 'string' ||
        typeof filename !== 'string' ||
        (alt !== null && typeof alt !== 'string')
      ) {
        throw new Error('Facebook database contains an invalid post media record.')
      }

      const post = postsById.get(postId)
      if (!post) {
        throw new Error(`Facebook database contains media for missing post ID ${postId}.`)
      }

      const url = profileAssets[`../Insta/assets/${filename}`]
      if (!url) {
        throw new Error(`Facebook database references an unknown post image: ${filename}.`)
      }

      const media: FacebookPostMedia = { id, mediaType, url }
      if (typeof alt === 'string') media.alt = alt
      post.media.push(media)
    }

    mediaStatement.free()
    return posts
  } finally {
    database.close()
  }
}
