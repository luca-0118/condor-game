export function getSearchUrl(query: string) {
  return `/sandbox/search?q=${encodeURIComponent(query.trim())}`
}
