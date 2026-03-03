import CarouselSection from "@/components/carousel-section"
import Config from "@/lib/config"
import { GetNowPlaying, GetUpcoming, GetTrending, GetTopRated, GetPopular } from "../api/movies/tmdb"

const movieCategories = [
  { key: "nowPlaying", title: "Now Playing", data: GetNowPlaying() },
  { key: "upcoming", title: "Upcoming", data: GetUpcoming() },
  { key: "trending", title: "Trending", data: GetTrending() },
  { key: "topMovies", title: "TOP 20", data: GetPopular() },
  { key: "topRated", title: "Top Rated", data: GetTopRated() },
]

export default async function Home() {
  const results = await Promise.all(movieCategories.map((cat) => cat.data))

  const moviesByCategory: Record<string, Movie[]> = {}
  movieCategories.forEach((cat, idx) => {
    moviesByCategory[cat.key] = results[idx].results
    .map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        url: `/movies/${movie.id}`
      }));
  })
  
  return (
    <main className="w-full min-h-screen px-8 py-6">
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
