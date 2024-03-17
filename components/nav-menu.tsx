"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"

export function NavMenu() {
    return <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/collect" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Collect
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Dashboard
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
}