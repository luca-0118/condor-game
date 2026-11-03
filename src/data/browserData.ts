export type BrowserSite = {
  domain: string
  route: string
  aliases?: string[]
}

// Mock site configuration for the in-game browser.
export const mockBrowserSites: BrowserSite[] = [
  { domain: 'google.com', route: '/sandbox', aliases: ['www.google.com'] },
  { domain: 'instagram.com', route: '/sandbox/instagram', aliases: ['www.instagram.com'] },
  { domain: 'facebook.com', route: '/sandbox/facebook', aliases: ['www.facebook.com'] },
  {
    domain: 'scamsite.com',
    route: '/sandbox/webshop',
    aliases: ['www.scamsite.com', 'webshop.com', 'www.webshop.com'],
  },
]

export function findBrowserSiteByDomain(domain: string, sites: readonly BrowserSite[] = mockBrowserSites) {
  const normalizedDomain = domain.toLowerCase().replace(/^www\./, '')
  return sites.find((site) => {
    const domains = [site.domain, ...(site.aliases ?? [])]
    return domains.some((candidate) => candidate.toLowerCase().replace(/^www\./, '') === normalizedDomain)
  })
}

export function findBrowserSiteByPath(pathname: string, sites: readonly BrowserSite[] = mockBrowserSites) {
  return sites
    .filter((site) => pathname === site.route || pathname.startsWith(`${site.route}/`))
    .sort((a, b) => b.route.length - a.route.length)[0]
}
