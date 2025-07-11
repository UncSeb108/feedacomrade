"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone, // Added FaPhone
  FaMapMarkerAlt, // Added FaMapMarkerAlt
  FaClock, // Added FaClock
} from "react-icons/fa";

const ContactUs = () => {
  // Framer Motion variants for section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Framer Motion variants for text blocks/cards
  const itemVariants = {
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

  // Framer Motion variants for button hover
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
      id="contact-us"
      className="bg-emerald-700 py-16 px-4 md:py-24 font-serif text-white" // Background and font
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when the section comes into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-8"
          variants={itemVariants}
        >
          Let's Talk!
        </motion.h2>

        {/* Introductory Paragraph */}
        <motion.p
          className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Reach out today and be part of the change. We'd love to hear from you!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* Call Us Card */}
          <motion.div
            variants={itemVariants}
            className="bg-emerald-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center h-full"
          >
            <FaPhone className="text-5xl text-amber-500 mb-4" />
            <h3 className="text-3xl font-bold mb-4">Call Us</h3>
            <p className="text-xl mb-6">+254 7XX XXX XXX</p>{" "}
            {/* Placeholder phone number */}
            <motion.a
              href="tel:+2547XXXXXXXX" // Replace with actual phone number
              className="inline-flex items-center justify-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-md shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>Call Now</span>
            </motion.a>
          </motion.div>

          {/* Email Us Card */}
          <motion.div
            variants={itemVariants}
            className="bg-emerald-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center h-full"
          >
            <FaEnvelope className="text-5xl text-amber-500 mb-4" />
            <h3 className="text-3xl font-bold mb-4">Email Us</h3>
            <p className="text-xl mb-6">info@feedacomrade.org</p>
            <motion.a
              href="mailto:info@feedacomrade.org"
              className="inline-flex items-center justify-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-md shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>Send Email</span>
            </motion.a>
          </motion.div>

          {/* Office Location & Working Hours Card */}
          <motion.div
            variants={itemVariants}
            className="bg-emerald-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center h-full"
          >
            <FaMapMarkerAlt className="text-5xl text-amber-500 mb-4" />
            <h3 className="text-3xl font-bold mb-4">Visit Our Office</h3>
            <p className="text-xl mb-2 flex items-center space-x-2">
              <FaMapMarkerAlt className="text-2xl text-white" />
              <span>Chandaria Building, Kenyatta University, Kenya</span>{" "}
              {/* Placeholder Address */}
            </p>
            <p className="text-xl mb-6 flex items-center space-x-2">
              <FaClock className="text-2xl text-white" />
              <span>Mon - Fri: 9:00 AM - 5:00 PM</span>{" "}
              {/* Placeholder Hours */}
            </p>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div className="mt-12" variants={itemVariants}>
          <p className="text-xl font-semibold mb-4">Connect With Us:</p>
          <div className="flex justify-center space-x-6 text-4xl">
            <a
              href="#"
              className="text-white hover:text-amber-500 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-500 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-500 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactUs;
