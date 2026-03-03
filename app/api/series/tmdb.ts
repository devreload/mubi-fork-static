const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
    },
    next: { revalidate: 3600 } // Cache for 1 hour
}

export async function GetNowPlaying(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?include_adult=true&language=${lang}&page=${page}&sort_by=popularity.desc`, options)
    if (!res.ok) throw new Error("Failed to fetch now playing series. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetPopular(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/popular?include_adult=true&language=${lang}&page=${page}&sort_by=popularity.desc`, options)
    if (!res.ok) throw new Error("Failed to fetch popular series. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetTopRated(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/top_rated?include_adult=true&language=${lang}&page=${page}`, options)
    if (!res.ok) throw new Error("Failed to fetch top rated series. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetUpcoming(page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/airing_today?include_adult=true&language=${lang}&page=${page}&sort_by=popularity.desc`, options)
    if (!res.ok) throw new Error("Failed to fetch upcoming series. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetSerieById(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch serie details. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetSerieCredits(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch serie credits. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetSerieSimilar(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?language=${lang}&page=1`, options)
    if (!res.ok) throw new Error("Failed to fetch similar series. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetSerieVideos(id: string, lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=${lang}`, options)
    if (!res.ok) throw new Error("Failed to fetch serie videos. Maybe check your API key?")
    const data = await res.json()
    return data
}

export async function GetSerieDetails(id: string, lang: string = "en-US", details: boolean = true) {
    const serieData = await GetSerieById(id, lang)
    if (!serieData) throw new Error("No data received from database")
    if (!details) return serieData

    const creditsData = await GetSerieCredits(id, lang)
    const similarData = await GetSerieSimilar(id, lang)
    const videosData = await GetSerieVideos(id, lang)

    const credits = creditsData || { cast: [], crew: [] }
    const similar = similarData || { results: [] }
    const videos = videosData || { results: [] }
    
    return {
        ...serieData,
        credits,
        similar,
        videos
    }
}