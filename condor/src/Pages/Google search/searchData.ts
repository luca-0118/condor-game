export type SearchResult = {
  title: string
  url: string
  domain: string
  description: string
}

//tijdelijke mockdata voor searches op google 

export const mockSearchResults: SearchResult[] = [
  {
    title: 'Instagram',
    url: '/sandbox/instagram',
    domain: 'instagram.com',
    description: 'Share photos and videos, and explore updates from friends.',
  },
  {
    title: 'Facebook',
    url: '/sandbox/facebook',
    domain: 'facebook.com',
    description: 'Connect with friends and discover what is happening.',
  },
  {
    title: 'Condor Game',
    url: '/sandbox',
    domain: 'condor-game.local',
    description: 'Explore the web apps and interactive pages in Condor Game.',
  },
  {
    title: 'Scamsite',
    url: '/sandbox/webshop',
    domain: 'webshop.com',
    description: 'Sieraden kopen ofzo.',
  },
  {
    title: 'Example search result',
    url: '#example-result',
    domain: 'example.com',
    description: 'A sample result that demonstrates the search results layout.',
  },
]

export function searchResults(
  query: string,
  results: readonly SearchResult[],
): SearchResult[] {
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)

  if (terms.length === 0) {
    return []
  }

  return results.filter((result) => {
    const searchableText =
      `${result.title} ${result.domain} ${result.description}`.toLocaleLowerCase()
    return terms.every((term) => searchableText.includes(term))
  })
}
