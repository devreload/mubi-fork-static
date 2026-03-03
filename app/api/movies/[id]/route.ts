import { NextResponse } from "next/server"
import { GetMovieDetails } from "../tmdb"

export async function GET( req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang') || 'en-US'
    const details = searchParams.get('details') || 'true'
    try {
        const data = await GetMovieDetails(id, lang, details === 'true')
        if (!data) throw new Error("No data received from database")
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
