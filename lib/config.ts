interface AppConfig {
    baseUrl: string
    lang: string
    title: string
    name: string
    description: string
}

export default <AppConfig>{
    baseUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    lang: 'en',
    title: 'Mubi — Streaming Refined. Cinema Redefined.',
    name: 'Mubi',
    description: 'A multi-platform movies tracker and streaming website for movies, series, tv and much more.'
} as AppConfig