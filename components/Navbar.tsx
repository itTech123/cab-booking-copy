import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/txigo-logo.jpg"
              alt="Logo"
              width={150}
              height={150}
              className="rounded-lg"
            />
          </Link>
        </div>

        {/* Center: 24hrs Service Badge */}
        <div className="hidden md:flex-1 md:flex justify-center ">
          <div className="bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium text-green-700 flex items-center w-fit">
            <Clock className="h-4 w-4 mr-1.5 text-green-600" />
            <span>24 hrs service available</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/download"
            className="hidden sm:flex items-center px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download App
          </Link>

          <Link
            href="/login"
            className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar