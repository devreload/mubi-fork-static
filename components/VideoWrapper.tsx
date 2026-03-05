"use client"
import { useState, useEffect, useRef } from "react"
import { Play } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Config from "@/lib/config"
import { MediaTypes } from "@/lib/models/mediatype"

interface VideoWrapperProps {
    id: string
    mediaType?: MediaTypes
    season?: number
    episode?: number
}

export function VideoWrapper({ id, mediaType = MediaTypes.Movie, season = 1, episode = 1 }: VideoWrapperProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [videoSrc, setVideoSrc] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [provider, setProvider] = useState(Config.vidsrcProvidersDefault)

    async function fetchVideoSource(id: string, server: string): Promise<string | null> {
        try {
            const params = new URLSearchParams({ provider: server, type: mediaType })
            if (mediaType === MediaTypes.Tv) {
                params.set("season", String(season))
                params.set("episode", String(episode))
            }
            const res = await fetch(`/api/vidsrc/${id}?${params.toString()}`)
            if (!res.ok) return null
            const data = await res.json()
            return data.embedUrl
        } catch (error) {
            console.error("Error fetching video source:", error)
            return null
        }
    }

    const handlePlay = () => {
        setIsPlaying(true)
    }

    const resetHideTimer = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
        }
        setShowControls(true)
        hideTimeoutRef.current = setTimeout(() => {
            setShowControls(false)
        }, 5000)
    }

    const handleMouseMove = () => {
        if (isPlaying) {
            resetHideTimer()
        }
    }

    useEffect(() => {
        if (isPlaying) {
            setVideoSrc(null)
            setError(null)
            setVideoSrc("https://vidsrc-embed.ru/embed/movie?tmdb=1290821")
            const initialTimeout = setTimeout(() => {
                setShowControls(false)
            }, 3000)
            return () => {
                clearTimeout(initialTimeout)
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current)
                }
            }
        }
    }, [isPlaying, season, episode, provider])

    return (
        <div className="relative w-full aspect-video bg-black overflow-hidden p-0 rounded-xl border border-secondary/50" onMouseMove={handleMouseMove}>
            <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${isPlaying && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Select value={provider} onValueChange={(val) => { if (val) setProvider(val) }}>
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Server" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Server</SelectLabel>
                            {Config.vidsrcProviders.map((p) => (
                                <SelectItem key={p.provider} value={p.provider}>
                                    {p.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button onClick={handlePlay} variant="ghost" size="icon-lg" className="w-20 h-20 rounded-full backdrop-blur-sm">
                        <Play className="text-white fill-white" />
                    </Button>
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    {error ? (
                        <p className="text-white text-2xl font-semibold">{error}</p>
                    ) : videoSrc ? (
                        <iframe
                        src={videoSrc}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        />
                    ) : (
                        <p className="text-white text-2xl font-semibold">Loading...</p>
                    )}
                </div>
            )}
        </div>
    )
}
