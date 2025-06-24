"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Globe,
  Server,
  Layout,
  Clock,
  PenToolIcon as Tool,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
} from "lucide-react"
import packageJson from "@/package.json"
import Image from "next/image"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

interface SidebarProps {
  children: React.ReactNode
  email: string
  name: string
  breadcrumbPath?: string[]
}

export default function Sidebar({ children, email, name, breadcrumbPath }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const initials = useState(() => {
    const nameToUse = name

    return nameToUse
      .split(" ")
      .filter((part) => part.length > 0)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  })[0]

  const logout = () => {
    Cookies.remove("token")
    router.push("/")
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-base-100">
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center p-4 bg-base-200 border-b">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="btn btn-square btn-ghost">
          <Menu size={24} />
        </button>
        <span className="ml-2 text-xl font-bold">Tada</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        bg-base-200 text-base-content md:flex md:flex-col
        ${isMobileMenuOpen ? "block" : "hidden"} md:block
        w-full md:w-72 md:h-screen md:sticky md:top-0 md:left-0
        relative
      `}
      >
        {/* Top section with logo and title */}
        <div className="hidden md:block">
            <div className="p-4">
            <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-lg" />
                <div>
                <h2 className="text-xl font-bold">Tada</h2>
                <p className="text-sm opacity-70">v{packageJson.version}</p>
                </div>
            </div>
            </div>
        </div>

        {/* Navigation menu - scrollable if needed */}
        <div className="overflow-y-auto" style={{ height: "calc(100vh - 160px)" }}>
          <ul className="menu menu-md p-4 w-full">
            <li className="w-full">
              <Link 
                href="/dashboard" 
                className={`flex items-center w-full justify-start px-3 py-2 ${pathname === '/dashboard' ? 'bg-primary/20 text-primary font-medium' : ''}`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="menu-title mt-4">
              <span>Settings</span>
            </li>
            <li className="w-full">
              <Link 
                href="/dashboard/settings" 
                className={`flex items-center w-full justify-start px-3 py-2 ${pathname.startsWith('/dashboard/settings') ? 'bg-primary/20 text-primary font-medium' : ''}`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* User profile fixed at bottom */}
        <div className="p-4 border-t border-base-300 absolute bottom-0 left-0 w-full bg-base-200">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-base-300 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-content">
                <span className="inline-flex items-center justify-center" style={{ lineHeight: 1 }}>
                  {initials}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">{name}</p>
              </div>
              <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-full bg-base-100 rounded-lg shadow-lg border border-base-300 overflow-hidden">
                <ul className="menu p-0 w-full">
                  <li className="w-full">
                    <button
                      onClick={() => logout()}
                      className="flex items-center text-error w-full rounded-none px-4 py-3 justify-start"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <div className="p-8 overflow-auto flex-1">
            {children}
        </div>
      </main>
    </div>
  )
}