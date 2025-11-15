"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Linkedin,
  Github,
  Globe,
  Mail,
  ArrowLeft,
  User,
  Award,
  GraduationCap,
  Building2,
} from "lucide-react";
import axios from "axios";
import MagicBento, { BentoCardProps } from "@/app/components/MagicBento";
import ShinyText from "@/app/components/ShinyText";

interface Alumni {
  id: string;
  batch: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  name: string;
  organisation: { name: string };
  website: string;
  picture?: string | null;
  role?: string;
}

export default function AlumniDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumniDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`
        );
        setAlumni(response.data);
      } catch (err) {
        console.error("Error fetching alumni details:", err);
        setError("Failed to load alumni details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlumniDetails();
    }
  }, [id]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="pt-25 min-h-screen bg-gradient-to-t from-black via-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-800 rounded w-32 mb-8"></div>

            <div className="bg-[#0f0f0f] rounded-2xl border border-gray-800 p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 bg-gray-800 rounded-full"></div>

                <div className="flex-1 space-y-3">
                  <div className="h-8 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-800 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-800 rounded w-1/3"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-25 min-h-screen bg-gradient-to-t from-black via-gray-950 to-black">
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
      <div className="pt-25 min-h-screen bg-gradient-to-t from-black via-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500">Alumni not found</p>
          </div>
        </div>
      </div>
    );
  }
  const alumniCards: BentoCardProps[] = [
    {
      color: "#060010",
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      content: (
        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-lg font-semibold">Profile</span>
            <User className="w-5 h-5 text-white/80" />
          </div>

          <div className="w-full h-40 rounded-lg overflow-hidden mb-4 border border-white/10 bg-gradient-to-br from-purple-900/50 to-purple-700/30">
            {alumni.picture ? (
              <img
                src={alumni.picture}
                alt={alumni.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/90 text-4xl font-semibold">
                  {getInitials(alumni.name)}
                </span>
              </div>
            )}
          </div>

          <h3 className="text-white text-xl font-semibold leading-tight mb-1">
            {alumni.name}
          </h3>
          <p className="text-white/80 text-sm uppercase tracking-wide">
            {alumni.role || "Alumni"}
          </p>
        </div>
      ),
    },

    {
      color: "#060010",
      label: "Contact",
      icon: <Mail className="w-6 h-6" />,
      content: (
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-lg text-white font-semibold">Contact</span>
            <Mail className="w-6 h-6 text-white opacity-80" />
          </div>

          <a
            href={`mailto:${alumni.email}`}
            className="flex items-center gap-4 p-4 rounded-xl mt-4 bg-[#0c0c19] hover:bg-[#141428] border border-[#1f1f2f] hover:border-[#2a2a44] transition-all group"
          >
            <Mail className="w-6 h-6 text-purple-300" />
            <div>
              <p className="text-base font-semibold text-white">Email</p>
              <p className="text-sm text-white/60 break-all">{alumni.email}</p>
            </div>
          </a>
        </div>
      ),
    },

    {
      color: "#060010",
      label: "Connect",
      size: "lg",
      content: (
        <div className="flex flex-col h-full justify-between relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">Connect</span>
            <Globe className="w-5 h-5 text-white opacity-80" />
          </div>
          <div className="space-y-6 mt-4">
            {alumni.linkedin && (
              <a
                href={alumni.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 rounded-xl bg-[#0c0c19] hover:bg-[#141428] border border-[#1f1f2f] hover:border-[#2a2a44] transition-all group"
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-xl font-semibold text-white">LinkedIn</p>
                  <p className="text-sm text-white/60">View profile</p>
                </div>
              </a>
            )}

            {alumni.github && (
              <a
                href={alumni.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 rounded-xl bg-[#0a0a15] hover:bg-[#111122] border border-[#1a1a2a] transition-all group"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-6 h-6 text-gray-300" />
                <div>
                  <p className="text-xl font-semibold text-white">GitHub</p>
                  <p className="text-sm text-white/60">View repos</p>
                </div>
              </a>
            )}

            {alumni.website && (
              <a
                href={alumni.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 rounded-xl bg-[#0a0a15] hover:bg-[#111122] border border-[#1a1a2a] transition-all group"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-xl font-semibold text-white">Website</p>
                  <p className="text-sm text-white/60">Visit site</p>
                </div>
              </a>
            )}
          </div>
        </div>
      ),
    },

    {
      color: "#060010",
      label: "About",
      icon: <Award className="w-5 h-5" />,
      content: (
        <div className="flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center  mb-4">
            <span className="text-xl font-semibold text-white">About</span>
            <Award className="w-6 h-6 text-white opacity-80" />
          </div>
          <div className="mt-2">
            <p className="text-lg leading-8 opacity-90 text-white">
              <ShinyText
                text={alumni.bio}
                disabled={false}
                speed={3}
                className="text-2xl"
              />
            </p>
          </div>
        </div>
      ),
    },

    {
      color: "#060010",
      label: "Education",
      icon: <GraduationCap className="w-5 h-5" />,
      content: (
        <div className="flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xl font-semibold">Education</span>
            <GraduationCap className="w-6 h-6 text-white opacity-80" />
          </div>

          <div className="flex flex-col justify-end flex-grow p-1">
            <div className="border-t border-white/10 my-2"></div>

            <h3 className="text-white text-2xl font-medium mb-1">
              Batch of {alumni.batch}
            </h3>
            <p className="text-white/60 text-sm">Graduation year</p>
          </div>
        </div>
      ),
    },

    {
      color: "#060010",
      label: "Career",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="flex flex-col h-full relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xl font-semibold">Career</span>
            <Building2 className="w-6 h-6 text-white opacity-80" />
          </div>

          <div className="flex flex-col justify-end flex-grow p-1">
            <div className="border-t border-white/10 my-2"></div>

            <h3 className="text-white text-2xl font-medium mb-1">
              {alumni.organisation.name}
            </h3>
            <p className="text-white/60 text-sm">Current organization</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-25 min-h-screen bg-gradient-to-t from-black via-gray-950 to-black">
      <div className="w-full  p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Alumni</span>
        </button>
        <div className="mb-6">
          <MagicBento
            cardData={alumniCards}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            disableAnimations={false}
            spotlightRadius={300}
            particleCount={12}
            enableTilt={true}
            glowColor="132, 0, 255"
            clickEffect={true}
            enableMagnetism={true}
          />
        </div>

        {/* <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {alumni.picture ? (
                <img
                  src={alumni.picture}
                  alt={alumni.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-400 shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center text-blue-600 font-bold text-4xl ring-4 ring-blue-400 shadow-xl">
                  {getInitials(alumni.name)}
                </div>
              )}

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{alumni.name}</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-blue-100 justify-center md:justify-start">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-lg font-medium">{alumni.organisation.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100 justify-center md:justify-start">
                    <Calendar className="w-5 h-5" />
                    <span>Batch of {alumni.batch}</span>
                  </div>
                  {alumni.role && (
                    <div className="flex items-center gap-2 text-blue-100 justify-center md:justify-start">
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
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-gray-300 leading-relaxed">{alumni.bio}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-3">
                <a
                  href={`mailto:${alumni.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600  transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center group-hover:bg-blue-900 transition-colors">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-gray-100 font-medium">{alumni.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Connect</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {alumni.linkedin && (
                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4  bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-750 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-950 flex items-center justify-center group-hover:bg-blue-900 transition-colors">
                      <Linkedin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100">LinkedIn</p>
                      <p className="text-xs text-gray-400">View profile</p>
                    </div>
                  </a>
                )}

                {alumni.github && (
                  <a
                    href={alumni.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-500 hover:shadow-md hover:bg-gray-750 transition-all group"  
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <Github className="w-5 h-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100">GitHub</p>
                      <p className="text-xs text-gray-400">View repos</p>
                    </div>
                  </a>
                )}

                {alumni.website && (
                  <a
                    href={alumni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 hover:bg-gray-750 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-950 flex items-center justify-center group-hover:bg-green-900 transition-colors">
                      <Globe className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100">Website</p>
                      <p className="text-xs text-gray-400">Visit site</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
