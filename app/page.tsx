import CarouselSection from "@/components/carousel-section"
import HeroSection from "@/components/hero-section"
import Config from "@/lib/config"
import PageHeader from "@/components/header"
import { type CardItem } from "@/lib/models/card-item"

const movieCategories = [
  { key: "nowPlaying", title: "Now Playing", endpoint: "/api/movies/now_playing" },
  { key: "upcoming", title: "Upcoming", endpoint: "/api/movies/upcoming" },
  { key: "trending", title: "Trending", endpoint: "/api/movies/trending" },
  { key: "topMovies", title: "TOP 20", endpoint: "/api/movies/popular" },
  { key: "topRated", title: "Top Rated", endpoint: "/api/movies/top_rated" },
]

async function fetchMovies(endpoint: string) {
  try {
    const res = await fetch(`${Config.baseUrl}${endpoint}`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error("Failed to fetch movies. Maybe check your API key?")
    const data = await res.json()
    return data.results || []
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function Home() {
  const results = await Promise.all(
    movieCategories.map(cat => fetchMovies(cat.endpoint))
  )

  const movieOTW: Movie | undefined = results[0][0]; // First movie from "Now Playing" category

  const moviesByCategory: Record<string, CardItem[]> = {}
  movieCategories.forEach((cat, idx) => {
    moviesByCategory[cat.key] = results[idx]
    // Transform each movie to match CardItem structure
      .map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        url: `/movies/${movie.id}`
      }));
  })
  
  return (
    <main className="w-full min-h-screen px-4 sm:px-8 py-6">
      <PageHeader />
      <HeroSection movie={movieOTW} />
      <div className="py-8 flex flex-col space-y-12">
        {movieCategories.map((cat) => (
          <CarouselSection
            key={cat.key}
            title={cat.title}
            items={moviesByCategory[cat.key]}
          />
        ))}
      </div>
    </main>
  );
}
