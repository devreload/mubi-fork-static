const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
    }
}

export async function SearchTMDBDatabase(query: string, type: string = "multi", page: string = "1", lang: string = "en-US") {
    const res = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(query)}&page=${page}&language=${lang}}&include_adult=true&include_video=true`, options)
    if (!res.ok) throw new Error("Failed to search the database.")
    const data = await res.json()
    return data
}