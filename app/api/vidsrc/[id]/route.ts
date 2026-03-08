import { NextResponse } from "next/server"
import { GetProviderVidsrc } from "../tmdb"
import VidsrcProviders from "@/lib/vidsrc-providers"
import { MediaTypes } from "@/lib/models/mediatype"

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get("provider") || VidsrcProviders.default
    const mediaType = searchParams.get("type") as MediaTypes || MediaTypes.Movie
    const season = searchParams.get("season") || "1"
    const episode = searchParams.get("episode") || "1"

    if (!id) {
        return NextResponse.json({ error: "TMDB ID is required" }, { status: 400, headers: corsHeaders })
    }

    try {
        const embedUrl = await GetProviderVidsrc(id, provider, mediaType, season, episode)
        return NextResponse.json({ embedUrl }, { headers: corsHeaders })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to generate embed URL" }, { status: 500, headers: corsHeaders })
    }
}