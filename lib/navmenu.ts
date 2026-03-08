import { Home, Film, Tv, TvMinimalPlay, Search, LucideIcon, Bookmark } from 'lucide-react'

interface NavMenuItem {
    name: string
    path: string
    icon: LucideIcon
}

const NavMenu: NavMenuItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Series', path: '/series', icon: TvMinimalPlay },
    //{ name: 'TV', path: '/livetv', icon: Tv },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Saved', path: '/account/watchlist', icon: Bookmark }
] as NavMenuItem[]

export default NavMenu