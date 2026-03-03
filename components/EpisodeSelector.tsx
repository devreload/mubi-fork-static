"use client"

import { useState } from "react"
import { VideoWrapper } from "@/components/VideoWrapper"
import { MediaTypes } from "@/lib/models/mediatype"
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tv } from "lucide-react"

interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}

interface EpisodeSelectorProps {
    id: string
    seasons: Season[]
}

export function EpisodeSelector({ id, seasons }: EpisodeSelectorProps) {
    const validSeasons = seasons.filter(s => s.season_number > 0)
    const [selectedSeason, setSelectedSeason] = useState(validSeasons[0]?.season_number ?? 1)
    const [selectedEpisode, setSelectedEpisode] = useState(1)

    const currentSeason = validSeasons.find(s => s.season_number === selectedSeason)
    const episodeCount = currentSeason?.episode_count ?? 0

    const handleSeasonChange = (seasonNumber: number) => {
        setSelectedSeason(seasonNumber)
        setSelectedEpisode(1)
    }

    const handleEpisodeSelect = (episode: number) => {
        setSelectedEpisode(episode)
    }

    return (
        <div className="space-y-4">
            {/* Video Player */}
            <VideoWrapper
                id={id}
                mediaType={MediaTypes.Tv}
                season={selectedSeason}
                episode={selectedEpisode}
            />

            {/* Now Playing Indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tv className="w-4 h-4" />
                <span>
                    Playing <span className="font-medium text-foreground">Season {selectedSeason}</span> — <span className="font-medium text-foreground">Episode {selectedEpisode}</span>
                </span>
            </div>

            {/* Episode Selection */}
            <Accordion>
                {validSeasons.map((season) => (
                    <AccordionItem key={season.id} value={String(season.season_number)}>
                        <AccordionTrigger
                            onClick={() => handleSeasonChange(season.season_number)}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-semibold">{season.name}</span>
                                <Badge variant="secondary">{season.episode_count} episodes</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 py-2">
                                {Array.from({ length: season.episode_count }, (_, i) => i + 1).map((ep) => (
                                    <Button
                                        key={ep}
                                        variant={selectedSeason === season.season_number && selectedEpisode === ep ? "default" : "outline"}
                                        size="sm"
                                        className="w-full"
                                        onClick={() => {
                                            setSelectedSeason(season.season_number)
                                            setSelectedEpisode(ep)
                                        }}
                                    >
                                        {ep}
                                    </Button>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
