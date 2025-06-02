"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, ChevronDown, Car } from "lucide-react"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { UserCircle } from 'lucide-react';
import { Button } from "./ui/button"

interface AuthCookies {
  isVerified: boolean
}

export function getAuthCookies(): AuthCookies {
  // Only run on client side
  if (typeof window === 'undefined') {
    return { isVerified: false }
  }

  const verifiedCookie = Cookies.get('verified')

  return {
    isVerified: verifiedCookie === 'true',
  }
}

const Navbar = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // Check auth cookies when component mounts
    const { isVerified } = getAuthCookies()
    setIsVerified(isVerified)
  }, [])

  const handleLogout = () => {
    // Remove the cookie
    Cookies.remove('verified')
    localStorage.removeItem("userDetails")
    setIsVerified(false)

    window.location.href = '/'
  }

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
  <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-2 gap-y-2">
    {/* Left: Logo */}
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <Image
          src="/txigo-logo.jpg"
          alt="Logo"
          width={120}
          height={120}
          className="rounded-lg w-24 h-auto md:w-[150px]"
        />
      </Link>
    </div>

    {/* Center: 24hrs Service Badge */}
    <div className="hidden md:flex-1 md:flex justify-center">
      <div className="bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium text-green-700 flex items-center w-fit">
        <Clock className="h-4 w-4 mr-1.5 text-green-600" />
        <span>24 hrs service available</span>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
      {/* Driver Login Button */}
      <Button
        variant="outline"
        className="bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 transition-colors focus-visible:ring-orange-400 
          text-xs md:text-base px-2 py-1 md:px-4 md:py-2"
      >
        <Car className="h-3 w-3 hidden md:block md:h-4 md:w-4" />
        <Link href="/driver">Driver Login</Link>
      </Button>

      {/* Download App Button */}
      <Link
        href="/download"
        className="hidden sm:flex items-center px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download App
      </Link>

      {/* Login or User Dropdown */}
      {isVerified ? (
        <div className="relative">
          <button
            className="flex items-center space-x-1 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserCircle className="h-7 w-7 text-gray-400" />
            <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Profile
              </Link>
              <Link
                href="/myRides"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                My Rides
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/login"
          className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Login
        </Link>
      )}
    </div>
  </div>
</nav>

  )
}

export default Navbar