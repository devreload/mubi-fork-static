export default {
    baseUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    lang: 'en',
    title: 'Mubi — Streaming Refined. Cinema Redefined.',
    name: 'Mubi',
    description: 'A multi-platform movies tracker and streaming website for movies, series, tv and much more.',
    vidsrcProvidersDefault: 'vidsrc',
    vidsrcProviders: [
        { 
            name: 'Vidsrc',
            provider: 'vidsrc',
            protocol: 'https',
            domains: ['vidsrc-embed.ru', 'vidsrcme.su', 'vidsrc-me.ru', 'vidsrc-me.su', 'vidsrc-embed.ru', 'vidsrc-embed.su', 'vsrc.su'],
            paths: {
                movie: '/embed/movie?tmdb={id}',
                tv: '/embed/tv?tmdb={id}&season={s}&episode={e}'
            }
        },
        {
            name: '2Embed.cc',
            provider: '2embedcc',
            protocol: 'https',
            domains: ['2embed.cc', '2embed.skin'],
            paths: {
                movie: '/embed/{id}',
                tv: '/embedtv/{id}&s={s}&e={e}'
            }
        },
        {
            name: '2Embed.stream',
            provider: '2embedstream',
            protocol: 'https',
            domains: ['2embed.stream'],
            paths: {
                movie: '/embed/movie/{id}',
                tv: '/embed/tv/{id}/{s}/{e}'
            }
        }
    ]
}