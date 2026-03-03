import { Home, Film, Tv, TvMinimalPlay, Search, LucideIcon, Bookmark } from 'lucide-react'

const NavMenu: { name: string; path: string; icon: LucideIcon }[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Series', path: '/series', icon: TvMinimalPlay },
    { name: 'TV', path: '/livetv', icon: Tv },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Saved', path: '/account/watchlist', icon: Bookmark }
]

export default NavMenu