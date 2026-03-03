import { NextResponse } from "next/server"
import { SearchQueryTypes } from "@/lib/models/search-query"

function computeType(type: string): SearchQueryTypes {
    return Object.values(SearchQueryTypes).includes(type as SearchQueryTypes)
        ? (type as SearchQueryTypes)
        : SearchQueryTypes.All
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const type = searchParams.get('type') as SearchQueryTypes || SearchQueryTypes.All
    const page = searchParams.get('page') || '1'
    const lang = searchParams.get('lang') || 'en-US'

    if (!query) {
        return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
            }
        }

        const res = await fetch(`https://api.themoviedb.org/3/search/${computeType(type)}?query=${encodeURIComponent(query)}&page=${page}&language=${lang}}&include_adult=true&include_video=true`, options)

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to search" }, { status: 500 })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error searching:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
