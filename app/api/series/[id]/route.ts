import { NextResponse } from "next/server"
import { GetSerieDetails } from "../tmdb"

export async function GET( req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang') || 'en-US'
    try {
        const data = await GetSerieDetails(id, lang)
        if (!data) throw new Error("No data received from database")
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching series details:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
