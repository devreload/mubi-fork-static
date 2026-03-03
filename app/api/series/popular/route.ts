import { NextResponse } from "next/server"
import { GetPopular } from "../tmdb"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || '1'
    const lang = searchParams.get('lang') || 'en-US'
    try {
        const data = await GetPopular(page, lang)
        if (!data) throw new Error("No data received from database")
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching popular series:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}