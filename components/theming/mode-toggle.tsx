"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export function ModeToggle({...props}) {
  const { theme, setTheme } = useTheme()

  return <DropdownMenu {...props}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon" className={cn("group", "theme-" + (theme ?? "system"))}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] scale-0 group-[.theme-light]:scale-100" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 group-[.theme-dark]:scale-100" />
        <DesktopIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 group-[.theme-system]:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuCheckboxItem onClick={() => setTheme("light")} checked={theme === "light"}>
        Light
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem onClick={() => setTheme("dark")} checked={theme === "dark"}>
        Dark
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem onClick={() => setTheme("system")} checked={(theme ?? "system") === "system"}>
        System
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
}