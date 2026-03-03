import type { MetadataRoute } from 'next'
import Config from '@/lib/config'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: Config.title,
        short_name: Config.name,
        description: Config.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/logo.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}