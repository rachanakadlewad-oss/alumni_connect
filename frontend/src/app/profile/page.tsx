'use client';

import React, { useState, useEffect } from 'react';
import { Mail, User, Lock, BookOpen, Briefcase, Linkedin, Github, Globe, Building2, FileText, Save, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function ProfilePage() {
  const [userType, setUserType] = useState<'student' | 'alumni'>('alumni');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    batch: '',
    role: '',
    linkedIn: '',
    gitHub: '',
    personalWebsite: '',
    organisation: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        const profileData = response.data;
        
        if (profileData.userType) {
          setUserType(profileData.userType);
        }
        
        setFormData(prev => ({
          ...prev,
          ...profileData,
        }));
      } catch (err: any) {
        console.error('Fetch profile error:', err.message);
        setError('Failed to load profile. Using demo data.');
        setFormData({
          email: 'alex.johnson@alumni.edu',
          fullName: 'Alex Johnson',
          password: '••••••••',
          confirmPassword: '••••••••',
          batch: '2020',
          role: 'Alumni',
          linkedIn: 'linkedin.com/in/alexjohnson',
          gitHub: 'github.com/alexjohnson',
          personalWebsite: 'alexjohnson.dev',
          organisation: 'Tech Innovations Inc.',
          bio: 'Passionate software engineer dedicated to building innovative solutions.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/edit`,
        {
          ...formData,
          userType,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Profile updated:', response.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Save profile error:', err.message);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const basicFields = [
    { label: 'Email Address', name: 'email', icon: Mail, type: 'email' },
    { label: 'Full Name', name: 'fullName', icon: User, type: 'text' },
    { label: 'Password', name: 'password', icon: Lock, type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', icon: Lock, type: 'password' },
    { label: 'Batch', name: 'batch', icon: BookOpen, type: 'text' },
    { label: 'Role', name: 'role', icon: Briefcase, type: 'text' },
  ];

  const socialFields = [
    { label: 'LinkedIn', name: 'linkedIn', icon: Linkedin, type: 'text' },
    { label: 'GitHub', name: 'gitHub', icon: Github, type: 'text' },
    { label: 'Personal Website', name: 'personalWebsite', icon: Globe, type: 'text' },
    { label: 'Organisation', name: 'organisation', icon: Building2, type: 'text' },
  ];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyan-300">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        
        <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-red-900/30 border border-red-700/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 px-4 py-3 bg-green-900/30 border border-green-700/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-200">{success}</p>
            </div>
          )}

          {/* Basic Information Section */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-black border border-cyan-800/40 rounded-2xl p-8 shadow-xl shadow-cyan-900/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Account Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                disabled={isSaving}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 disabled:opacity-50 ${
                  isEditing
                    ? 'bg-green-600/80 hover:bg-green-600 text-white'
                    : 'bg-cyan-600/80 hover:bg-cyan-600 text-white'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                ) : (
                  'Edit'
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {basicFields.map((field) => {
                const IconComponent = field.icon;
                return (
                  <div key={field.name} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                      <IconComponent className="w-4 h-4" />
                      {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/40 border border-cyan-700/50 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-black/40 border border-cyan-700/30 rounded-lg text-white/80">
                        {formData[field.name as keyof typeof formData]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {userType === 'alumni' && (
            <div className="bg-gradient-to-br from-cyan-900/30 to-black border border-cyan-800/40 rounded-2xl p-8 shadow-xl shadow-cyan-900/10">
              <h3 className="text-2xl font-bold text-white mb-8">Professional Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {socialFields.map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.name} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                        <IconComponent className="w-4 h-4" />
                        {field.label}
                      </label>
                      {isEditing ? (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/40 border border-cyan-700/50 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-black/40 border border-cyan-700/30 rounded-lg text-white/80">
                          {formData[field.name as keyof typeof formData]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/40 border border-cyan-700/50 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
                  />
                ) : (
                  <div className="px-4 py-3 bg-black/40 border border-cyan-700/30 rounded-lg text-white/80">
                    {formData.bio}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 rounded-lg font-semibold text-white transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="flex-1 px-6 py-3 bg-cyan-900/40 hover:bg-cyan-900/60 border border-cyan-700/50 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}