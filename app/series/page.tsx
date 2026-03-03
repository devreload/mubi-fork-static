import CarouselSection from "@/components/carousel-section"
import Config from "@/lib/config"
import { GetNowPlaying, GetTopRated, GetPopular, GetUpcoming } from "../api/series/tmdb"

const seriesCategories = [
  { key: "nowPlaying", title: "Now Playing", data: GetNowPlaying() },
  { key: "upcoming", title: "Upcoming", data: GetUpcoming() },
  { key: "popular", title: "TOP 20", data: GetPopular() },
  { key: "topRated", title: "Top Rated", data: GetTopRated() },
]

export default async function Home() {
  const results = await Promise.all(seriesCategories.map(cat => cat.data))

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
