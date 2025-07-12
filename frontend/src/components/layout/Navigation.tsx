import { GitFork, Github, Hand } from "lucide-react";
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

export default function Navigation() {
  return (
    <header className="absolute w-full bg-white md:bg-transparent top-0 z-40 flex items-center gap-1 md:gap-2 p-4 pb-3 md:p-6 md:py-8">
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
      <Menu />
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
      </div>
    </header>
  );
}

export function Menu() {
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
            <Link href="./about" passHref>
              About
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="./signs" passHref>
              Signs
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
