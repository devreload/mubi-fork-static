import { getMediaImage } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play } from "lucide-react";
import { DBImageSizes } from "@/lib/models/dbimage";

export default async function HeroSection({ movie }: { movie?: Movie }) {
  const bgImage = movie
    ? getMediaImage(DBImageSizes.original, movie.backdrop_path || movie.poster_path)
    : '/movie_artwork.webp';
  return (
      <section className="w-full h-[calc(100vh-16rem)] rounded-3xl overflow-hidden relative border border-secondary/80" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-end">
          {movie ? (
            <>
              <div className="flex items-end justify-between gap-8">
                <div className="flex-1">
                  <h1 className="text-sm sm:text-4xl font-bold text-white drop-shadow-lg">{movie.title}</h1>
                  <p className="line-clamp-4 hidden sm:block mt-2 text-md text-white/90 max-w-3xl drop-shadow-lg">{movie.overview}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-4">
                  <Badge variant="secondary">
                    <Star className="w-4 h-4 mr-1 inline-block" />
                    {movie.vote_average.toFixed(1)}
                  </Badge>
                  <Link href={`/movies/${movie.id}`}>
                    <Button size="lg">
                      <Play className="w-4 h-4 mr-1" />
                      Watch Now
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Welcome to Mubi</h1>
          )}
        </div>
      </section>
  );
}
