import initSqlJs from 'sql.js'
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import googleSql from './Google.sql?raw'

export type GoogleSearchResult = {
  title: string
  url: string
  domain: string
  displayurl: string
  description: string
}

export type BrowserSite = {
  displayurl: string
  route: string
}

let sqlPromise: ReturnType<typeof initSqlJs> | undefined

function withGoogleDatabase<T>(callback: (database: initSqlJs.Database) => T): Promise<T> {
  sqlPromise ??= initSqlJs({ locateFile: () => sqlWasmUrl })

  return sqlPromise.then((SQL) => {
    const database = new SQL.Database()

    try {
      database.run(googleSql)
      return callback(database)
    } finally {
      database.close()
    }
  })
}

export function searchGoogleSites(query: string): Promise<GoogleSearchResult[]> {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)

  if (terms.length === 0) {
    return Promise.resolve([])
  }

  const conditions = terms
    .map(
      () =>
        "instr(lower(name || ' ' || domain || ' ' || COALESCE(description, '')), ?) > 0",
    )
    .join(' AND ')

  return withGoogleDatabase((database) => {
    const [result] = database.exec(
      `SELECT name, url, domain, displayurl, description FROM sites WHERE ${conditions} ORDER BY id`,
      terms,
    )

    return (result?.values ?? []).map((row, index) => {
      const [title, url, domain, displayurl, description] = row

      if (
        typeof title !== 'string' ||
        typeof url !== 'string' ||
        typeof domain !== 'string' ||
        typeof displayurl !== 'string' ||
        (description !== null && typeof description !== 'string')
      ) {
        throw new Error(`Google database contains an invalid search result at row ${index + 1}.`)
      }

      return {
        title,
        url,
        domain,
        displayurl,
        description: description ?? '',
      }
    })
  })
}

export function findBrowserSiteByDomain(domain: string): Promise<BrowserSite | undefined> {
  const canonicalDomain = domain.toLocaleLowerCase().replace(/^www\./, '')

  return withGoogleDatabase((database) => {
    const [result] = database.exec(
      'SELECT displayurl, url FROM sites WHERE lower(domain) = ? AND url IS NOT NULL LIMIT 1',
      [canonicalDomain],
    )

    const [displayurl, route] = result?.values[0] ?? []
    if (typeof displayurl !== 'string' || typeof route !== 'string') {
      return undefined
    }

    return { displayurl, route }
  })
}

export function findBrowserSiteByPath(pathname: string): Promise<BrowserSite | undefined> {
  return withGoogleDatabase((database) => {
    const [result] = database.exec(
      `SELECT displayurl, url
       FROM sites
       WHERE url LIKE '/%' AND (? = url OR ? LIKE url || '/%')
       ORDER BY length(url) DESC, id
       LIMIT 1`,
      [pathname, pathname],
    )

    const [displayurl, route] = result?.values[0] ?? []
    if (typeof displayurl !== 'string' || typeof route !== 'string') {
      return undefined
    }

    return { displayurl, route }
  })
}