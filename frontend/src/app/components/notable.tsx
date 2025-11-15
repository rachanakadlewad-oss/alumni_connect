'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AlumniCard } from './notable-card';
import { motion, AnimatePresence } from "framer-motion";

const alumni = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    year: '2008',
    title: 'Founder & CEO',
    company: 'NeuroTech Solutions',
    bio: 'AI and neural interface innovations',
    image: '/professional-woman-scientist.png',
    achievement: 'Forbes 30 Under 40',
  },
  {
    id: 2,
    name: 'Marcus Williams',
    year: '2010',
    title: 'Chief Architect',
    company: 'CloudScale Systems',
    bio: 'Cloud infrastructure leader',
    image: '/professional-engineer.png',
    achievement: 'Tech Innovator Award',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    year: '2012',
    title: 'VP of Product',
    company: 'DataFlow Inc.',
    bio: 'Data analytics pioneer',
    image: '/professional-woman-product-manager.png',
    achievement: 'Stanford Distinguished Alum',
  },
  {
    id: 4,
    name: 'James Park',
    year: '2014',
    title: 'Head of Research',
    company: 'Quantum Computing Labs',
    bio: 'Quantum computing researcher',
    image: '/professional-man-researcher.png',
    achievement: 'MIT Technology Review 35',
  },
  {
    id: 5,
    name: 'Amira Okafor',
    year: '2016',
    title: 'Social Impact Director',
    company: 'TechForGood Foundation',
    bio: 'Tech for social good advocate',
    image: '/professional-woman-social-impact.jpg',
    achievement: 'UN SDG Champion',
  },
];

export function AlumniCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || isTransitioning) return;

    const timer = setInterval(() => {
      next();
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isTransitioning, current]);

  const next = () => {
    if (isTransitioning) return;

    setDirection(1);
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % alumni.length);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const prev = () => {
    if (isTransitioning) return;

    setDirection(-1);
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + alumni.length) % alumni.length);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);

    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;

    setDirection(index > current ? 1 : -1);
    setIsTransitioning(true);
    setCurrent(index);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);

    setIsAutoPlay(false);
  };

  const getVisibleCards = () => {
    if (cardsToShow === 1) return [current];

    const prevIndex = (current - 1 + alumni.length) % alumni.length;
    const nextIndex = (current + 1) % alumni.length;

    return [prevIndex, current, nextIndex];
  };

  const visibleCards = getVisibleCards();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="relative py-6">

        <div
          className="flex justify-center items-center gap-6 min-h-[480px] overflow-hidden"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleCards.map((index, position) => {
              const isCenter = position === 1 && cardsToShow === 3;

              return (
                <motion.div
                  key={`${alumni[index].id}-${position}`}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    x: direction * 300,
                    filter: "blur(3px)"
                  }}
                  animate={{
                    opacity: isCenter ? 1 : 0.35,
                    scale: isCenter ? 1 : 0.85,
                    x: 0,
                    filter: isCenter ? "blur(0)" : "blur(2px)"
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    x: direction * -300,
                    filter: "blur(4px)"
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className={`w-full ${isCenter ? "max-w-md z-10" : "max-w-sm"}`}
                >
                  <AlumniCard alumnus={alumni[index]} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          disabled={isTransitioning}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full bg-blue-700 text-white shadow-xl transition-all duration-300 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
          }`}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={next}
          disabled={isTransitioning}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full bg-blue-700 text-white shadow-xl transition-all duration-300 ${
            isTransitioning ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
          }`}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {alumni.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "bg-blue-500 w-8 h-2.5"
                : "bg-blue-900/50 hover:bg-blue-700 w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-4 text-sm text-blue-300/70">
        <span className="font-semibold text-blue-400">{current + 1}</span>
        {' of '}
        <span className="font-semibold text-blue-400">{alumni.length}</span>
      </div>
    </div>
  );
}