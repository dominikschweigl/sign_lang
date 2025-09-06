import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FooterProps {
    copyright?: string
    bottomLinks?: {
        text: string,
        url: string
    }[]
}


const Footer = ({ copyright, bottomLinks }: FooterProps) => {
  return (
        <footer className="w-full md:gap-2 p-4 pb-3 md:p-6 md:py-8">
          <div className="w-full text-black flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
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
          </div>
        </footer>
  );
};

export { Footer };