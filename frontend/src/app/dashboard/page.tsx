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
      <div className=" pt-23 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search alumni..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch === "all" ? "All Batches" : batch}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                {organisations.map((org) => (
                  <option key={org} value={org}>
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
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white animate-pulse"
                >
                  <div className="h-32 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6 mb-3"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
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
                    className="group border cursor-pointer border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all duration-300 bg-white"
                    onClick={() => toAlumni(alumni.id)}
                  >
                    <div className="relative h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      {alumni.picture ? (
                        <img
                          src={alumni.picture}
                          alt={alumni.name}
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl ring-4 ring-white shadow-lg">
                          {getInitials(alumni.name)}
                        </div>
                      )}
                      <span className="absolute top-3 right-3 text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded-full">
                        {alumni.batch}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">
                        {alumni.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        {alumni.organisation.name}
                      </p>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {alumni.bio}
                      </p>

                      <div className="flex gap-2">
                        {alumni.linkedin && (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
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
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
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
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-green-600 transition-all"
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
