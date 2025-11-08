"use client"
import Link from 'next/link';
import { Button } from '../../components/Button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeClosed } from 'lucide-react';

interface FormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: Role;
    batch: string,
    github: string,
    linkedin: string,
    bio: string,
    website: string,
    organisation: string
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

export default function Register() {
    const router = useRouter();
    const [showPass,setShowPass]=useState(false)
    const [showPassCon,setShowPassCon]=useState(false)
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

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
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
                batch:formData.batch,
                linkedin:formData.linkedin,
                github:formData.github,
                organisation:formData.organisation,
                website:formData.website,
                bio:formData.bio
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
        <div className=" mt-25 flex flex-col gap-y-4 justify-center items-center w-full min-h-screen p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className='text-3xl font-bold text-blue-700'>Register</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 bg-blue-700/10 w-full max-w-md rounded-lg p-6 sm:p-8 shadow-lg">

                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Email *</label>
                    <input
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        required
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                </div>

                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Full Name *</label>
                    <input
                        placeholder="Enter your full name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        required
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Password *</label>
                    <div className='relative'>
                    <input
                        placeholder="Create a password (min 6 characters)"
                        type={showPass?"text":"password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`p-3 outline-none w-full bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        required
                    />
                    {showPass?<Eye className='absolute top-3 right-5' onClick={()=>setShowPass(!showPass)}/>:<EyeClosed className='absolute top-3 right-5' onClick={()=>setShowPass(!showPass)}/>}
                    </div>
                    {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
                </div>

                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Confirm Password *</label>
                    <div className='relative'>
                    <input
                        placeholder="Confirm your password"
                        type={showPassCon?"text":"password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`p-3 outline-none w-full bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        required
                    />
                    {showPassCon?<Eye className='absolute top-3 right-5' onClick={()=>setShowPassCon(!showPassCon)}/>:<EyeClosed className='absolute top-3 right-5' onClick={()=>setShowPassCon(!showPassCon)}/>}
                    </div>
                    {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>}
                    {formData.password !== '' && formData.confirmPassword !== '' && formData.password === formData.confirmPassword && (
                        <span className="text-green-500 text-xs mt-1">Passwords match ✓</span>
                    )}
                </div>

                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Batch *</label>
                    <input
                        type="text"
                        value={formData.batch}
                        onChange={(e) => handleInputChange('batch', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        placeholder="e.g., 2024, 2025"
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700"> Role *</label>
                    <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value as Role)}
                        className={`p-3 outline-none  bg-blue-800/20 border rounded-md transition-colors focus:ring-2 focus:ring-blue-500  ${errors.role ? 'border-red-400' : 'border-gray-300'
                            }`}
                        required
                    >
                        <option value={Role.STUDENT}>Student</option>
                        <option value={Role.ALUMNI}>Alumni</option>
                    </select>
                    {errors.role && <span className="text-red-500 text-xs mt-1">{errors.role}</span>}
                    <span className="text-xs text-gray-500 mt-1">
                        Selected: {formData.role}
                    </span>
                </div>

                {formData.role=="ALUMNI"&&<div  className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">LinkedIn</label>
                    <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        placeholder="LinkedIn profile link"
                    />
                </div>}

                {formData.role=="ALUMNI"&&<div  className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">GitHub</label>
                    <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        placeholder="GitHub profile link"
                    />
                </div>}

                {formData.role=="ALUMNI"&&<div  className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Personal Website</label>
                    <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        placeholder="Portfolio or website"
                    />
                </div>}
                {formData.role=="ALUMNI"&&<div  className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Organisation</label>
                    <input
                        type="text"
                        value={formData.organisation}
                        onChange={(e) => handleInputChange('organisation', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        placeholder="Your company or institute"
                    />
                </div>}
                {formData.role=="ALUMNI"&&<div  className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium text-blue-700">Bio</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className={`p-3 outline-none bg-blue-800/20 rounded-md transition-colors focus:bg-blue-800/30 focus:ring-2 focus:ring-blue-500/50 ${errors.email ? 'border border-red-400' : ''
                            }`}
                        rows={3}
                    />
                </div>}

                {errors.general && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <span className="text-red-600 text-sm">{errors.general}</span>
                    </div>
                )}

                <Button variant='primary' className='mt-4 w-full py-3' type="submit" loading={loading}>
                    Register
                </Button>

                <div className="text-center mt-2">
                    <span className="text-sm text-gray-600">
                        Already have an account?
                        <Link href='/auth/login' className="ml-1 text-blue-600 hover:text-blue-800 underline font-medium">
                            Sign In
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}