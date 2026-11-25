import { randomUUID } from 'node:crypto'
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Buffer } from 'node:buffer'
import type { IncomingMessage, ServerResponse } from 'node:http'
import initSqlJs, { type Database, type SqlValue } from 'sql.js'
import type { Plugin } from 'vite'

type Platform = 'facebook' | 'instagram'
type JsonRecord = Record<string, unknown>

class AdminApiError extends Error {
  readonly status: number

  constructor(
    message: string,
    status = 400,
  ) {
    super(message)
    this.status = status
  }
}

const root = process.cwd()
const assetDirectory = resolve(root, 'src', 'Pages', 'Sandbox', 'Insta', 'assets')
const assetAdminDirectory = resolve(assetDirectory, 'admin')
const sqlFiles: Record<Platform, string> = {
  facebook: resolve(root, 'src', 'Pages', 'Sandbox', 'Databases', 'Facebook.sql'),
  instagram: resolve(root, 'src', 'Pages', 'Sandbox', 'Databases', 'Instagram.sql'),
}
const wasmPath = resolve(root, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm')
let sqlPromise: ReturnType<typeof initSqlJs> | undefined
let writeQueue = Promise.resolve()

function platformFrom(value: string | null): Platform {
  if (value === 'facebook' || value === 'instagram') return value
  throw new AdminApiError('Choose Facebook or Instagram.')
}

function assertLocalMutation(request: IncomingMessage) {
  const remoteAddress = request.socket.remoteAddress
  if (
    !remoteAddress ||
    !['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remoteAddress)
  ) {
    throw new AdminApiError('SQL edits are allowed only from this computer.', 403)
  }
  const origin = request.headers.origin
  if (origin && new URL(origin).host !== request.headers.host) {
    throw new AdminApiError('SQL edits must come from the local admin page.', 403)
  }
}

function sendJson(response: ServerResponse, status: number, value: unknown) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(value))
}

async function readJson(request: IncomingMessage): Promise<JsonRecord> {
  const chunks: Buffer[] = []
  let totalBytes = 0

  for await (const chunk of request) {
    const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    totalBytes += data.byteLength
    if (totalBytes > 3 * 1024 * 1024) {
      throw new AdminApiError('The request is too large. Profile images must be under 2 MB.')
    }
    chunks.push(data)
  }

  let value: unknown
  try {
    value = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new AdminApiError('The request body must be valid JSON.')
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new AdminApiError('The request body must be a JSON object.')
  }
  return value as JsonRecord
}

function requiredString(
  value: unknown,
  label: string,
  maxLength: number,
  allowEmpty = false,
): string {
  if (typeof value !== 'string') {
    throw new AdminApiError(`${label} must be text.`)
  }
  const result = value.trim()
  if ((!allowEmpty && !result) || result.length > maxLength) {
    throw new AdminApiError(
      `${label} ${result ? `must be ${maxLength} characters or fewer` : 'is required'}.`,
    )
  }
  return result
}

function optionalString(value: unknown, label: string, maxLength: number): string | null {
  if (value === undefined || value === null || value === '') return null
  return requiredString(value, label, maxLength, true) || null
}

function numberValue(value: SqlValue, label: string): number {
  if (typeof value !== 'number') throw new Error(`Invalid ${label} in the SQL seed data.`)
  return value
}

function stringValue(value: SqlValue, label: string): string {
  if (typeof value !== 'string') throw new Error(`Invalid ${label} in the SQL seed data.`)
  return value
}

function nullableString(value: SqlValue): string | null {
  if (value === null) return null
  if (typeof value !== 'string') throw new Error('Invalid text value in the SQL seed data.')
  return value
}

function sqlLiteral(value: string | number | null): string {
  if (value === null) return 'NULL'
  if (typeof value === 'number') return String(value)
  return `'${value.replaceAll("'", "''")}'`
}

function upsertSql(table: string, columns: string[], values: (string | number | null)[]) {
  const names = columns.map((column) => `"${column}"`).join(', ')
  const row = values.map(sqlLiteral).join(', ')
  const updates = columns
    .filter((column) => column !== 'id')
    .map((column) => `"${column}" = excluded."${column}"`)
    .join(', ')
  return `INSERT INTO "${table}" (${names}) VALUES (${row}) ON CONFLICT("id") DO UPDATE SET ${updates};`
}

