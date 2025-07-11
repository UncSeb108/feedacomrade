"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonialsData = [
    {
      quote:
        "Before Feed a Comrade, I often skipped meals to save money for books. Now, with Shop Okoa, I can focus on my studies without the constant worry of hunger. It's truly life-changing!",
      name: "Sarah M.",
      affiliation: "Kenyatta University",
    },
    {
      quote:
        "This program has brought dignity back into my life. The subsidized meals mean I'm nourished and can concentrate in class. It's more than just food; it's hope.",
      name: "David K.",
      affiliation: "Technical University of Kenya",
    },
    {
      quote:
        "As a shop owner, partnering with Feed a Comrade has not only increased my business but also allowed me to contribute to a vital cause. It's a win-win for the community.",
      name: "Mercy A.",
      affiliation: "Campus Vendor",
    },
  ];

  // Framer Motion variants for section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2, // Stagger animations for testimonial cards
      },
    },
  };

  // Framer Motion variants for individual testimonial cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
    hover: {
      scale: 1.02, // Slight scale up on hover
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      id="testimonials"
      className="bg-stone-100 py-16 px-4 md:py-24 font-serif" // Background and font
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when the section comes into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-12"
          variants={cardVariants} // Using cardVariants for heading entrance too
        >
          What Our Comrades Say
        </motion.h2>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-between h-full text-center relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <FaQuoteLeft className="absolute top-4 left-4 text-amber-500 text-3xl opacity-70" />
              <p className="text-stone-700 text-lg leading-relaxed mb-6 italic z-10 px-4">
                {testimonial.quote}
              </p>
              <FaQuoteRight className="absolute bottom-4 right-4 text-amber-500 text-3xl opacity-70" />

              <div className="mt-auto pt-4">
                {" "}
                {/* Use mt-auto to push attribution to bottom */}
                <p className="text-emerald-600 font-semibold text-xl mb-1">
                  - {testimonial.name}
                </p>
                <p className="text-stone-600 text-base">
                  {testimonial.affiliation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
