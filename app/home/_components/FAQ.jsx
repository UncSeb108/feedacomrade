"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // State to manage which FAQ item is open

  const faqItems = [
    {
      question: "What is Feed a Comrade?",
      answer:
        "Feed a Comrade is a socially-driven initiative designed to eradicate chronic hunger among low-income students in Kenya's higher learning institutions by providing subsidized, nutritious meals through our technology-enabled system, Shop Okoa.",
    },
    {
      question: "How does Shop Okoa work?",
      answer:
        "Shop Okoa is a mobile-based system where students contribute half the meal cost through a structured savings plan, and donor subsidies cover the remaining portion. It connects students with campus kitchens and vetted local vendors.",
    },
    {
      question: "How can I contribute to Feed a Comrade?",
      answer:
        "You can contribute by funding the future (direct donations for subsidized meals), becoming a partner (corporations, foundations, individuals), providing in-kind support (food donations, logistics), or by advocating and amplifying our mission.",
    },
    {
      question: "Who are the beneficiaries of this program?",
      answer:
        "Our primary beneficiaries are low-income students in Kenya's public universities and technical training colleges. We also indirectly support local food vendors and smallholder farmers.",
    },
    {
      question: "Is my donation tax-deductible?",
      answer:
        "Please consult with your tax advisor regarding the deductibility of your contributions, as regulations may vary.",
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
        staggerChildren: 0.1, // Stagger animations for FAQ items
      },
    },
  };

  // Framer Motion variants for individual FAQ item (question bar)
  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Framer Motion variants for answer content (expand/collapse)
  const answerVariants = {
    collapsed: { height: 0, opacity: 0, overflow: "hidden" },
    expanded: {
      height: "auto", // Keep height auto for initial content measurement
      opacity: 1,
      transition: {
        height: {
          duration: 0.4, // Shorter duration for height transition
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.2, // Faster opacity transition
          ease: "easeOut",
        },
      },
    },
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="bg-white py-16 px-4 md:py-24 font-serif" // Background and font
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when the section comes into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-12 text-center"
          variants={faqItemVariants}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border border-stone-200 rounded-md shadow-sm overflow-hidden"
              variants={faqItemVariants}
            >
              {/* Question Bar */}
              <button
                className="w-full flex justify-between items-center p-5 bg-stone-100 hover:bg-stone-200 transition-colors duration-200 cursor-pointer rounded-t-md"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg md:text-xl font-bold text-emerald-700 text-left pr-4">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <FaChevronUp className="text-amber-500 text-xl" />
                ) : (
                  <FaChevronDown className="text-amber-500 text-xl" />
                )}
              </button>

              {/* Answer Content (Animated) */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    variants={answerVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    // Use a div to measure content height for smooth animation
                    // This inner div is crucial for Framer Motion to animate height correctly
                    className="p-5 bg-white text-stone-700 text-base md:text-lg text-left"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
