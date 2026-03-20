import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { type CardItem } from "@/lib/models/card-item"
import { Button } from "@/components/ui/button"
import CarouselSection from "@/components/carousel-section"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getMediaImage } from "@/lib/utils"
import Config from "@/lib/config"
import { EpisodeSelector } from "@/components/EpisodeSelector"
import { Badge } from "@/components/ui/badge"
import { Star, Video } from "lucide-react"
import { DBImageSizes } from "../../../lib/models/dbimage"
import { GetSerieDetails } from "../../api/series/tmdb"

export default async function SeriePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const serie = await GetSerieDetails(id)

  if (!serie) {
    notFound()
  }

  const creator = serie.credits.crew.find((person) => person.job === 'Executive Producer')
  const trailer = serie.videos.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube')
  const avgRuntime = serie.episode_run_time.length > 0
    ? Math.round(serie.episode_run_time.reduce((a, b) => a + b, 0) / serie.episode_run_time.length)
    : null

  const similarSeries = serie.similar.results.map((s) => ({
    id: s.id,
    name: s.name,
    poster_path: s.poster_path, 
    vote_average: s.vote_average,
    url: `/series/${s.id}`
  })) as CardItem[]

  return (
    <main className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <section className="relative h-[60vh] md:h-[70vh] w-full">
        {serie.backdrop_path && (
          <Image
            src={getMediaImage(DBImageSizes.original, serie.backdrop_path)!}
            alt={serie.name}
            fill
            sizes="70vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

        {/* Serie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {serie.name}
            </h1>
            {serie.tagline && (
              <p className="text-xl md:text-2xl text-gray-200 italic mb-4">
                &quot;{serie.tagline}&quot;
              </p>
            )}
            <div className="flex flex-wrap gap-4 items-center text-white">
              <Badge>
                <Star className="w-4 h-4" />
                {serie.vote_average.toFixed(1)}
              </Badge>
              <span>{new Date(serie.first_air_date).getFullYear()}</span>
              <span>•</span>
              <span>{serie.number_of_seasons} Season{serie.number_of_seasons !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>{serie.number_of_episodes} Episodes</span>
              {avgRuntime && (
                <>
                  <span>•</span>
                  <span>{avgRuntime}m per ep</span>
                </>
              )}
              <span>•</span>
              <span className="flex gap-2">
                {serie.genres.map((genre, index) => (
                  <span key={genre.id}>
                    {genre.name}
                    {index < serie.genres.length - 1 && ','}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Selector + Video Player */}
      <div className="max-w-7xl mx-auto mt-8 px-6 md:px-12">
        <EpisodeSelector id={id} seasons={serie.seasons} />
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden shadow-2xl">
              {serie.poster_path && (
                <Image
                  src={getMediaImage(DBImageSizes.w500, serie.poster_path)!}
                  alt={serie.name}
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              )}
            </div>

            {/* Trailer Button */}
            {trailer && (
              <Link
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
              <Button className="w-full mt-4" size="lg">
                  <Video className="w-4 h-4" />
                  Watch Trailer
              </Button>
              </Link>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {serie.overview}
                </p>
              </div>

              {/* Creator */}
              {creator && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Executive Producer</h3>
                  <p className="text-muted-foreground">{creator.name}</p>
                </div>
              )}
              {serie.credits.cast.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Main Cast</h3>
                  <p className="text-muted-foreground">
                    {serie.credits.cast.slice(0, 5).map((cast, index) => (
                      <span key={cast.id}>
                        {cast.name} as {cast.character}
                        {index < serie.credits.cast.slice(0, 5).length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Series Section */}
        {serie.similar.results.length > 0 && (
          <div className="mt-12">
            <CarouselSection items={similarSeries} title="Similar Series" />
          </div>
        )}

        {/* Production Companies */}
        {serie.production_companies.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Production Companies</h2>
            <div className="flex flex-wrap gap-6">
              {serie.production_companies.map((company) => (
                <div key={company.id} className="flex items-center gap-3">
                  {company.logo_path && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={getMediaImage(DBImageSizes.w92, company.logo_path)!}
                        alt={company.name}
                        fill
                        sizes="5vw"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm text-muted-foreground">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12">
          <Link href="/">
            <Button variant="outline">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
