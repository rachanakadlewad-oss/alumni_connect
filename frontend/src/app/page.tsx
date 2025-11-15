'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Particles from './components/background'
import { Button } from './components/Button'
import { useEffect } from 'react'
import CurvedLoop from './components/circular'
import { AlumniCarousel } from './components/notable'
import Footer from './components/Footer'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="relative bg-black w-full min-h-screen overflow-x-hidden">

      {/* --- Particles Background --- */}
      <div className="fixed inset-0 h-screen w-full">
        <Particles
          particleColors={['#e0f2fe', '#dbeafe', '#bfdbfe']}
          particleCount={150}
          particleSpread={8}
          speed={0.1}
          particleBaseSize={90}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-10 px-6 pt-24 text-center">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-white drop-shadow-xl leading-tight">
          Alumni <span className="text-blue-500">Connect</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
          Bridge the gap between alumni and students. Share knowledge, build connections, and grow together.
        </p>

        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4">
            <Button size="lg" variant="primary" onClick={() => router.push('/register')}>
              Get Started
            </Button>

            <Button size="lg" variant="secondary" onClick={() => router.push('/login')}>
              Sign In
            </Button>
          </div>
        )}

        <CurvedLoop marqueeText="Welcome to IIIT Dharwad Alumni Network ✦" curveAmount={0} />
      </div>

      {/* --- NOTABLE ALUMNI SECTION --- */}
      <section className="relative z-10 w-full min-h-screen bg-black flex items-center justify-center p-6">

        {/* Subtle background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-24 left-1/4 w-[420px] h-[420px] bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-24 right-1/4 w-[420px] h-[420px] bg-blue-800/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Notable Alumni
            </h2>
            <p className="text-base sm:text-lg text-blue-300/80 mt-2">
              Celebrating our exceptional graduates
            </p>
          </div>

          <AlumniCarousel />
        </div>
      </section>
        <Footer />
    </div>
  )
}
