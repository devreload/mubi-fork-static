import CarouselSection from "@/components/carousel-section"
import { GetNowPlaying, GetTopRated, GetPopular, GetUpcoming } from "../api/series/tmdb"

const seriesCategories = [
  { key: "nowPlaying", title: "Now Playing", fn: GetNowPlaying },
  { key: "upcoming", title: "Upcoming", fn: GetUpcoming },
  { key: "popular", title: "TOP 20", fn: GetPopular },
  { key: "topRated", title: "Top Rated", fn: GetTopRated },
]

export default async function Home() {
  const results = await Promise.all(
    seriesCategories.map((cat) => cat.fn())
  )

  const seriesByCategory: Record<string, Movie[]> = {}
  seriesCategories.forEach((cat, idx) => {
    seriesByCategory[cat.key] = results[idx].results
    .map((movie: any) => ({
        id: movie.id,
        title: movie.name,
        poster_path: movie.poster_path,
        release_date: movie.first_air_date,
        url: `/series/${movie.id}`
      }));
  })
  
  return (
    <main className="w-full min-h-screen px-8 py-6">
      <div className="py-8 flex flex-col space-y-12">
        {seriesCategories.map((cat) => (
          <CarouselSection
            key={cat.key}
            title={cat.title}
            items={seriesByCategory[cat.key]}
          />
        ))}
      </div>
    </main>
  );
}
