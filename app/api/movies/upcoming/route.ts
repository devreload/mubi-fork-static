import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || '1'
    const lang = searchParams.get('lang') || 'en-US'
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
            }
        }

        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?include_adult=true&include_video=true&language=${lang}&page=${page}`, options)

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching popular movies:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}