function selectRows(
  database: Database,
  sql: string,
  parameters: (string | number | null)[] = [],
): SqlValue[][] {
  const statement = database.prepare(sql)
  statement.bind(parameters)
  const rows: SqlValue[][] = []
  while (statement.step()) rows.push(statement.get())
  statement.free()
  return rows
}

async function openDatabase(platform: Platform) {
  sqlPromise ??= initSqlJs({ locateFile: () => wasmPath })
  const SQL = await sqlPromise
  const database = new SQL.Database()
  try {
    database.run(await readFile(sqlFiles[platform], 'utf8'))
    return database
  } catch (error) {
    database.close()
    throw error
  }
}

async function getData(platform: Platform) {
  const database = await openDatabase(platform)
  try {
    const instagram = platform === 'instagram'
    const userRows = selectRows(
      database,
      instagram
        ? `SELECT id, username, full_name, bio, profile_pic_filename, location_text, is_private
           FROM users ORDER BY full_name COLLATE NOCASE, id`
        : `SELECT id, username, full_name, bio, profile_pic_filename, current_city
           FROM users ORDER BY full_name COLLATE NOCASE, id`,
    )
    const users = userRows.map((row) => ({
      id: numberValue(row[0], 'user id'),
      username: stringValue(row[1], 'username'),
      name: stringValue(row[2], 'full name'),
      bio: nullableString(row[3]) ?? '',
      profilePicFilename: nullableString(row[4]),
      location: nullableString(row[5]),
      isPrivate: instagram ? numberValue(row[6], 'privacy setting') === 1 : false,
    }))
    const postRows = selectRows(
      database,
      instagram
        ? `SELECT id, user_id, caption, location_name, posted_at
           FROM posts ORDER BY posted_at DESC, id DESC`
        : `SELECT id, user_id, text, location_name, posted_at
           FROM posts ORDER BY posted_at DESC, id DESC`,
    )
    const posts = postRows.map((row) => ({
      id: numberValue(row[0], 'post id'),
      userId: numberValue(row[1], 'post user id'),
      text: nullableString(row[2]) ?? '',
      location: nullableString(row[3]),
      postedAt: stringValue(row[4], 'post date'),
    }))
    return { users, posts }
  } finally {
    database.close()
  }
}

async function appendChange(platform: Platform, statements: string[]) {
  const content = `\n-- Admin change saved ${new Date().toISOString()}\n${statements.join('\n')}\n`
  await appendFile(sqlFiles[platform], content, 'utf8')
}

async function saveProfileImage(value: unknown): Promise<string> {
  if (typeof value !== 'string') {
    throw new AdminApiError('Choose a PNG or JPEG profile image.')
  }
  const match = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value)
  if (!match) throw new AdminApiError('Profile images must be PNG or JPEG files.')

  const image = Buffer.from(match[2], 'base64')
  if (image.byteLength > 2 * 1024 * 1024) {
    throw new AdminApiError('Profile images must be 2 MB or smaller.')
  }
  await mkdir(assetAdminDirectory, { recursive: true })
  const extension = match[1] === 'png' ? 'png' : 'jpg'
  const filename = `admin/${randomUUID()}.${extension}`
  await writeFile(resolve(assetDirectory, filename), image, { flag: 'wx' })
  return filename
}

function currentTimestamp() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ')
}

function postDeleteSql(platform: Platform, postId: number) {
  const childTables =
    platform === 'instagram'
      ? ['post_media', 'post_tags', 'comments', 'likes']
      : ['post_media', 'post_tags', 'comments', 'reactions']
  return [
    ...childTables.map((table) => `DELETE FROM "${table}" WHERE "post_id" = ${postId};`),
    `DELETE FROM "posts" WHERE "id" = ${postId};`,
  ]
}

