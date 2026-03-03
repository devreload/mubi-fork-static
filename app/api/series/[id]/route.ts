import { NextResponse } from "next/server"

async function fetchSerieDetails(url: string, options: RequestInit) {
    try {
        const res = await fetch(url, options)

        if (!res.ok) {
            return NextResponse.json({ error: `Failed to fetch serie details from ${url}` }, { status: 500 })
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error(`Error fetching serie details from ${url}:`, error)
        return null
    }
}

export async function GET( req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang') || 'en-US'
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
            }
        }

        const seriesData = await fetchSerieDetails(`https://api.themoviedb.org/3/tv/${id}?language=${lang}`, options)

        // Fetch series credits (cast & crew)
        const creditsData = await fetchSerieDetails(`https://api.themoviedb.org/3/tv/${id}/credits?language=${lang}`, options)

        // Fetch similar series
        const similarData = await fetchSerieDetails(`https://api.themoviedb.org/3/tv/${id}/similar?language=${lang}&page=1`, options)

        // Fetch videos (trailers, teasers, etc.)
        const videosData = await fetchSerieDetails(`https://api.themoviedb.org/3/tv/${id}/videos?language=${lang}`, options)

        const credits = creditsData || { cast: [], crew: [] }
        const similar = similarData || { results: [] }
        const videos = videosData || { results: [] }

        return NextResponse.json({
            ...seriesData,
            credits,
            similar,
            videos
        })
    } catch (error) {
        console.error('Error fetching series details:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
