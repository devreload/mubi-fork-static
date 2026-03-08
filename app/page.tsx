import CarouselSection from "@/components/carousel-section"
import HeroSection from "@/components/hero-section"
import PageHeader from "@/components/header"
import { type CardItem } from "@/lib/models/card-item"
import { GetNowPlaying, GetTopRated, GetPopular, GetTrending, GetUpcoming } from "./api/movies/tmdb"

const movieCategories = [
  { key: "nowPlaying", title: "Now Playing", fn: GetNowPlaying },
  { key: "upcoming", title: "Upcoming", fn: GetUpcoming },
  { key: "trending", title: "Trending", fn: GetTrending },
  { key: "topMovies", title: "TOP 20", fn: GetPopular },
  { key: "topRated", title: "Top Rated", fn: GetTopRated },
]

export default async function Home() {
  const results = await Promise.all(
    movieCategories.map((cat) => cat.fn())
  )

  const movieOTW: Movie | undefined = results[0].results[0]; // First movie from "Now Playing" category

  const moviesByCategory: Record<string, CardItem[]> = {}
  movieCategories.forEach((cat, idx) => {
    moviesByCategory[cat.key] = results[idx].results
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
