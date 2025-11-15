'use client'
import { Archive, BookOpen, Home, User, Settings, LogOut, LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const NavBar = () => {
  const { isAuthenticated, role, checkAuth } = useAuth()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const mouseX = useMotionValue(Infinity)

  useEffect(() => {
    // Set mounted state to prevent animation on initial render
    setIsMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    checkAuth()
    router.replace("/")
  }

  // Define nav items based on authentication and role
  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { icon: Home, label: 'Home', onClick: () => router.push('/') },
        { icon: BookOpen, label: 'About', onClick: () => router.push('/about') },
        { icon: Archive, label: 'Contact', onClick: () => router.push('/contact') },
        { icon: LogIn, label: 'Sign In', onClick: () => router.push('/login') },
        { icon: UserPlus, label: 'Register', onClick: () => router.push('/register') },
      ]
    }

    if (role === 'STUDENT') {
      return [
        { icon: Home, label: 'Dashboard', onClick: () => router.push('/dashboard') },
        { icon: Archive, label: 'Connect', onClick: () => router.push('/courses') },
        { icon: User, label: 'Profile', onClick: () => router.push('/profile') },
        { icon: Settings, label: 'Settings', onClick: () => router.push('/settings') },
        { icon: LogOut, label: 'Logout', onClick: handleLogout },
      ]
    }

    if (role === 'ALUMNI') {
      return [
        { icon: Home, label: 'Dashboard', onClick: () => router.push('/dashboard') },
        { icon: Archive, label: 'Details', onClick: () => router.push('/instructor/manage-courses') },
        { icon: User, label: 'Profile', onClick: () => router.push('/profile') },
        { icon: Settings, label: 'Settings', onClick: () => router.push('/settings') },
        { icon: LogOut, label: 'Logout', onClick: handleLogout },
      ]
    }

    return []
  }

  const navItems = getNavItems()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ padding: isScrolled ? '0.25rem 0' : '1rem 0' }}>
      <motion.div 
        className="mx-auto px-4"
        animate={{
          maxWidth: isScrolled ? '48rem' : '80rem'
        }}
        transition={isMounted ? { duration: 0.4, ease: 'easeInOut' } : { duration: 0 }}
      >
        <motion.div
          animate={{
            backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
            borderRadius: isScrolled ? '9999px' : '0px',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
            paddingLeft: isScrolled ? '1rem' : '1.5rem',
            paddingRight: isScrolled ? '1rem' : '1.5rem',
            paddingTop: isScrolled ? '0.5rem' : '0.75rem',
            paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
          }}
          transition={isMounted ? { duration: 0.4, ease: 'easeInOut' } : { duration: 0 }}
          className={`flex items-center justify-between ${
            isScrolled ? 'border border-white/10 shadow-2xl' : ''
          }`}
        >
          {/* Logo */}
          <motion.div
            animate={{ 
              scale: isScrolled ? 0.85 : 1,
            }}
            transition={isMounted ? { duration: 0.3, ease: 'easeInOut' } : { duration: 0 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{
                  padding: isScrolled ? '0.375rem' : '0.5rem'
                }}
                transition={isMounted ? { duration: 0.3 } : { duration: 0 }}
                className="bg-gradient-to-br from-blue-500/30 to-blue-600/30 backdrop-blur-sm rounded-xl border border-blue-400/30"
              >
                <BookOpen className={isScrolled ? "w-5 h-5 text-blue-400" : "w-6 h-6 text-blue-400"} />
              </motion.div>
              <motion.span 
                animate={{
                  fontSize: isScrolled ? '1.25rem' : '1.5rem'
                }}
                transition={isMounted ? { duration: 0.3 } : { duration: 0 }}
                className="font-bold text-white"
              >
                Alumify
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => {
              mouseX.set(Infinity)
              setHoveredIndex(null)
            }}
            animate={{ 
              scale: isScrolled ? 0.9 : 1,
              gap: isScrolled ? '0.375rem' : '0.5rem'
            }}
            transition={isMounted ? { duration: 0.3, ease: 'easeInOut' } : { duration: 0 }}
            className="flex items-center"
            style={{ gap: isScrolled ? '0.375rem' : '0.5rem' }}
          >
            {navItems.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                index={index}
                mouseX={mouseX}
                isHovered={hoveredIndex === index}
                setHoveredIndex={setHoveredIndex}
                isScrolled={isScrolled}
                isMounted={isMounted}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  )
}

type NavItemProps = {
  item: {
    icon: any
    label: string
    onClick: () => void
  }
  index: number
  mouseX: any
  isHovered: boolean
  setHoveredIndex: (index: number | null) => void
  isScrolled: boolean
  isMounted: boolean
}

const NavItem = ({ item, index, mouseX, isHovered, setHoveredIndex, isScrolled, isMounted }: NavItemProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const Icon = item.icon

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [
    isScrolled ? 40 : 48, 
    isScrolled ? 52 : 72, 
    isScrolled ? 40 : 48
  ])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.button
      ref={ref}
      onClick={item.onClick}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ width }}
      animate={{
        height: isScrolled ? '2.5rem' : '3rem'
      }}
      transition={isMounted ? { duration: 0.3 } : { duration: 0 }}
      className="relative flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-200 group"
    >
      <Icon className={`text-white/80 group-hover:text-white transition-all duration-300 ${
        isScrolled ? 'w-4 h-4' : 'w-5 h-5'
      }`} />
      
      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-sm rounded-lg border border-white/20 whitespace-nowrap pointer-events-none"
        >
          {item.label}
        </motion.div>
      )}
    </motion.button>
  )
}

export default NavBar