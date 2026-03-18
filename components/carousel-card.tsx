import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getMediaImage } from "@/lib/utils"
import { DBImageSizes } from "@/lib/models/dbimage"
import { type CardItem } from "@/lib/models/card-item"

export function CarouselCard({ item }: { item: CardItem }) {
    const imageSrc = getMediaImage(DBImageSizes.w342, item.poster_path) ?? "/movie_artwork.webp"

    const year = item.release_date
        ? new Date(item.release_date).getFullYear()
        : undefined

    return (
        <Link href={item.url ?? "/"} className="group block" aria-label={`View details for ${item.title}`}>
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-md">
                <Image
                    src={imageSrc}
                    alt={item.title ?? "Movie poster"}
                    fill
                    sizes="(max-width: 768px) 40vw, 15vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={false}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                {year && (
                    <p className="text-sm text-gray-300">{year}</p>
                )}
                <Button size="sm" className="mt-3 w-full">
                    View Details
                </Button>
                </div>
            </div>
        </Link>
    )
}