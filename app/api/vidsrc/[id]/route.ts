import { NextResponse } from "next/server"
import { computeProviderUrl } from "../tmdb"
import Config from "@/lib/config"
import { MediaTypes } from "@/lib/models/mediatype"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get("provider") || Config.vidsrcProvidersDefault
    const mediaType = searchParams.get("type") as MediaTypes || MediaTypes.Movie
    const season = searchParams.get("season") || "1"
    const episode = searchParams.get("episode") || "1"

    if (!id) {
        return NextResponse.json({ error: "TMDB ID is required" }, { status: 400 })
    }

    try {
        const embedUrl = await computeProviderUrl(id, provider, mediaType, season, episode)
        return NextResponse.json({ embedUrl })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to generate embed URL" }, { status: 500 })
    }
}