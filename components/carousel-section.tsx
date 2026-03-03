import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CarouselCard } from "@/components/carousel-card"
import { type CardItem } from "@/lib/models/card-item"
import { cn } from "@/lib/utils"

export default async function CarouselSection({
  title,
  items,
  ...props
}: {
  title: string;
  items: CardItem[];
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("w-full", props.className)}>
      <Carousel opts={{ align: "start", loop: true }}>
        <div className="flex items-center justify-between mb-4 px-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex space-x-3">
            <CarouselPrevious className="static! translate-y-0! left-0!" />
            <CarouselNext className="static! translate-y-0! right-0!" />
          </div>
        </div>
        <CarouselContent>
        {items.map((item: CardItem) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 select-none">
              <CarouselCard item={item} />
            </CarouselItem>
        ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
