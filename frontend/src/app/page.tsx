'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Particles from './components/background'
import { Button } from './components/Button'
import { useEffect } from 'react'

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
    <div className="relative bg-black w-full h-full overflow-hidden">
      <div className="absolute inset-0 w-full h-screen">
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
      
      <div className="relative pt-45 z-10 w-full h-full flex flex-col items-center justify-center gap-12">
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

        {!isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4 max-w-5xl">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-semibold text-white mb-2">For Students</h3>
              <p className="text-white/70">Connect with alumni, gain insights, and accelerate your career</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-2">For Alumni</h3>
              <p className="text-white/70">Give back, mentor students, and stay connected with your alma mater</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Grow Together</h3>
              <p className="text-white/70">Build meaningful relationships and unlock new opportunities</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}