async function mutateUser(platform: Platform, body: JsonRecord) {
  const action = body.action
  const database = await openDatabase(platform)
  let newImage: string | undefined

  try {
    if (action === 'delete') {
      const id = Number(body.id)
      if (!Number.isSafeInteger(id) || id < 1) throw new AdminApiError('Choose a valid user.')
      const existing = selectRows(database, 'SELECT id FROM users WHERE id = ?', [id])
      if (!existing.length) throw new AdminApiError('That user no longer exists.', 404)

      const postIds = selectRows(database, 'SELECT id FROM posts WHERE user_id = ?', [id]).map(
        (row) => numberValue(row[0], 'post id'),
      )
      const statements = postIds.flatMap((postId) => postDeleteSql(platform, postId))
      if (platform === 'instagram') {
        statements.push(
          `DELETE FROM "post_tags" WHERE "user_id" = ${id};`,
          `DELETE FROM "comments" WHERE "user_id" = ${id};`,
          `DELETE FROM "likes" WHERE "user_id" = ${id};`,
          `DELETE FROM "follows" WHERE "follower_id" = ${id} OR "followee_id" = ${id};`,
          `DELETE FROM "stories" WHERE "user_id" = ${id};`,
          `DELETE FROM "dm_messages" WHERE "sender_id" = ${id};`,
        )
      } else {
        statements.push(
          `DELETE FROM "post_tags" WHERE "user_id" = ${id};`,
          `DELETE FROM "comments" WHERE "user_id" = ${id};`,
          `DELETE FROM "reactions" WHERE "user_id" = ${id};`,
        )
      }
      statements.push(`DELETE FROM "users" WHERE "id" = ${id};`)
      database.run(statements.join('\n'))
      await appendChange(platform, statements)
      return { id }
    }

    if (action !== 'save') throw new AdminApiError('Choose a valid user action.')
    const username = requiredString(body.username, 'Username', 50)
    if (!/^[A-Za-z0-9._-]+$/.test(username)) {
      throw new AdminApiError('Usernames can contain letters, numbers, dots, underscores, and hyphens.')
    }
    const name = requiredString(body.name, 'Name', 100)
    const bio = optionalString(body.bio, 'Bio', 500)
    const location = optionalString(body.location, 'Location', 100)
    const id = body.id === undefined ? null : Number(body.id)
    if (id !== null && (!Number.isSafeInteger(id) || id < 1)) {
      throw new AdminApiError('Choose a valid user.')
    }
    const duplicate = selectRows(
      database,
      'SELECT id FROM users WHERE username = ? COLLATE NOCASE AND (? IS NULL OR id != ?)',
      [username, id, id],
    )
    if (duplicate.length) throw new AdminApiError('That username is already in use.', 409)

    const existing = id === null ? [] : selectRows(database, 'SELECT id FROM users WHERE id = ?', [id])
    if (id !== null && !existing.length) throw new AdminApiError('That user no longer exists.', 404)
    const userId =
      id ??
      numberValue(
        selectRows(database, 'SELECT COALESCE(MAX(id), 0) + 1 FROM users')[0][0],
        'next user id',
      )
    const existingDetails =
      id === null
        ? []
        : selectRows(
            database,
            'SELECT profile_pic_filename, followers_count FROM users WHERE id = ?',
            [id],
          )
    const priorPhoto = existingDetails.length ? nullableString(existingDetails[0][0]) : null
    const followers =
      existingDetails.length > 0 ? numberValue(existingDetails[0][1], 'follower count') : 0
    let profilePicture = priorPhoto
    if (body.removeProfilePicture === true) profilePicture = null
    if (body.profileImage !== undefined && body.profileImage !== null) {
      newImage = await saveProfileImage(body.profileImage)
      profilePicture = newImage
    }

    const instagram = platform === 'instagram'
    const columns = instagram
      ? [
          'id',
          'username',
          'full_name',
          'bio',
          'profile_pic_filename',
          'location_text',
          'is_private',
          'followers_count',
        ]
      : ['id', 'username', 'full_name', 'bio', 'profile_pic_filename', 'current_city']
    const values: (string | number | null)[] = instagram
      ? [userId, username, name, bio, profilePicture, location, body.isPrivate === true ? 1 : 0, followers]
      : [userId, username, name, bio, profilePicture, location]
    const statement = upsertSql('users', columns, values)

    try {
      database.run(statement)
      await appendChange(platform, [statement])
    } catch (error) {
      if (newImage) {
        const { unlink } = await import('node:fs/promises')
        await unlink(resolve(assetDirectory, newImage))
      }
      throw error
    }
    return { id: userId }
  } finally {
    database.close()
  }
}

