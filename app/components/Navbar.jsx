"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHandHoldingHeart } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy", href: "/privacy" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    initial: { backgroundColor: "transparent" },
    scrolled: { backgroundColor: "rgba(4, 91, 57, 1)" }, // Corresponds to bg-emerald-700
  };

  const mobileMenuVariants = {
    hidden: { x: "100vw" },
    visible: {
      x: "0",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
    exit: {
      x: "100vw",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out`} // Removed font-serif
      variants={navbarVariants}
      animate={scrolled ? "scrolled" : "initial"}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Name/Logo */}
        <div className="text-white text-2xl font-bold">FeedAComrade</div>

        {/* Desktop Navigation Links and Donate Button */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <button className="flex items-center space-x-2 px-6 py-2 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-200">
            <FaHandHoldingHeart />
            <span>Donate</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-emerald-800 z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              <FaTimes />
            </button>
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-white text-3xl font-bold hover:text-gray-300 transition-colors duration-200"
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => setMobileMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              className="flex items-center space-x-2 px-8 py-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-200 text-xl font-bold"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              custom={navLinks.length} // Ensure it animates after other links
              onClick={() => setMobileMenuOpen(false)} // Close menu on donate click
            >
              <FaHandHoldingHeart />
              <span>Donate</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
