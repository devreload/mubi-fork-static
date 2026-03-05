const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
    },
    next: { revalidate: 3600 } // Cache for 1 hour
}

export async function GetNowPlaying(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?include_adult=true&include_video=true&language=${lang}&page=${page}`, options)
    if (!res.ok) throw new Error("Failed to fetch now playing movies. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetPopular(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?include_adult=true&include_video=true&language=${lang}&page=${page}`, options)
    if (!res.ok) throw new Error("Failed to fetch popular movies. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetTopRated(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?include_adult=true&include_video=true&language=${lang}&page=${page}`, options)
    if (!res.ok) throw new Error("Failed to fetch top rated movies. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetTrending(time_window: string = "day", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/trending/all/${time_window}?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch trending movies. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetUpcoming(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=true&include_video=true&language=${lang}&page=${page}`, options)
    if (!res.ok) throw new Error("Failed to fetch upcoming movies. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetMovieById(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch movie details. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetMovieCredits(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch movie credits. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetMovieSimilar(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=${lang}&page=1`, options)
    if (!res.ok) throw new Error("Failed to fetch similar movies. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetMovieVideos(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch movie videos. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetMovieDetails(id: string, lang: string = "en-US", details: boolean = true): Promise<MovieDetails> {
    try {
        const movieData = await GetMovieById(id, lang)
        if (!details) {
            return movieData
        }
        const creditsData = await GetMovieCredits(id, lang)
        const similarData = await GetMovieSimilar(id, lang)
        const videosData = await GetMovieVideos(id, lang)
        const credits = creditsData || { cast: [], crew: [] }
        const similar = similarData.results || { results: [] }
        const videos = videosData.results || { results: [] }
        return {
            ...movieData,
            credits,
            similar,
            videos
        }
    } catch (error) {
        console.error('Error fetching movie details:', error)
        throw new Error("Failed to fetch movie details. Maybe check your API key?")
    }
}