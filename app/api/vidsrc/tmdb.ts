import Config from "@/lib/config"
import { MediaTypes } from "@/lib/models/mediatype"

// Simple in-memory cache for domain verification results
const domainCache = new Map<string, { domain: string, timestamp: number }>()
const CACHE_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours

// Verifies the provider and constructs the url, if some embedded content is found use that url, if not use another in the list
async function testDomains(provider: string, domains: string[]): Promise<string> {
    const now = Date.now()
    const cached = domainCache.get(provider)

    // return cached domain if not expired
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
        return cached.domain
    }

    // test domains until one responds
    for (const domain of domains) {
        try {
            const res = await fetch(`http://${domain}`, { method: 'HEAD', cache: "no-store" })
            if (res.ok) {
                domainCache.set(provider, { domain, timestamp: now })
                return domain
            }
        } catch {
            continue
        }
    }

    // fallback to first domain
    const fallback = domains[0]
    domainCache.set(provider, { domain: fallback, timestamp: now })
    return fallback
}

export async function computeProviderUrl(id: string, provider: string, mediaType: MediaTypes, season?: string, episode?: string): Promise<string> {
    const p = Config.vidsrcProviders.find(pr => pr.provider === provider) || Config.vidsrcProviders.find(pr => pr.provider === Config.vidsrcProvidersDefault)

    if (!p) throw new Error("Provider not found")

    const pathTemplate = p.paths[mediaType] || p.paths.movie
    const bestDomain = await testDomains(provider, p.domains)
    const url = `${p.protocol}://${bestDomain}${pathTemplate
        .replace("{id}", id)
        .replace("{s}", season || "1")
        .replace("{e}", episode || "1")}`
    return url
}