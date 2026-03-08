import VidsrcProviders from "@/lib/vidsrc-providers"
import { MediaTypes } from "@/lib/models/mediatype"
import { unstable_cache } from "next/cache"

const CACHE_TTL = 12 * 60 * 60 // 12 hours in seconds

// Tests domains and returns the first one that responds
async function testDomains(domains: string[]): Promise<string> {
    for (const domain of domains) {
        try {
            const res = await fetch(domain, { method: "HEAD", mode: "no-cors", cache: "no-store" })
            if (res.ok) return domain
        } catch {
            continue
        }
    }
    return domains[0]
}

// Caches the resolved domain per provider in Vercel's data cache for 12 hours
function getCachedDomain(provider: string, domains: string[]) {
    return unstable_cache(
        async () => testDomains(domains),
        ["vidsrc-domain", provider],
        { revalidate: CACHE_TTL }
    )()
}

export async function GetProviderVidsrc(id: string, provider: string, mediaType: MediaTypes, season?: string, episode?: string): Promise<string> {
    const p = VidsrcProviders.providers[provider] || VidsrcProviders.providers[VidsrcProviders.default]

    if (!p) throw new Error("Provider not found")

    const pathTemplate = p.paths[mediaType] || p.paths.movie
    const testedDomain = await getCachedDomain(provider, p.domains)
    const url = `${testedDomain}${pathTemplate
        .replace("{id}", id)
        .replace("{s}", season || "1")
        .replace("{e}", episode || "1")}`
    return url
}