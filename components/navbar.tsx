import Link from 'next/link'
import NavMenu from '@/lib/navmenu'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 flex flex-row sm:flex-col sm:w-fit w-full h-fit sm:min-h-screen z-50 p-4 bg-sidebar sm:border-r border-secondary/80 justify-between items-center">
            <Link href="/" className="relative w-28 h-6 sm:w-12 sm:h-12 aspect-square">
                <Image className="hidden sm:block invert dark:invert-0 object-contain" src="/logo.png" alt="Logo" sizes="5vw" fill />
                <Image className="block sm:hidden dark:invert invert-0 object-contain" src="/banner.png" alt="Logo" sizes="15vw" fill />
            </Link>
            <div className="hidden sm:flex flex-col space-y-6">
            {NavMenu.map((item) => {
                return (
                    <Link key={item.name} href={item.path} className="text-sm font-medium text-foreground/80 hover:text-primary transition">
                        <div className="flex flex-col items-center space-y-1">
                            {item.icon && <item.icon className="w-5 h-5" />}
                            <span>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                        </div>
                    </Link>
                )
            })}
            </div>
            <Link href="/account" className="hidden sm:block text-sm font-medium text-foreground/80 hover:text-primary transition">
                <Avatar className="mb-2 w-8 h-8 ring-primary hover:ring-foreground ring-offset-background ring-1 ring-offset-2 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>
            <Button variant="ghost" className="sm:hidden">
                <Menu />
                Menu
            </Button>
        </nav>
    )
}