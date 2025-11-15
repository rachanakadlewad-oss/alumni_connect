"use client";

import React from "react";
import ProfileCard from "../components/ProfileCard";
import { motion } from "framer-motion";
import aditya from "/aditya.jpg";

function Creators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // FINAL FIXED VARIANTS – 100% TYPE-SAFE FOR motion-dom v11
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        opacity: { duration: 0.4 },
        y: { duration: 0.4 },
        rotateX: { duration: 0.4 },
      },
    },
  };

  return (
    <>
      <div className="relative overflow-hidden py-16 bg-black min-h-screen mt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-60 h-60 bg-gray-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight"
            >
              {"Meet Our Highly Talented".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              <br />

              {"Team".split("").map((char, index) => (
                <motion.span
                  key={index + 100}
                  variants={letterVariants}
                  style={{ display: "inline-block" }}
                  className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-10 gap-y-10 justify-center items-center flex-wrap">

            <ProfileCard
              name=""
              title=""
              handle="K L N Sai Aditya"
              status="Frontend & Backend"
              showUserInfo={true}
              enableTilt={true}
              avatarUrl="/assets/aditya.jpg"
              grainUrl="/assets/aditya.jpg"
              linkedinUrl="https://www.linkedin.com/in/sai-aditya-10x/"
              githubUrl="https://github.com/Aditya-0510"
            />

            <ProfileCard
              name=""
              title=""
              handle="Ayushmaan Kumar"
              status="Frontend & Backend"
              showUserInfo={true}
              enableTilt={true}
              avatarUrl="/assets/ayushmaan3.jpg"
              grainUrl="/assets/ayushmaan.jpg"
              linkedinUrl="https://www.linkedin.com/in/ayushmaan-kumar/"
              githubUrl="https://github.com/lightyear256"
            />

            <ProfileCard
              name=""
              title=""
              handle="Hammad Malik"
              status="Frontend & Design"
              showUserInfo={true}
              enableTilt={true}
              avatarUrl="/assets/hammad.jpg"
              grainUrl="/assets/hammad.jpg"
              linkedinUrl="https://www.linkedin.com/in/hammad-malik-/"
              githubUrl="https://github.com/hammadmalik17"
            />

            <ProfileCard
              name=""
              title=""
              handle="Yuvansh Chauhan"
              status="Frontend & Design"
              showUserInfo={true}
              enableTilt={true}
              avatarUrl="/assets/yuvansh.jpg"
              grainUrl="/assets/yuvansh.jpg"
              linkedinUrl="https://www.linkedin.com/in/yuvansh-chauhan/"
              githubUrl="https://github.com/GhostRider9211"
            />

            <ProfileCard
              name=""
              title=""
              handle="Rachana Kadlewad"
              status="Frontend & Design"
              showUserInfo={true}
              enableTilt={true}
              avatarUrl="/assets/rachana2.jpg"
              grainUrl="/assets/rachana2.jpg"
              linkedinUrl="https://www.linkedin.com/in/rachana-kadlewad-655a8630b/"
              githubUrl="https://github.com/rachanakadlewad-oss"
            />

          </div>
        </div>
      </div>
    </>
  );
}

export default Creators;
