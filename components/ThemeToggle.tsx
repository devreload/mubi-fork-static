"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeNames } from "@/lib/models/themes"

export function ThemeToggle({ showText, className }: { showText?: boolean, className?: string }) {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size={showText ? "default" : "icon"} className={className} />}>
          <Palette className="h-5 w-5" />
          {showText && (
            <span className="ml-2 inline">
              Change Theme
            </span>
          )}
          <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(ThemeNames).map((theme) => (
          <DropdownMenuItem
            key={theme}
            onSelect={() => setTheme(theme)}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1).replace("-", " ")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
