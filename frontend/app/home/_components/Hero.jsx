"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHandHoldingHeart } from "react-icons/fa";
import Image from "next/image"; // Import the Image component

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.section
      className="relative flex items-center justify-center min-h-screen px-4 py-16 text-center md:px-8 lg:px-16 overflow-hidden font-serif" // Added font-serif back
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      <Image
        src="/images/bg10.jpg" // Replace with your actual image path
        alt="Students studying"
        layout="fill" // Makes the image fill the parent
        objectFit="cover" // Covers the area without distortion
        quality={90}
        className="absolute object-top inset-0 z-0 opacity-100" // Image at full opacity behind overlay
      />

      {/* Green Overlay */}
      {/* This div is positioned above the image but below the text content */}
      <div className="absolute inset-0 z-[1] bg-black opacity-37"></div>
      {/* You can adjust bg-emerald-800 to any green shade and opacity-60 for desired transparency */}

      <div className="max-w-5xl mx-auto z-10 relative">
        <motion.h1
          className="mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-7xl flex items-center justify-center gap-3"
          variants={itemVariants}
        >
          Stopping Campus Hunger Before it Kills Futures
        </motion.h1>
        <motion.p
          className="mb-6 text-xl text-gray-300 md:text-2xl font-sans"
          variants={itemVariants}
        >
          Empowering futures through sustainable <br /> meal access for students
          in higher learning institutions.
        </motion.p>

        {/* The button now wraps an <a> tag to link to the donate page */}
        <a href="/donate">
          <motion.button
            className="flex items-center justify-center space-x-2 px-16 py-3 text-lg font-bold text-white bg-green-800 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out mx-auto block" // Added mx-auto and block
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaHandHoldingHeart className="text-xl" />
            <span>Donate Now</span>
          </motion.button>
        </a>
      </div>
    </motion.section>
  );
};

export default Hero;
