"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaGraduationCap,
  FaLightbulb,
  FaExclamationTriangle,
  FaBullseye,
  FaUsers,
} from "react-icons/fa";

const AboutUs = () => {
  // Framer Motion variants for section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2, // Stagger animations for child elements
      },
    },
  };

  // Framer Motion variants for text blocks/sub-sections
  const textBlockVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      id="about-us"
      className="bg-white py-16 px-4 md:py-24 font-serif" // Background and font
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when the section comes into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-12 text-center"
          variants={textBlockVariants}
        >
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Who We Are Section */}
          <motion.div
            variants={textBlockVariants}
            className="bg-stone-50 p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-3xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
              <FaHandshake className="text-amber-500" /> Who We Are
            </h3>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              At Feed a Comrade, we stand for solidarity, dignity, and
              opportunity. We believe that no student should have to choose
              between education and a meal.
            </p>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              <strong className="text-emerald-700">Our Philosophy:</strong>{" "}
              Universities, colleges, and TVET institutions should be spaces for
              growth and success—not struggle and hunger.
            </p>
            <p className="text-stone-700 text-lg leading-relaxed">
              <strong className="text-emerald-700">Our Evolution:</strong> We
              are a student-driven movement looking forward to evolve into a
              structured, technology-powered program ensuring no comrade is left
              behind.
            </p>
          </motion.div>

          {/* The Problem We Solve Section */}
          <motion.div
            variants={textBlockVariants}
            className="bg-stone-50 p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-3xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
              <FaExclamationTriangle className="text-amber-500" /> The Problem
              We Solve
            </h3>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              Food insecurity is a silent crisis among higher education students
              in Kenya, often leading to devastating consequences:
            </p>
            <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
              <li>
                <strong>Academic Performance:</strong> Hunger severely impacts
                concentration, energy levels, and overall academic achievement.
              </li>
              <li>
                <strong>Mental Health:</strong> The constant worry about food
                contributes to stress, anxiety, and depression among students.
              </li>
              <li>
                <strong>Retention Rates:</strong> Financial strain, primarily
                driven by food costs, is a major factor in student dropouts.
              </li>
              <li>
                <strong>Lack of Scalable Support:</strong> Existing support
                models are often insufficient or unsustainable, failing to
                address the widespread need effectively.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Our Objectives Section */}
        <motion.div
          variants={textBlockVariants}
          className="mt-16 bg-stone-50 p-8 rounded-lg shadow-sm"
        >
          <h3 className="text-3xl font-bold text-emerald-700 mb-6 text-center flex items-center justify-center gap-3">
            <FaBullseye className="text-amber-500" /> Our Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                <FaGraduationCap className="text-emerald-700" /> Primary
                Objective:
              </h4>
              <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
                <li>
                  To eliminate hunger among low-income students in higher
                  education through a sustainable, dignified, tech-enabled
                  feeding model.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                <FaLightbulb className="text-emerald-700" /> Secondary
                Objectives:
              </h4>
              <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
                <li>Improve student academic performance and retention.</li>
                <li>Reduce exploitation and risky survival behaviors.</li>
                <li>
                  Support local economies by working with vendors and farmers.
                </li>
                <li>
                  Promote climate-smart agriculture through stable demand.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Target Beneficiaries Section */}
        <motion.div
          variants={textBlockVariants}
          className="mt-16 bg-stone-50 p-8 rounded-lg shadow-sm"
        >
          <h3 className="text-3xl font-bold text-emerald-700 mb-6 text-center flex items-center justify-center gap-3">
            <FaUsers className="text-amber-500" /> Target Beneficiaries
          </h3>
          <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2 max-w-2xl mx-auto">
            <li>
              Low-income students in Kenya's public universities and technical
              training colleges.
            </li>
            <li>Local food vendors and smallholder farmers.</li>
            <li>
              University welfare departments seeking sustainable support
              mechanisms.
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
