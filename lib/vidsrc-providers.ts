interface VidsrcProvider {
    name: string
    domains: string[]
    paths: {
        movie: string
        tv: string
    }
}

interface VidsrcConfig {
    default: string
    providers: {
        [key: string]: VidsrcProvider
    }
}

export default <VidsrcConfig>{
    default: 'vidsrc',
    providers: {
        'vidsrc': {
            name: 'Vidsrc',
            domains: ['https://vsembed.ru/', 'https://vsembed.su/', 'https://vidsrc-embed.ru/', 'https://vidsrcme.su/', 'https://vidsrc-me.ru/', 'https://vidsrc-me.su/'],
            paths: {
                movie: 'embed/movie?tmdb={id}',
                tv: 'embed/tv?tmdb={id}&season={s}&episode={e}'
            }
        },
        '2embedcc': {
            name: '2Embed.cc',
            domains: ['https://www.2embed.cc/', 'https://2embed.skin/'],
            paths: {
                movie: 'embed/{id}',
                tv: 'embedtv/{id}&s={s}&e={e}'
            }
        },
        '2embedstream': {
            name: '2Embed.stream',
            domains: ['https://2embed.stream/', 'https://2embed.online/'],
            paths: {
                movie: 'embed/movie/{id}',
                tv: 'embed/tv/{id}/{s}/{e}'
            }
        }
    }
} as VidsrcConfig