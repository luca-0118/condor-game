import initSqlJs from 'sql.js'
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import instagramSql from './Instagram.sql?raw'
import type { SocialUser } from '../../../data/socialUser'

const profilePictures = import.meta.glob<string>('../Insta/assets/*.png', {
  eager: true,
  import: 'default',
  query: '?url',
})

let usersPromise: Promise<SocialUser[]> | undefined

export function loadInstagramUsers(): Promise<SocialUser[]> {
  usersPromise ??= (async () => {
    const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl })
    const database = new SQL.Database()

    try {
      database.run(instagramSql)
      const [result] = database.exec(`
        SELECT id, username, full_name, bio, profile_pic_filename, is_verified, followers_count
        FROM users
        ORDER BY id
      `)

      return (result?.values ?? []).map((row, index) => {
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
          const avatar = profilePictures[`../Insta/assets/${profilePicture}`]
          if (!avatar) {
            throw new Error(`Instagram database references an unknown profile picture: ${profilePicture}.`)
          }
          user.avatar = avatar
        }

        return user
      })
    } finally {
      database.close()
    }
  })()

  return usersPromise
}
