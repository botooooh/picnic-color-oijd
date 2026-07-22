"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  
  const isHome = pathname === "/"
  const useTransparentStyle = isHome && !scrolled

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    { href: "/", label: "Accueil" },
    { href: "/#programme", label: "Programme" },
    { href: "/tirage", label: "Tirage" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        useTransparentStyle ? "bg-transparent" : "bg-background/80 backdrop-blur-md border-b shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 z-50">
          <img src={useTransparentStyle ? "/images/logo OIJD blanc.svg" : "/images/logo OIJD.svg"} alt="OIJD Logo" className="h-10 w-auto object-contain transition-all" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === route.href || (pathname === "/" && route.href === "/#programme" && scrolled)
                  ? "text-primary"
                  : useTransparentStyle ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
              )}
            >
              {route.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link href="/paiement" className={cn(buttonVariants({ variant: "default" }), "rounded-full shadow-lg hover:shadow-xl transition-all")}>
            Réserver maintenant
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden z-50", useTransparentStyle && "text-white hover:text-white/80 hover:bg-white/20")}>
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-8">
            <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
            <nav className="flex flex-col gap-6 mt-12">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-semibold tracking-tight transition-colors hover:text-primary"
                >
                  {route.label}
                </Link>
              ))}
              <Link href="/paiement" onClick={() => setIsOpen(false)} className={cn(buttonVariants({ variant: "default" }), "mt-8 rounded-full h-12 text-lg")}>
                Réserver maintenant
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
