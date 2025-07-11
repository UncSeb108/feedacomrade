"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa"; // Importing FaHeart for a decorative touch

const Footer = () => {
  // Framer Motion variants for section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-black py-12 px-4 font-serif text-stone-300"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when the footer comes into view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% visible
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
          {" "}
          {/* Changed text-center to text-left for mobile alignment */}
          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="home"
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#what-we-do"
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  What We Do
                </a>
              </li>

              <li>
                <a
                  href="#contact-us"
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Legal/Information Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Information</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#faq"
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>{" "}
              {/* Link to separate FAQ page */}
           
              <li>
                <a
                  href="/register" // Added link to Register page
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/donate" // Added link to Donate page
                  className="hover:text-amber-500 transition-colors duration-200"
                >
                  Donate
                </a>
              </li>
            </ul>
          </div>
          {/* Brand/Copyright/Powered By Column */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Feed A Comrade
              </h3>
              <p className="text-sm mb-2 flex items-center justify-start space-x-1">
                {" "}
                {/* Changed justify-center to justify-start for mobile alignment */}{" "}
                <span>Made with</span> <FaHeart className="text-red-500" />{" "}
                <span>by Shopokoa</span>
              </p>
            </div>
            <p className="text-sm mt-auto">
              &copy; {new Date().getFullYear()} Feed A Comrade. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* Copyright at the very bottom, still centered */}
        <div className="border-t border-stone-700 pt-8 mt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Feed A Comrade. All rights
            reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
