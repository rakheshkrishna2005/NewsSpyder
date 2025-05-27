"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Shield, Github, House, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-orbitron font-bold">
                News Spyder
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="sm:flex font-inter">
                <House className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link href="/articles">
              <Button variant="outline" size="sm" className="sm:flex font-inter">
                <Newspaper className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Articles</span>
              </Button>
            </Link>
            <Link href="https://github.com/rakheshkrishna2005/NewsSpyder">
              <Button variant="outline" size="sm" className="hidden sm:flex font-inter">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
