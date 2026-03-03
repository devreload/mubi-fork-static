interface Serie {
    id: number
    name: string
    overview: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    first_air_date: string
    // App specific fields
    categories?: string[]
}

interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}

interface SerieDetails {
    id: number
    name: string
    overview: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    first_air_date: string
    last_air_date: string
    number_of_seasons: number
    number_of_episodes: number
    episode_run_time: number[]
    genres: { id: number; name: string }[]
    tagline: string
    status: string
    original_language: string
    seasons: Season[]
    production_companies: { id: number; name: string; logo_path: string }[]
    credits: {
        cast: { id: number; name: string; character: string; profile_path: string }[]
        crew: { id: number; name: string; job: string; profile_path: string }[]
    }
    similar: {
        results: {
            id: number
            name: string
            poster_path: string
            vote_average: number
        }[]
    }
    videos: {
        results: {
            id: string
            key: string
            name: string
            site: string
            type: string
        }[]
    }
}
