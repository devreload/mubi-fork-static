"use client"

import { useState } from "react"
import { Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeNames } from "@/lib/models/themes"

interface ThemeToggleProps {
  showText?: boolean
  className?: string
}

export default function ThemeToggle({ showText, className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [themeState, setThemeState] = useState<string>(theme || ThemeNames.System)

  const changeTheme = (value: string) => {
    setThemeState(value)
    setTheme(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size={showText ? "default" : "icon"} className={className} />}>
        <Palette />
        {showText && "Change Theme"}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Change Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={themeState} onValueChange={changeTheme}>
            {Object.values(ThemeNames).map((themeOption) => (
              <DropdownMenuRadioItem key={themeOption} value={themeOption}>
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
