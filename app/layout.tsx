import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeNames } from "@/lib/models/themes";
import Config from "@/lib/config";

const lexend = Lexend({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: Config.title,
  description: Config.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

/*export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};*/

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={Config.lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${lexend.className} antialiased`}>
          <ThemeProvider attribute="data-theme" defaultTheme={ThemeNames.Dark} enableSystem enableColorScheme disableTransitionOnChange themes={Object.values(ThemeNames) as string[]}>
            <Navbar />
            <main className="sm:pt-0 pt-16 sm:pl-20 flex-1 min-h-screen">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
    </html>
  );
}
