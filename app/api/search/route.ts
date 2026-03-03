import { NextResponse } from "next/server"
import { SearchQueryTypes } from "@/lib/models/search-query"
import { SearchTMDBDatabase } from "./tmdb"

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
        const data = await SearchTMDBDatabase(query, computeType(type), page, lang)
        if (!data) throw new Error("No data received from database")
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error searching:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
