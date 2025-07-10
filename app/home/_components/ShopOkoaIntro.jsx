"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaDollarSign, FaBook, FaUtensils } from "react-icons/fa";

const ShopOkoaIntro = () => {
  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants for individual text elements (fade-in, slide-up)
  const textVariants = {
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

  // Variants for benefit cards (fade-in, scale-on-hover)
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
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const benefits = [
    {
      icon: <FaDollarSign className="text-5xl mb-4 text-amber-500" />,
      title: "Affordable Meals",
      description:
        "Through Feed a Comrade, students can get meals at subsidized prices—ensuring they have enough food for the entire month.",
    },
    {
      icon: <FaUtensils className="text-5xl mb-4 text-amber-500" />,
      title: "Flexible Payment",
      description:
        "We enable students to pay at a manageable pace—eliminating financial strain while keeping them nourished.",
    },
    {
      icon: <FaBook className="text-5xl mb-4 text-amber-500" />,
      title: "Focus on Learning",
      description:
        "Our program helps students focus on learning, not survival—because no student should have to worry about their next meal.",
    },
  ];

  return (
    <motion.section
      className="bg-stone-100 py-16 px-4 md:py-24 font-serif text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animate when component comes into view
      viewport={{ once: true, amount: 0.3 }} // Only animate once
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-8"
          variants={textVariants}
        >
          What We Do
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-stone-700 leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={textVariants}
        >
          Hunger is an invisible barrier to education, limiting potential and
          robbing students of the energy they need to succeed. At Feed a
          Comrade, we remove that barrier through **Shop Okoa**, a
          technology-driven meal access system designed for students who
          struggle with food insecurity.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center h-full transform transition-transform duration-200 ease-in-out"
              variants={cardVariants}
              whileHover="hover"
            >
              {benefit.icon}
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">
                {benefit.title}
              </h3>
              <p className="text-stone-700 text-base leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-xl md:text-2xl font-semibold text-emerald-700 mt-12"
          variants={textVariants}
        >
          This is more than a meal—it's dignity, hope, and a path to success.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default ShopOkoaIntro;
