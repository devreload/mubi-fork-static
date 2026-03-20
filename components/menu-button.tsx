"use client"
import { useState } from "react"
import Link from 'next/link'
import NavMenu from '@/lib/navmenu'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export function MenuOverlay({ setMenuOpen }: { setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-8">
            <Button variant="ghost" className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
                Close
            </Button>
            {NavMenu.map((item) => {
                return (
                    <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="text-2xl font-medium text-white hover:text-primary transition"
                    >
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </Link>
                )
            })}
            <Link href="/account" onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-white hover:text-primary transition">
                Account
            </Link>
        </div>
    )
}

export function MenuButton() {
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleMenu = () => {
        setIsOpen(prev => !prev)
    }

    if (isOpen) {
        return <MenuOverlay setMenuOpen={setIsOpen} />
    }

    return (
        <Button variant="ghost" className="sm:hidden" onClick={toggleMenu}>
            <Menu />
            Menu
        </Button>
    )
}