import { NextResponse } from "next/server"

async function fetchMovieDetails(url: string, options: RequestInit) {
    try {
        const res = await fetch(url, options)

        if (!res.ok) {
            return NextResponse.json({ error: `Failed to fetch movie details from ${url}` }, { status: 500 })
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error(`Error fetching movie details from ${url}:`, error)
        return null
    }
}

export async function GET( req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang') || 'en-US'
    const details = searchParams.get('details') || 'true'
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
            }
        }

        const movieData = await fetchMovieDetails(`https://api.themoviedb.org/3/movie/${id}?language=${lang}`, options)

        if (details !== 'true') {
            return NextResponse.json(movieData)
        }

        // Fetch movie credits (cast & crew)
        const creditsData = await fetchMovieDetails(`https://api.themoviedb.org/3/movie/${id}/credits?language=${lang}`, options)

        // Fetch similar movies
        const similarData = await fetchMovieDetails(`https://api.themoviedb.org/3/movie/${id}/similar?language=${lang}&page=1`, options)

        // Fetch videos (trailers, teasers, etc.)
        const videosData = await fetchMovieDetails(`https://api.themoviedb.org/3/movie/${id}/videos?language=${lang}`, options)

        const credits = creditsData || { cast: [], crew: [] }
        const similar = similarData.results || { results: [] }
        const videos = videosData.results || { results: [] }

        return NextResponse.json({
            ...movieData,
            credits,
            similar,
            videos
        })
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
