"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface FormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: Role;
    batch: string;
    github: string;
    linkedin: string;
    bio: string;
    website: string;
    organisation: string;
}

enum Role {
    STUDENT = "STUDENT",
    ALUMNI = "ALUMNI",
}

interface FormErrors {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: string;
    general: string;
}

// --- SUB-COMPONENTS ---

const GlassInputWrapper = ({ children, hasError }: { children: React.ReactNode; hasError?: boolean }) => (
  <div className={`rounded-2xl border ${hasError ? 'border-red-500/70' : 'border-zinc-700'} bg-zinc-900/50 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10`}>
    {children}
  </div>
);

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

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

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Emily Rodriguez",
    handle: "@emilytech",
    text: "Joining this platform was the best decision. It's connected me with amazing opportunities!"
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "James Wilson",
    handle: "@jameswilson",
    text: "The community here is incredible. I've learned so much and made great connections."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sophia Anderson",
    handle: "@sophiacodes",
    text: "A game-changer for my career. Highly recommend to anyone looking to grow professionally."
  },
];

// --- MAIN COMPONENT ---

export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: Role.STUDENT,
        batch: '',
        bio: '',
        github: '',
        linkedin: '',
        organisation: '',
        website: ''
    });

    const [errors, setErrors] = useState<FormErrors>({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: '',
        general: ''
    });

    const handleInputChange = (field: keyof FormData, value: string | Role): void => {
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

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            role: '',
            general: ''
        };

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            setErrors({
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                role: '',
                general: ''
            });

            const registrationData = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: formData.role,
                batch: formData.batch,
                linkedin: formData.linkedin,
                github: formData.github,
                organisation: formData.organisation,
                website: formData.website,
                bio: formData.bio
            };

            console.log('Registration data:', registrationData);

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
                registrationData
            );

            console.log(result);

            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: Role.STUDENT,
                batch: '',
                bio: '',
                website: '',
                github: '',
                linkedin: '',
                organisation: ''
            });

            router.push('/login');
        } catch (error: any) {
            console.log('Full error:', error.response?.data);

            if (error.response?.data?.error) {
                const backendErrors = error.response.data.error;

                const transformedErrors: FormErrors = {
                    email: '',
                    name: '',
                    password: '',
                    confirmPassword: '',
                    role: '',
                    general: ''
                };

                if (typeof backendErrors === 'object' && backendErrors !== null) {
                    const fieldMapping: { [key: string]: keyof FormErrors } = {
                        'email': 'email',
                        'name': 'name',
                        'password': 'password',
                        'role': 'role'
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
                    general: 'Registration failed. Please try again.'
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex flex-col md:flex-row w-full bg-zinc-950 text-zinc-50 overflow-hidden">
            {/* Left column: register form */}
            <section className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-4xl md:text-5xl font-semibold leading-tight opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
                            <span className="font-light text-zinc-50 tracking-tighter">Create Account</span>
                        </h1>
                        <p className="text-zinc-400 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
                            Join our community and start your journey with us
                        </p>

                        <form className="space-y-4" onSubmit={handleSubmit}>
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

                            <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.35s_forwards]">
                                <label className="text-sm font-medium text-zinc-400">Full Name</label>
                                <GlassInputWrapper hasError={!!errors.name}>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                        required
                                    />
                                </GlassInputWrapper>
                                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                            </div>

                            <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]">
                                <label className="text-sm font-medium text-zinc-400">Password</label>
                                <GlassInputWrapper hasError={!!errors.password}>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a password (min 6 characters)"
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

                            <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.45s_forwards]">
                                <label className="text-sm font-medium text-zinc-400">Confirm Password</label>
                                <GlassInputWrapper hasError={!!errors.confirmPassword}>
                                    <div className="relative">
                                        <input
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5 text-zinc-400 hover:text-zinc-50 transition-colors" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-zinc-400 hover:text-zinc-50 transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                                {errors.confirmPassword && <span className="text-red-500 text-xs mt-1 block">{errors.confirmPassword}</span>}
                                {formData.password !== '' && formData.confirmPassword !== '' && formData.password === formData.confirmPassword && (
                                    <span className="text-green-500 text-xs mt-1 block">Passwords match ✓</span>
                                )}
                            </div>

                            <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.5s_forwards]">
                                <label className="text-sm font-medium text-zinc-400">Batch</label>
                                <GlassInputWrapper>
                                    <input
                                        name="batch"
                                        type="text"
                                        placeholder="e.g., 2024, 2025"
                                        value={formData.batch}
                                        onChange={(e) => handleInputChange('batch', e.target.value)}
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                        required
                                    />
                                </GlassInputWrapper>
                            </div>

                            <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.55s_forwards]">
                                <label className="text-sm font-medium text-zinc-400">Role</label>
                                <GlassInputWrapper hasError={!!errors.role}>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={(e) => handleInputChange('role', e.target.value as Role)}
                                        className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 cursor-pointer"
                                        required
                                    >
                                        <option value={Role.STUDENT} className="bg-zinc-900">Student</option>
                                        <option value={Role.ALUMNI} className="bg-zinc-900">Alumni</option>
                                    </select>
                                </GlassInputWrapper>
                                {errors.role && <span className="text-red-500 text-xs mt-1 block">{errors.role}</span>}
                            </div>

                            {formData.role === "ALUMNI" && (
                                <>
                                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.6s_forwards]">
                                        <label className="text-sm font-medium text-zinc-400">LinkedIn</label>
                                        <GlassInputWrapper>
                                            <input
                                                name="linkedin"
                                                type="url"
                                                placeholder="LinkedIn profile link"
                                                value={formData.linkedin}
                                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                                className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                            />
                                        </GlassInputWrapper>
                                    </div>

                                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.65s_forwards]">
                                        <label className="text-sm font-medium text-zinc-400">GitHub</label>
                                        <GlassInputWrapper>
                                            <input
                                                name="github"
                                                type="url"
                                                placeholder="GitHub profile link"
                                                value={formData.github}
                                                onChange={(e) => handleInputChange('github', e.target.value)}
                                                className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                            />
                                        </GlassInputWrapper>
                                    </div>

                                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.7s_forwards]">
                                        <label className="text-sm font-medium text-zinc-400">Personal Website</label>
                                        <GlassInputWrapper>
                                            <input
                                                name="website"
                                                type="url"
                                                placeholder="Portfolio or website"
                                                value={formData.website}
                                                onChange={(e) => handleInputChange('website', e.target.value)}
                                                className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                            />
                                        </GlassInputWrapper>
                                    </div>

                                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.75s_forwards]">
                                        <label className="text-sm font-medium text-zinc-400">Organisation</label>
                                        <GlassInputWrapper>
                                            <input
                                                name="organisation"
                                                type="text"
                                                placeholder="Your company or institute"
                                                value={formData.organisation}
                                                onChange={(e) => handleInputChange('organisation', e.target.value)}
                                                className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500"
                                            />
                                        </GlassInputWrapper>
                                    </div>

                                    <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.8s_forwards]">
                                        <label className="text-sm font-medium text-zinc-400">Bio</label>
                                        <GlassInputWrapper>
                                            <textarea
                                                name="bio"
                                                placeholder="Tell us about yourself"
                                                value={formData.bio}
                                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                                rows={3}
                                                className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-zinc-50 placeholder:text-zinc-500 resize-none"
                                            />
                                        </GlassInputWrapper>
                                    </div>
                                </>
                            )}

                            {errors.general && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                                    <span className="text-red-500 text-sm">{errors.general}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.85s_forwards] w-full rounded-2xl bg-violet-600 py-4 font-medium text-white hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        <p className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.9s_forwards] text-center text-sm text-zinc-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-violet-400 hover:underline transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            {/* Right column: hero image + testimonials */}
            <section className="hidden md:block flex-1 relative p-4">
                <div
                    className="opacity-0 animate-[slideRight_0.8s_ease-out_0.3s_forwards] absolute inset-4 rounded-3xl bg-cover bg-center"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2160&q=80)` }}
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