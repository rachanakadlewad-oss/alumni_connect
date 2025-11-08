"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Linkedin, Github, Globe, Mail, Briefcase, Calendar, ArrowLeft, User } from 'lucide-react';
import axios from 'axios';

interface Alumni {
  id:string;
  batch: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  name: string;
  organisation: {name:string};
  website: string;
  picture?: string | null; 
  role?: string; 
}

export default function AlumniDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumni|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchAlumniDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`);
        setAlumni(response.data);
      } catch (err) {
        console.error('Error fetching alumni details:', err);
        setError('Failed to load alumni details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlumniDetails();
    }
  }, [id]);

  const getInitials = (name:string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-25 min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!alumni) {
    return (
      <div className=" pt-25 min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500">Alumni not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-25 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Alumni</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {alumni.picture ? (
                <img
                  src={alumni.picture}
                  alt={alumni.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-4xl ring-4 ring-white shadow-xl">
                  {getInitials(alumni.name)}
                </div>
              )}

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{alumni.name}</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-blue-50 justify-center md:justify-start">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-lg font-medium">{alumni.organisation.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-50 justify-center md:justify-start">
                    <Calendar className="w-5 h-5" />
                    <span>Batch of {alumni.batch}</span>
                  </div>
                  {alumni.role && (
                    <div className="flex items-center gap-2 text-blue-50 justify-center md:justify-start">
                      <User className="w-5 h-5" />
                      <span className="capitalize">{alumni.role.toLowerCase()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{alumni.bio}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <a
                  href={`mailto:${alumni.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{alumni.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {alumni.linkedin && (
                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                      <p className="text-xs text-gray-500">View profile</p>
                    </div>
                  </a>
                )}

                {alumni.github && (
                  <a
                    href={alumni.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <Github className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">GitHub</p>
                      <p className="text-xs text-gray-500">View repos</p>
                    </div>
                  </a>
                )}

                {alumni.website && (
                  <a
                    href={alumni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-green-400 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Globe className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Website</p>
                      <p className="text-xs text-gray-500">Visit site</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}