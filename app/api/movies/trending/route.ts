import { NextResponse } from "next/server"
import { GetTrending } from "../tmdb"
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const time_window = searchParams.get('time') || 'day'
    const lang = searchParams.get('lang') || 'en-US'
    try {
        const data = await GetTrending(time_window, lang)
        if (!data) throw new Error("No data received from database")
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error in GET /api/movies/trending:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}