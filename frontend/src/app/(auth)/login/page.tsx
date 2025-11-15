"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

// --- HELPER COMPONENTS (ICONS) ---

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
);

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
  general: string;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children, hasError }: { children: React.ReactNode; hasError?: boolean }) => (
  <div className={`rounded-2xl border ${hasError ? 'border-red-500/70' : 'border-zinc-700'} bg-zinc-900/50 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10`}>
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: string }) => (
  <div className={`${delay} flex items-start gap-3 rounded-3xl bg-zinc-800/40 backdrop-blur-xl border border-zinc-700/50 p-5 w-64 opacity-0 animate-[slideUp_0.6s_ease-out_forwards]`}>
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium text-zinc-50">{testimonial.name}</p>
      <p className="text-zinc-400">{testimonial.handle}</p>
      <p className="mt-1 text-zinc-300">{testimonial.text}</p>
    </div>
  </div>
);

// --- SAMPLE TESTIMONIALS ---

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity."
  },
];

// --- MAIN COMPONENT ---

export default function Login() {
  const { checkAuth } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    general: ''
  });

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    try {
      setErrors({
        email: '',
        password: '',
        general: ''
      });
      
      const registrationData = {
        ...formData
      };

      const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        registrationData
      );
      
      console.log(result);
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('session-id', result.data.user);
      localStorage.setItem('name', result.data.name);
      localStorage.setItem('role', result.data.role);
      
      setFormData({
        email: '',
        password: '',
      });
      
      checkAuth();
      window.dispatchEvent(new Event('authStateChanged'));
      router.replace('/dashboard');
    } catch (error: any) {
      console.log('Full error:', error.response?.data);

      if (error.response?.data?.error) {
        const backendErrors = error.response.data.error;

        const transformedErrors: FormErrors = {
          email: '',
          password: '',
          general: ''
        };

        if (typeof backendErrors === 'object' && backendErrors !== null) {
          const fieldMapping: { [key: string]: keyof FormErrors } = {
            'email': 'email',
            'password': 'password',
            'general': 'general'
          };

          Object.entries(backendErrors).forEach(([field, fieldError]: [string, any]) => {
            if (field === '_errors' && Array.isArray(fieldError) && fieldError.length > 0) {
              transformedErrors.general = fieldError[0];
            } else if (fieldError && fieldError._errors && Array.isArray(fieldError._errors) && fieldError._errors.length > 0) {
              const frontendField = fieldMapping[field];
              if (frontendField) {
                transformedErrors[frontendField] = fieldError._errors[0];
              }
            }
          });
        } else if (typeof backendErrors === 'string') {
          transformedErrors.general = backendErrors;
        }
        setErrors(transformedErrors);
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Login failed. Please try again.'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Continue with Google clicked");
    // Implement Google sign-in logic here
  };

  return (
    <div className="pt-25 h-full flex flex-col md:flex-row w-full bg-zinc-950 text-zinc-50">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
              <span className="font-light text-zinc-50 tracking-tighter">Welcome Back</span>
            </h1>
            <p className="text-zinc-400 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
              Access your account and continue your journey with us
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]">
                <label className="text-sm font-medium text-zinc-400">Email Address</label>
                <GlassInputWrapper hasError={!!errors.email}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                    required
                  />
                </GlassInputWrapper>
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
              </div>

              <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]">
                <label className="text-sm font-medium text-zinc-400">Password</label>
                <GlassInputWrapper hasError={!!errors.password}>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-zinc-400 hover:text-zinc-50 transition-colors" />
                      ) : (
                        <Eye className="w-5 h-5 text-zinc-400 hover:text-zinc-50 transition-colors" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
                {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password}</span>}
              </div>

              {errors.general && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                  <span className="text-red-500 text-sm">{errors.general}</span>
                </div>
              )}

              <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.5s_forwards] flex items-center justify-between text-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="rememberMe" className="w-5 h-5 rounded border-2 border-zinc-700 bg-transparent checked:bg-violet-500 checked:border-violet-500 cursor-pointer" />
                  <span className="text-zinc-300">Keep me signed in</span>
                </label>
                <a href="#" className="hover:underline text-violet-400 transition-colors">
                  Reset password
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.6s_forwards] w-full rounded-2xl bg-violet-600 py-4 font-medium text-white hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <p className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.7s_forwards] text-center text-sm text-zinc-400">
              New to our platform?{' '}
              <Link href="/register" className="text-violet-400 hover:underline transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      <section className="hidden md:block flex-1 relative p-4">
        <div
          className="opacity-0 animate-[slideRight_0.8s_ease-out_0.3s_forwards] absolute inset-4 rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80)` }}
        ></div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
          <TestimonialCard testimonial={sampleTestimonials[0]} delay="delay-[1000ms]" />
          <div className="hidden xl:flex">
            <TestimonialCard testimonial={sampleTestimonials[1]} delay="delay-[1200ms]" />
          </div>
          <div className="hidden 2xl:flex">
            <TestimonialCard testimonial={sampleTestimonials[2]} delay="delay-[1400ms]" />
          </div>
        </div>
      </section>
    </div>
  );
}