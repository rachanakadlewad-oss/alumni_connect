'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Particles from './components/background'
import { Button } from './components/Button'
import { useEffect } from 'react'
import CurvedLoop from './components/circular'
import { AlumniCarousel } from './components/notable'

export default function Home() {
  const { isAuthenticated, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSignUp = () => {
    router.push('/register')
  }

  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <div className="relative bg-black w-full min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 w-full h-screen">
        <Particles
          particleColors={['#e0f2fe', '#dbeafe', '#bfdbfe']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <div className=" pt-45 relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-12 px-4">
        <div className="text-center space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold text-white drop-shadow-2xl">
            Alumni <span className="text-blue-500">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto px-4">
            Bridge the gap between alumni and students. Share knowledge, build connections, and grow together.
          </p>
        </div>

        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              variant="primary"
              onClick={handleSignUp}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        )}
        
        <CurvedLoop marqueeText="Welcome to IIIT Dharwad Alumni Network ✦" curveAmount={0} />
      </div>

      <section className="relative z-10 w-full min-h-screen bg-black flex items-center justify-center p-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 mb-4">
              Notable Alumni
            </h2>
            <p className="text-base md:text-lg text-blue-300/80">
              Celebrating our exceptional graduates
            </p>
          </div>
          <AlumniCarousel />
        </div>
      </section>
    </div>
  )
}