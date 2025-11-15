'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface Alumnus {
  id: number;
  name: string;
  year: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  achievement: string;
}

export function AlumniCard({ alumnus }: { alumnus: Alumnus }) {
  return (
    <div className="group h-full max-w-sm mx-auto bg-slate-900 rounded-2xl overflow-hidden border-2 border-blue-500/30 hover:border-blue-400 transition-all duration-300">
      <div className="relative w-full h-48 md:h-56 bg-slate-800">
        <Image
          src={alumnus.image || "/placeholder.svg"}
          alt={alumnus.name}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-blue-500 border-2 border-blue-400">
          <span className="text-sm font-bold text-white">{alumnus.year}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 bg-slate-900">
        <h2 className="text-lg md:text-xl font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {alumnus.name}
        </h2>

        <div className="space-y-0.5">
          <p className="text-xs md:text-sm text-blue-400 font-semibold">{alumnus.title}</p>
          <p className="text-xs text-slate-400">{alumnus.company}</p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
          {alumnus.bio}
        </p>

        <div className="flex items-start gap-2 w-fit px-3 py-2 rounded-lg bg-blue-500/10 border-2 border-blue-500/40">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs font-medium text-blue-300">{alumnus.achievement}</span>
        </div>
      </div>
    </div>
  );
}