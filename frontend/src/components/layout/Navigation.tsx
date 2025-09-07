'use client'

import { FileText, GitFork, Github, Hand, HandMetal, Home, Menu } from "lucide-react";
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/typography";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Separator } from "@radix-ui/react-separator";

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the sheet whenever the route changes
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="fixed w-full bg-white md:bg-transparent top-0 z-40 flex items-center gap-1 md:gap-2 p-4 pb-3 md:p-6 md:py-8">
      <div className="relative">
        <Hand size={22} />
        <GitFork size={12} className="bg-white absolute -right-0.5 -bottom-0.5" />
      </div>
      <Text as="h5" element="h1">
        Sign Classifier
      </Text>
      <Badge variant={"secondary"} className="ml-1">
        v 1.0
      </Badge>
      <NavigationLinks />
      <div className="ml-auto flex hover:cursor-pointer">
        <Link href="https://github.com/dominikschweigl/sign_lang" target="_blank" className="hidden lg:block">
          <Button variant={"link"} className="gap-1.5">
            <Github className="size-4" />
            dominikschweigl/sign-lang
          </Button>
        </Link>
        <Link href="https://github.com/dominikschweigl/sign_lang" target="_blank" className="lg:hidden">
          <Button variant={"ghost"} size={"icon"}>
            <Github className="size-4" />
          </Button>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto px-2 pb-4">
            <SheetHeader>
              <SheetTitle className="flex gap-2 flex-nowrap">
                <div className="relative">
                  <Hand size={22} />
                  <GitFork size={12} className="bg-white absolute -right-0.5 -bottom-0.5" />
                </div>
                Sign Classifier
              </SheetTitle>
            </SheetHeader>
            <Separator className=" bg-gray-200 w-full h-px -mt-2"/>
            <div className="flex flex-col gap-6 p-4">
              <div className="flex flex-nowrap items-center gap-2">
                <Home size={18}/>
                <Link href="./" passHref>
                  Home
                </Link>
              </div>
              <div className="flex flex-nowrap items-center gap-2">
                <FileText size={18}/>
                <Link href="./report" passHref>
                  Report
                </Link>
              </div>
              <div className="flex flex-nowrap items-center gap-2">
                <HandMetal size={18}/>
                <Link href="./signs" passHref>
                  Sign Reference
                </Link>
              </div>
            </div>
            <Separator className="mt-auto bg-gray-200 w-full h-px"/>
            <Link href="https://github.com/dominikschweigl/sign_lang" target="_blank">
              <Button variant={"link"} className="gap-1.5 mt-1">
                <Github className="size-4" />
                dominikschweigl/sign-lang
              </Button>
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function NavigationLinks() {
  return (
    <NavigationMenu className="lg:ml-4 hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="./" passHref>
              Home
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="./report" passHref>
              Report
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="./signs" passHref>
              Sign Reference
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
