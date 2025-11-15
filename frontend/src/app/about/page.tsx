"use client";

import React from "react";
import {
  Users,
  GraduationCap,
  Code,
  Search,
  BookmarkCheck,
  Globe,
} from "lucide-react";
import SpotlightCard from "../components/SpotlightCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 mt-10">

      <section className="max-w-5xl mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About the <span className="text-blue-400">Alumni Network</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          A modern, unified platform built to connect students, graduates, and
          professionals of IIIT Dharwad. Our goal is simple: make alumni
          discovery effortless, meaningful, and beautifully organized.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            To build a powerful ecosystem where alumni stay connected, students
            find mentorship, and the institution celebrates its growing
            community — all through a seamless and elegant digital experience.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-semibold text-center mb-12">
          What This App Helps You Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card */}
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
            <Users className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover Alumni</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Browse through graduates from all batches and departments using
              powerful filters.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
            <Search className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quickly find people by name, batch, organization, skills, or
              keywords in their bio.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
            <GraduationCap className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">See Career Journeys</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore each alumnus's background, role, organization, and
              personal links.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
            <Globe className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Contact</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect instantly via LinkedIn, GitHub, or personal websites.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
            <Code className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Modern UI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A fast, responsive design — optimized for all screen sizes using
              Bento-style layouts.
            </p>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.25)">
            <BookmarkCheck className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every alum's data is validated for trust and authenticity.
            </p>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
}
