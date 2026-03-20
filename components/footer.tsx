import Link from "next/link";
import Config from "@/lib/config";
import NavMenu from "@/lib/navmenu";

const footerLinks = NavMenu.slice(0, 5);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="sm:pl-20 border-t border-border/70 bg-background/95">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {Config.name}. Streaming and discovery for movies, series, and more.
          </p>
          <nav aria-label="Footer links" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-foreground/80 transition hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {Config.name} does not host or store video files. The platform provides an interface built on third-party movie metadata APIs.
          </p>
          <p className="shrink-0 text-foreground/70">
            Data powered by{" "}
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-border underline-offset-4 transition hover:text-primary"
            >
              TMDB
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}