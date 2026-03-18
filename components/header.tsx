import { Button } from "@/components/ui/button"
import { Search, Dices } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { GetMoviesDiscover } from "@/app/api/movies/tmdb";
import Link from "next/link";

export default async function PageHeader() {
    const fetchRandomMovieId = async () => {
        const randomPage = Math.floor(Math.random() * 20) + 1; // Random page between 1 and 20
        try {
            const data = await GetMoviesDiscover(randomPage.toString());
            const movies = data.results;
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            return randomMovie.id;
        } catch (error) {
            console.error('Error fetching random movie:', error);
            return 550;
        }
    }
    return (
        <div className="flex flex-row items-center justify-between w-full mb-6 space-x-4">
            <form className="w-full flex flex-row items-center" action="/search" method="GET">
                <InputGroup className="w-full">
                    <InputGroupInput name="query" placeholder="Type to search..." />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton type="submit"><Search />Search</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </form>
            <Link href={`/movies/${await fetchRandomMovieId()}`}>
                <Button variant="outline" size="icon">
                    <Dices className="w-4 h-4" />
                </Button>
            </Link>
        </div>
    );
}
