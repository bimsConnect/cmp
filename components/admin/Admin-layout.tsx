"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  FileText,
  ImageIcon,
  MessageSquare,
  Menu,
  X,
  LogOut,
  Settings,
  UserCircle,
  Home,
  ChevronDown,
  Search,
  Bell,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Only show theme toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: BarChart2,
    },
    {
      name: "Blog",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      name: "Testimonial",
      href: "/admin/testimonial",
      icon: MessageSquare,
    },
    {
      name: "Galeri",
      href: "/admin/galeri",
      icon: ImageIcon,
    },
    {
      name: "Pengaturan",
      href: "/admin/pengaturan",
      icon: Settings,
    },
    {
      name: "Profil",
      href: "/admin/profile",
      icon: UserCircle,
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#f6f9fc] dark:bg-gray-950">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-gray-200 dark:border-gray-800",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4">
            <Link href="/admin" className="flex items-center">
              <div className="bg-primary text-white h-8 w-8 rounded-md flex items-center justify-center mr-2">
                <Home className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      pathname === item.href
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white",
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <Button variant="outline" className="flex w-full items-center justify-center" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={toggleSidebar}></div>}

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 md:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="search"
                placeholder="Cari..."
                className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-700 dark:text-gray-300"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-300">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-flex text-sm font-medium text-gray-700 dark:text-gray-300">
                    Admin
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