async function mutatePost(platform: Platform, body: JsonRecord) {
  const database = await openDatabase(platform)
  try {
    if (body.action === 'delete') {
      const id = Number(body.id)
      if (!Number.isSafeInteger(id) || id < 1) throw new AdminApiError('Choose a valid post.')
      if (!selectRows(database, 'SELECT id FROM posts WHERE id = ?', [id]).length) {
        throw new AdminApiError('That post no longer exists.', 404)
      }
      const statements = postDeleteSql(platform, id)
      database.run(statements.join('\n'))
      await appendChange(platform, statements)
      return { id }
    }

    if (body.action !== 'save') throw new AdminApiError('Choose a valid post action.')
    const userId = Number(body.userId)
    if (!Number.isSafeInteger(userId) || userId < 1) throw new AdminApiError('Choose a valid user.')
    if (!selectRows(database, 'SELECT id FROM users WHERE id = ?', [userId]).length) {
      throw new AdminApiError('That user no longer exists.', 404)
    }
    const text = requiredString(body.text, 'Post text', 10000)
    const location = optionalString(body.location, 'Location', 200)
    const id = body.id === undefined ? null : Number(body.id)
    if (id !== null && (!Number.isSafeInteger(id) || id < 1)) {
      throw new AdminApiError('Choose a valid post.')
    }
    if (id !== null) {
      const existing = selectRows(database, 'SELECT user_id FROM posts WHERE id = ?', [id])
      if (!existing.length || numberValue(existing[0][0], 'post user id') !== userId) {
        throw new AdminApiError('That post no longer belongs to this user.', 404)
      }
    }
    const postId =
      id ??
      numberValue(
        selectRows(database, 'SELECT COALESCE(MAX(id), 0) + 1 FROM posts')[0][0],
        'next post id',
      )
    const postedAt = normalizeTimestamp(body.postedAt)
    const columns =
      platform === 'instagram'
        ? ['id', 'user_id', 'caption', 'location_name', 'posted_at']
        : ['id', 'user_id', 'text', 'location_name', 'posted_at']
    const values = [postId, userId, text, location, postedAt]
    const statement = upsertSql('posts', columns, values)
    database.run(statement)
    await appendChange(platform, [statement])
    return { id: postId }
  } finally {
    database.close()
  }
}

function normalizeTimestamp(value: unknown): string {
  if (value === undefined || value === null || value === '') return currentTimestamp()
  const input = requiredString(value, 'Post date', 25)
  const normalized = input.replace('T', ' ')
  const timestamp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(?::\d{2})?$/.test(normalized)
    ? normalized.length === 16
      ? `${normalized}:00`
      : normalized
    : ''
  if (!timestamp || Number.isNaN(Date.parse(timestamp.replace(' ', 'T') + 'Z'))) {
    throw new AdminApiError('Enter a valid post date and time.')
  }
  return timestamp
}

function queueMutation<T>(operation: () => Promise<T>): Promise<T> {
  const result = writeQueue.then(operation)
  writeQueue = result.then(
    () => undefined,
    () => undefined,
  )
  return result
}

export default function adminSqlApi(): Plugin {
  return {
    name: 'local-admin-sql-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost')
        if (!url.pathname.startsWith('/api/admin/')) {
          next()
          return
        }

        try {
          const platform = platformFrom(url.searchParams.get('platform'))
          if (request.method === 'GET' && url.pathname === '/api/admin/data') {
            sendJson(response, 200, await getData(platform))
            return
          }
          if (request.method === 'POST' && url.pathname === '/api/admin/users') {
            assertLocalMutation(request)
            const body = await readJson(request)
            sendJson(response, 200, await queueMutation(() => mutateUser(platform, body)))
            return
          }
          if (request.method === 'POST' && url.pathname === '/api/admin/posts') {
            assertLocalMutation(request)
            const body = await readJson(request)
            sendJson(response, 200, await queueMutation(() => mutatePost(platform, body)))
            return
          }
          sendJson(response, 404, { error: 'Admin API endpoint not found.' })
        } catch (error) {
          const status = error instanceof AdminApiError ? error.status : 500
          const message = error instanceof Error ? error.message : 'An unknown error occurred.'
          if (status === 500) console.error('[local-admin-sql-api]', error)
          sendJson(response, status, { error: message })
        }
      })
    },
  }
}
