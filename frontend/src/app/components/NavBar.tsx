'use client'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const { isAuthenticated, role, checkAuth } = useAuth()
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    checkAuth()
    router.replace("/")
  }

  return (
    <header className="absolute top-0 bg-blue-100 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Alumify</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && (
              <>
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                  Contact
                </Link>
              </>
            )}

            {isAuthenticated && role === 'STUDENT' && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">
                  Connect
                </Link>
              </>
            )}

            {isAuthenticated && role === 'ALUMNI' && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  Alumni Dashboard
                </Link>
                <Link href="/instructor/manage-courses" className="text-gray-700 hover:text-blue-600 font-medium">
                  Details
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                    Sign In
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar