import CarouselSection from "@/components/carousel-section"
import Config from "@/lib/config"

const seriesCategories = [
  { key: "nowPlaying", title: "Now Playing", endpoint: "/api/series/now_playing" },
  { key: "upcoming", title: "Upcoming", endpoint: "/api/series/upcoming" },
  { key: "popular", title: "TOP 20", endpoint: "/api/series/popular" },
  { key: "topRated", title: "Top Rated", endpoint: "/api/series/top_rated" },
]

async function fetchSeries(endpoint: string) {
  try {
    const res = await fetch(`${Config.baseUrl}${endpoint}`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.results || []
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function Home() {
  const results = await Promise.all(
    seriesCategories.map(cat => fetchSeries(cat.endpoint))
  )

  const seriesByCategory: Record<string, Movie[]> = {}
  seriesCategories.forEach((cat, idx) => {
    seriesByCategory[cat.key] = results[idx]
    .map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
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
