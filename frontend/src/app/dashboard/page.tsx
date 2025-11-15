"use client";
import React, { useEffect, useState } from "react";
import {
  Linkedin,
  Github,
  Globe,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

export default function AlumniDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedOrg, setSelectedOrg] = useState("all");
  const [alumniData, setAlumniData] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/alumni`
        );

        setAlumniData(response.data.users);
      } catch (err) {
        console.error("Error fetching alumni data:", err);
        setError("Failed to load alumni data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const batches = ["all", ...new Set(alumniData.map((a) => a.batch))];
  const organisations = [
    "all",
    ...new Set(alumniData.map((a) => a.organisation.name)),
  ];

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.organisation.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch =
      selectedBatch === "all" || alumni.batch === selectedBatch;
    const matchesOrg =
      selectedOrg === "all" || alumni.organisation.name === selectedOrg;
    return matchesSearch && matchesBatch && matchesOrg;
  });
  const router = useRouter();
  function toAlumni(id: string) {
    router.push(`/alumni/${id}`);
  }

  return (
    <>
      <div className=" pt-23 min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="
              flex flex-col sm:flex-row 
              items-center 
              gap-3 
              bg-black 
              border border-gray-800 
              rounded-full
              p-4
            ">
              
              <div className="flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search alumni..."
                  className="
                    w-full px-4 py-2 
                    bg-black
                    text-white 
                    placeholder-white/40 
                    border border-gray-700 
                    rounded-full
                    focus:outline-none 
                    focus:ring-1 
                    focus:ring-blue-500 
                    focus:border-blue-500 
                    transition-all
                  "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="
                  w-full sm:w-auto 
                  px-4 py-2 
                  bg-black
                  text-white 
                  border border-gray-700 
                  rounded-full 
                  focus:outline-none 
                  focus:ring-1 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  transition-all
                "
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch} className="bg-[#111] text-white">
                    {batch === "all" ? "All Batches" : batch}
                  </option>
                ))}
              </select>

              <select
                className="
                  w-full sm:w-auto
                  px-4 py-2 
                  bg-[#111] 
                  text-white 
                  border border-gray-700 
                  rounded-full 
                  focus:outline-none 
                  focus:ring-1 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  transition-all
                "
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                {organisations.map((org) => (
                  <option key={org} value={org} className="bg-[#111] text-white">
                    {org === "all" ? "All Organizations" : org}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="
                    rounded-xl overflow-hidden 
                    bg-[#111] 
                    border border-gray-800 
                    animate-pulse
                  "
                >
                  <div className="h-32 bg-gray-800/50"></div>
                  <div className="p-4 space-y-3">

                    <div className="h-4 bg-gray-800/60 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-800/60 rounded w-1/2"></div>

                    <div className="h-3 bg-gray-800/60 rounded w-full"></div>
                    <div className="h-3 bg-gray-800/60 rounded w-5/6"></div>

                    <div className="flex gap-2 pt-2">
                      <div className="w-8 h-8 bg-gray-800/60 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-800/60 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-800/60 rounded-lg"></div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAlumni.map((alumni, index) => (
                  <div
                    key={alumni.id}
                    className=" group cursor-pointer rounded-xl overflow-hidden bg-[#0a0a0f] border border-white/10 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(132,0,255,0.3)] transition-all duration-300"
                    onClick={() => toAlumni(alumni.id)}
                  >
                    <div className="relative h-32 bg-gradient-to-br from-purple-900/20 to-purple-700/10 flex items-center justify-center">
                      {alumni.picture ? (
                        <img
                          src={alumni.picture}
                          alt={alumni.name}
                          className="w-20 h-20 rounded-full object-cover ring-4  ring-purple-500/40 shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-purple-700/60 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-purple-500/40 shadow-lg">
                          {getInitials(alumni.name)}
                        </div>
                      )}
                      <span className="absolute top-3 right-3 text-xs font-medium text-purple-400 bg-purple-900/40 border border-purple-700/60 px-2 py-1 rounded-full">
                        {alumni.batch}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-white text-base mb-1 truncate">
                        {alumni.name}
                      </h3>
                      <p className="text-sm text-purple-400 font-medium mb-2">
                        {alumni.organisation.name}
                      </p>
                      <p className="text-xs text-white/60 mb-3 line-clamp-2 leading-relaxed">
                        {alumni.bio}
                      </p>

                      <div className="flex gap-2">
                        {alumni.linkedin && (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-white/70 hover:bg-blue-700/20 hover:text-blue-400 transition-all"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {alumni.github && (
                          <a
                            href={alumni.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-white/70   hover:bg-gray-700/30 hover:text-white transition-all"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {alumni.website && (
                          <a
                            href={alumni.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-white/70 hover:bg-green-900/20 hover:text-green-400 transition-all"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredAlumni.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500">No alumni found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
