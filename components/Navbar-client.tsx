"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, DoorOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavLink {
  name: string
  href: string
}

interface NavbarClientProps {
  navLinks: NavLink[]
}

export function NavbarClient({ navLinks }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // Check if current page should have dark text and static navbar
  const isDarkTextPage = ['/blog', '/gallery'].includes(pathname) || pathname.startsWith('/blog/')

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect if not on blog, gallery, or blog slug pages
      if (!isDarkTextPage) {
        setIsScrolled(window.scrollY > 50)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDarkTextPage])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isDarkTextPage 
          ? "bg-white shadow-md py-2" // Static style for blog/gallery
          : cn(
              "transition-all duration-300 ease-in-out",
              isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
            )
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <span 
              className={cn(
                "transition-colors duration-300", 
                isScrolled || isDarkTextPage ? "text-primary" : "text-white"
              )}
            >
              Cipta Mandiri
            </span>
            <span className="text-secondary"> Perkasa</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "font-medium transition-colors duration-300 hover:text-primary",
                isScrolled || isDarkTextPage ? "text-gray-800" : "text-white",
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white w-10 h-10 p-0" 
              title="Login"
            >
              <DoorOpen className="w-5 h-5" />
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className={isScrolled || isDarkTextPage ? "text-gray-800" : "text-white"} />
          ) : (
            <Menu className={isScrolled || isDarkTextPage ? "text-gray-800" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-800 hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white w-full flex items-center justify-center"
                  title="Login"
                >
                  <DoorOpen className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

