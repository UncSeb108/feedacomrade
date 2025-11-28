"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHandHoldingHeart,
  FaDollarSign,
  FaBook,
  FaUtensils,
  FaMobileAlt,
  FaPiggyBank,
  FaStore,
  FaLeaf,
  FaUsers,
  FaFemale,
  FaSeedling,
  FaChartLine,
  FaGlobe,
  FaChartArea,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHandshake,
  FaBoxOpen,
  FaBullhorn,
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6"; // FaBowlFood is from fa6

// --- Shared Framer Motion Variants ---
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
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

// --- Number Counter Component for Impact Section ---
const NumberCounter = ({ from, to, duration = 2 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let start = null;
    const animate = (currentTime) => {
      if (!start) start = currentTime;
      const progress = (currentTime - start) / (duration * 1000);
      const value = Math.min(progress, 1) * (to - from) + from;
      setCount(Math.floor(value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to); // Ensure it ends on the exact 'to' value
      }
    };
    requestAnimationFrame(animate);
  }, [from, to, duration, isInView]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
};

// --- Navbar Component (Reused from previous turn, adjusted for font) ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about-us" },
    { name: "What We Do", href: "#what-we-do" },
    { name: "Impact", href: "#impact" },
    { name: "How You Can Help", href: "#how-you-can-help" },
    { name: "Team", href: "#team" },
    { name: "Partners", href: "#partners" },
    { name: "Future Vision", href: "#future-vision" },
    { name: "Contact Us", href: "#contact-us" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out`} // Sans font is default
      variants={navbarVariants}
      animate={scrolled ? "scrolled" : "initial"}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Name/Logo */}
        <a href="#home" className="text-white text-2xl font-bold">
          Shopokoa
        </a>

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
          <a href="#how-you-can-help">
            <button className="flex items-center space-x-2 px-6 py-2 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-200">
              <FaHandHoldingHeart />
              <span>Donate</span>
            </button>
          </a>
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
            <a href="#how-you-can-help">
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
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Hero Section ---
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
      id="home"
      className="relative flex items-center justify-center min-h-screen px-4 py-16 text-center md:px-8 lg:px-16 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image - Changed from Next.js Image to standard <img> */}
      <img
        src="/images/bg7.jpg" // Replace with your actual image path
        alt="Students studying"
        className="absolute object-cover object-top inset-0 z-0 w-full h-full opacity-100" // Apply cover and fill manually
      />

      {/* Green Overlay */}
      <div className="absolute inset-0 z-[1] bg-black opacity-50"></div>

      <div className="max-w-5xl mx-auto z-10 relative">
        <motion.h1
          className="mb-4 text-4xl font-extrabold leading-none text-white md:text-5xl lg:text-7xl flex items-center justify-center gap-3"
          variants={itemVariants}
        >
          Stopping Campus Hunger Before it Kills Futures
        </motion.h1>
        <motion.p
          className="mb-6 text-xl text-gray-300 md:text-2xl"
          variants={itemVariants}
        >
          Empowering futures through sustainable <br /> meal access for students
          in higher learning institutions.
        </motion.p>

        <a href="#how-you-can-help">
          <motion.button
            className="flex items-center justify-center space-x-2 px-16 py-3 text-lg font-bold text-white bg-green-800 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out mx-auto block"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaHandHoldingHeart className="text-xl" />
            <span>Join the Movement</span>
          </motion.button>
        </a>
      </div>
    </motion.section>
  );
};

// --- About Us Section ---
const AboutUs = () => {
  return (
    <motion.section
      id="about-us"
      className="bg-white py-16 px-4 md:py-24 font-serif"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-12 text-center"
          variants={textVariants}
        >
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Who We Are */}
          <motion.div variants={textVariants}>
            <h3 className="text-3xl font-bold text-emerald-700 mb-6">
              Who We Are
            </h3>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              Feed a Comrade is a non-profit initiative dedicated to combating
              food insecurity among students in higher learning institutions. We
              believe that access to nutritious meals is a fundamental right
              that underpins academic success and personal well-being.
            </p>
            <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
              <li>
                <strong>Mission:</strong> To empower futures by providing
                sustainable, affordable, and accessible meal solutions for
                students facing hunger.
              </li>
              <li>
                <strong>Vision:</strong> A world where no student has to choose
                between education and a meal, fostering a generation of healthy,
                focused, and successful graduates.
              </li>
              <li>
                <strong>Philosophy:</strong> Leveraging technology and community
                partnerships to create a dignified and efficient system for meal
                access.
              </li>
              <li>
                <strong>Evolution:</strong> Born from a deep understanding of
                student struggles, Feed a Comrade evolved into Shop Okoa, a
                digital platform designed for scalable impact.
              </li>
            </ul>
          </motion.div>

          {/* Problem Statement */}
          <motion.div variants={textVariants}>
            <h3 className="text-3xl font-bold text-emerald-700 mb-6">
              Problem Statement
            </h3>
            <p className="text-stone-700 text-lg leading-relaxed mb-4">
              Many students transitioning to tertiary education face unforeseen
              financial challenges, leading to widespread food insecurity. This
              often results in:
            </p>
            <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
              <li>
                Poor academic performance due to lack of concentration and
                energy.
              </li>
              <li>Increased stress, anxiety, and mental health issues.</li>
              <li>Higher dropout rates, shattering dreams and potential.</li>
              <li>Compromised health and well-being.</li>
            </ul>
          </motion.div>
        </div>

        {/* Our Objectives */}
        <motion.div className="mt-16" variants={textVariants}>
          <h3 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
            Our Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-3">
                Primary Objective:
              </h4>
              <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
                <li>
                  To provide consistent access to nutritious and affordable
                  meals for students in higher learning institutions.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-emerald-700 mb-3">
                Secondary Objectives:
              </h4>
              <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2">
                <li>
                  To reduce student dropout rates attributed to food insecurity.
                </li>
                <li>
                  To improve academic performance and overall well-being of
                  beneficiaries.
                </li>
                <li>
                  To foster a sustainable ecosystem involving local vendors and
                  farmers.
                </li>
                <li>
                  To raise awareness about student food insecurity and advocate
                  for policy changes.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Target Beneficiaries */}
        <motion.div className="mt-16" variants={textVariants}>
          <h3 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
            Target Beneficiaries
          </h3>
          <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2 max-w-2xl mx-auto">
            <li>
              Students in higher learning institutions (universities, colleges,
              TVETs) identified as food insecure.
            </li>
            <li>
              Particularly focusing on those from low-income backgrounds and
              vulnerable populations.
            </li>
            <li>
              Local food vendors who benefit from increased business and stable
              income.
            </li>
            <li>
              Smallholder farmers who gain a reliable market for their produce.
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- What We Do Section ---
const WhatWeDo = () => {
  const components = [
    {
      icon: <FaMobileAlt className="text-5xl mb-4 text-amber-500" />,
      title: "Mobile App Integration",
      description:
        "Our intuitive Shop Okoa mobile app allows students to easily access meal vouchers, track their balance, and locate participating vendors.",
    },
    {
      icon: <FaPiggyBank className="text-5xl mb-4 text-amber-500" />,
      title: "Save to Eat Model",
      description:
        "Students can save funds towards their meal plans at their own pace, providing flexibility and reducing immediate financial burden.",
    },
    {
      icon: <FaStore className="text-5xl mb-4 text-amber-500" />,
      title: "Extensive Vendor Network",
      description:
        "We partner with local food vendors near campuses to provide diverse, nutritious, and culturally relevant meal options.",
    },
    {
      icon: <FaLeaf className="text-5xl mb-4 text-amber-500" />,
      title: "Farmer Engagement",
      description:
        "We connect vendors with local smallholder farmers, ensuring fresh produce, supporting local economies, and promoting sustainable agriculture.",
    },
  ];

  return (
    <motion.section
      id="what-we-do"
      className="bg-stone-100 py-16 px-4 md:py-24 font-serif text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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
          Comrade, we remove that barrier through <strong>Shop Okoa</strong>, a
          technology-driven meal access system designed for students who
          struggle with food insecurity.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {components.map((component, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center h-full transform transition-transform duration-200 ease-in-out"
              variants={cardVariants}
              whileHover="hover"
            >
              {component.icon}
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">
                {component.title}
              </h3>
              <p className="text-stone-700 text-base leading-relaxed">
                {component.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={textVariants}>
          <h3 className="text-3xl font-bold text-emerald-700 mb-6">
            Geographical Scope
          </h3>
          <p className="text-stone-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Currently operating in select higher learning institutions in
            Nairobi, Kenya. Our strategic plan includes expanding to 20+
            institutions across East Africa within the next five years, reaching
            a wider student population.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- Impact Section ---
const Impact = () => {
  const stats = [
    {
      icon: <FaBowlFood className="text-5xl mb-4 text-emerald-700" />,
      label: "Meals Provided",
      value: 250000,
      suffix: "+",
    },
    {
      icon: <FaDollarSign className="text-5xl mb-4 text-emerald-700" />,
      label: "Value of Meals",
      value: 2500000,
      prefix: "$",
      suffix: "+",
    },
    {
      icon: <FaUsers className="text-5xl mb-4 text-emerald-700" />,
      label: "Students Served Daily",
      value: 3000,
      suffix: "+",
    },
    {
      icon: <FaFemale className="text-5xl mb-4 text-emerald-700" />,
      label: "Young Women Beneficiaries",
      value: 60,
      suffix: "%",
    },
    {
      icon: <FaSeedling className="text-5xl mb-4 text-emerald-700" />,
      label: "Farmers Adopting Climate-Smart",
      value: 65,
      suffix: "%",
    },
    {
      icon: <FaChartLine className="text-5xl mb-4 text-emerald-700" />,
      label: "Dropout Rate Drop",
      value: 15,
      suffix: "%",
    },
  ];

  return (
    <motion.section
      id="impact"
      className="bg-white py-16 px-4 md:py-24 font-serif text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-12"
          variants={textVariants}
        >
          Our Impact So Far
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-stone-50 p-8 rounded-lg shadow-md flex flex-col items-center justify-center h-full"
              variants={cardVariants}
            >
              {stat.icon}
              <p className="text-5xl font-bold text-amber-500 mb-2">
                {stat.prefix}
                {<NumberCounter from={0} to={stat.value} />}
                {stat.suffix}
              </p>
              <h3 className="text-xl font-semibold text-stone-700">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- How You Can Help Section ---
const HowYouCanHelp = () => {
  const actionPoints = [
    {
      title: "Fund the Future",
      description:
        "Your financial contribution directly provides subsidized meals and supports the expansion of Shop Okoa to more students.",
      icon: <FaDollarSign className="text-4xl text-white mb-3" />,
      buttonText: "Donate Now",
      buttonLink: "#contact-us", // Can be a link to a payment gateway
    },
    {
      title: "Become a Partner",
      description:
        "We welcome partnerships with universities, corporations, and NGOs to amplify our reach and impact.",
      icon: <FaHandshake className="text-4xl text-white mb-3" />,
    },
    {
      title: "In-Kind Support",
      description:
        "Donate food supplies, kitchen equipment, or technological resources to strengthen our operations.",
      icon: <FaBoxOpen className="text-4xl text-white mb-3" />,
    },
    {
      title: "Advocate & Amplify",
      description:
        "Help us spread the word about student food insecurity and the Feed a Comrade initiative on social media and within your networks.",
      icon: <FaBullhorn className="text-4xl text-white mb-3" />,
    },
  ];

  return (
    <motion.section
      id="how-you-can-help"
      className="bg-emerald-700 py-16 px-4 md:py-24 font-serif text-white text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-8"
          variants={textVariants}
        >
          Our Call to Action - Help Us Feed a Comrade
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={textVariants}
        >
          This mission depends on people who care deeply about student welfare
          and the future of our nation. Your support, in any form, can transform
          a student's life.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {actionPoints.map((point, index) => (
            <motion.div
              key={index}
              className="bg-emerald-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center h-full"
              variants={cardVariants}
              whileHover="hover"
            >
              {point.icon}
              <h3 className="text-2xl font-bold mb-3">{point.title}</h3>
              <p className="text-base leading-relaxed mb-6">
                {point.description}
              </p>
              {point.buttonText && (
                <a href={point.buttonLink}>
                  <motion.button
                    className="flex items-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-full shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FaHandHoldingHeart className="text-xl" />
                    <span>{point.buttonText}</span>
                  </motion.button>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- Team Section ---
const Team = () => {
  const teamMembers = [
    { role: "Founder & Director", name: "Jane Doe" },
    { role: "Operations Lead", name: "John Smith" },
    { role: "Tech Developer", name: "Alice Johnson" },
    { role: "Vendor Manager", name: "David Lee" },
    { role: "M&E Officer", name: "Sarah Brown" },
    { role: "University Liaison Officer", name: "Michael Green" },
  ];

  return (
    <motion.section
      id="team"
      className="bg-white py-16 px-4 md:py-24 font-serif text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-8"
          variants={textVariants}
        >
          Meet Our Dedicated Team
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-stone-700 leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={textVariants}
        >
          Our passionate team is the driving force behind Feed a Comrade,
          working tirelessly to ensure every student has access to the
          nourishment they need to thrive.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-stone-50 p-6 rounded-lg shadow-md"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">
                {member.role}
              </h3>
              <p className="text-xl text-stone-700">{member.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- Partners & Stakeholders Section ---
const Partners = () => {
  const partnerCategories = [
    "Public Universities",
    "Local Food Vendors and Farmers",
    "Private Sector Donors",
    "Non-Governmental Organizations (NGOs)",
    "Technology Partners",
    "Community Leaders",
  ];

  return (
    <motion.section
      id="partners"
      className="bg-stone-100 py-16 px-4 md:py-24 font-serif text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-8"
          variants={textVariants}
        >
          Our Valued Partners & Stakeholders
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-stone-700 leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={textVariants}
        >
          We believe in the power of collaboration. Our success is built on
          strong relationships with a diverse range of partners who share our
          vision.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-full"
              variants={cardVariants}
              whileHover="hover"
            >
              <p className="text-xl font-semibold text-stone-700">{category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- Future Vision Section ---
const FutureVision = () => {
  const objectives = [
    {
      icon: <FaGlobe className="text-5xl mb-4 text-emerald-700" />,
      text: "Operate in 20+ institutions across East Africa.",
    },
    {
      icon: <FaUsers className="text-5xl mb-4 text-emerald-700" />,
      text: "Serve 20,000+ students daily through Shop Okoa.",
    },
    {
      icon: <FaBowlFood className="text-5xl mb-4 text-emerald-700" />,
      text: "Deliver 7 Million+ nutritious meals annually.",
    },
    {
      icon: <FaChartArea className="text-5xl mb-4 text-emerald-700" />,
      text: "Establish Feed a Comrade as a continental model for student food security.",
    },
  ];

  return (
    <motion.section
      id="future-vision"
      className="bg-white py-16 px-4 md:py-24 font-serif text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-8"
          variants={textVariants}
        >
          Our Vision for the Future (5-Year Goal)
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-stone-700 leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={textVariants}
        >
          We are committed to long-term impact. Our ambitious 5-year plan
          outlines a path to significantly scale our operations and reach.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {objectives.map((obj, index) => (
            <motion.div
              key={index}
              className="bg-stone-50 p-8 rounded-lg shadow-md flex flex-col items-center justify-center h-full"
              variants={cardVariants}
              whileHover="hover"
            >
              {obj.icon}
              <p className="text-xl text-stone-700 leading-relaxed">
                {obj.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// --- Contact Us Section ---
const ContactUs = () => {
  return (
    <motion.section
      id="contact-us"
      className="bg-emerald-700 py-16 px-4 md:py-24 font-serif text-white text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-8"
          variants={textVariants}
        >
          Let's Talk!
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl leading-relaxed mb-12"
          variants={textVariants}
        >
          Reach out today to learn more about Feed a Comrade, explore
          partnership opportunities, or simply share your thoughts. We'd love to
          hear from you!
        </motion.p>

        <motion.form
          className="bg-white p-8 rounded-lg shadow-lg text-left text-stone-700"
          variants={textVariants}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="your.email@example.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-lg font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="flex items-center justify-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-full shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out mx-auto block"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Send Message</span>
          </motion.button>
        </motion.form>

        <motion.div className="mt-12" variants={textVariants}>
          <p className="text-xl font-semibold mb-4">Email Us:</p>
          <a
            href="mailto:info@feedacomrade.org"
            className="text-white text-lg hover:underline"
          >
            info@feedacomrade.org
          </a>

          <p className="text-xl font-semibold mt-8 mb-4">Connect With Us:</p>
          <div className="flex justify-center space-x-6 text-3xl">
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-emerald-900 py-12 px-4 font-serif text-stone-300 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#what-we-do"
                  className="hover:text-white transition-colors duration-200"
                >
                  What We Do
                </a>
              </li>
              <li>
                <a
                  href="#impact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Impact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#how-you-can-help"
                  className="hover:text-white transition-colors duration-200"
                >
                  How You Can Help
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-white transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>{" "}
              {/* Placeholder for FAQ page */}
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>{" "}
              {/* Placeholder for Privacy Policy page */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#contact-us"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
              <li className="flex justify-center space-x-4 mt-2">
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-700 pt-8 mt-8">
          <p>
            &copy; {new Date().getFullYear()} Feed A Comrade. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main LandingPage Component ---
const LandingPage = () => {
  return (
    <div className="font-serif">
      {" "}
      {/* Apply font-serif to the entire page */}
      <Navbar />
      <Hero />
      <AboutUs />
      <WhatWeDo />
      <Impact />
      <HowYouCanHelp />
      <Team />
      <Partners />
      <FutureVision />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
