import Config from '@/lib/config'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: Config.baseUrl,
            lastModified: new Date(),
        },
    ]
}