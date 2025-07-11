"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdBadge,
  FaStore,
  FaGraduationCap,
} from "react-icons/fa";

// --- Login Component (Corrected with visible fields) ---
const Login = ({ switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Keep itemVariants for general use if needed elsewhere, but not directly on input wrappers here
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginSuccess(false);

    if (validateForm()) {
      // Simulate API call or login logic
      console.log("Login Data:", formData);
      setLoginSuccess(true);
      // In a real app, you'd redirect or set user context here
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-extrabold text-emerald-700 mb-4 text-center">
        Login to Your Account
      </h2>
      <p className="text-stone-700 text-lg leading-relaxed mb-8 text-center">
        Welcome back, comrade!
      </p>

      {loginSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline ml-2">
            You have successfully logged in.
          </span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Removed motion.div around input fields to ensure immediate visibility */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-stone-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-400" />
            <input
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="block text-stone-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-gray-400" />
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
              placeholder="Your password"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-md shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <span>Login</span>
        </motion.button>
      </form>

      <p className="text-center text-stone-700 mt-6">
        Don't have an account?{" "}
        <button
          onClick={switchToRegister}
          className="text-emerald-700 hover:underline font-semibold focus:outline-none"
        >
          Register here.
        </button>
      </p>
    </motion.div>
  );
};

// --- Register Component (Unchanged from previous successful version) ---
const Register = () => {
  const [currentView, setCurrentView] = useState("register"); // State to control which view is active

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    role: "comrade", // Default role
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Framer Motion variants for section entrance
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Framer Motion variants for form elements
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field as user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrationSuccess(false); // Reset success message

    if (validateForm()) {
      // Simulate API call or registration logic
      console.log("Registration Data:", formData);
      setRegistrationSuccess(true);
      // Optionally reset form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        username: "",
        role: "comrade",
      });
      setErrors({}); // Clear any remaining errors
    }
  };

  const switchToLogin = () => setCurrentView("login");
  const switchToRegister = () => setCurrentView("register");

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-stone-100 p-4 font-serif"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {" "}
        {/* Use AnimatePresence for exit animations */}
        {currentView === "register" ? (
          <motion.div
            key="register-form" // Unique key for AnimatePresence
            className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-4xl font-extrabold text-emerald-700 mb-4 text-center"
              variants={itemVariants}
            >
              Register for Feed A Comrade
            </motion.h2>
            <motion.p
              className="text-stone-700 text-lg leading-relaxed mb-8 text-center"
              variants={itemVariants}
            >
              Join our community to help or receive support.
            </motion.p>

            {registrationSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline ml-2">
                  Your registration was successful.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="name"
                    className="block text-stone-700 text-sm font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <FaUser className="absolute left-3 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-stone-700 text-sm font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <FaEnvelope className="absolute left-3 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="password"
                    className="block text-stone-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <FaLock className="absolute left-3 text-gray-400" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                      placeholder="Create a password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="username"
                    className="block text-stone-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <FaIdBadge className="absolute left-3 text-gray-400" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                      placeholder="Choose a username"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="md:col-span-2">
                  <label
                    htmlFor="role"
                    className="block text-stone-700 text-sm font-bold mb-2"
                  >
                    Register As:
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`block appearance-none w-full bg-white border ${
                        errors.role ? "border-red-500" : "border-gray-300"
                      } text-stone-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-emerald-500`}
                    >
                      <option value="comrade">Comrade (Student)</option>
                      <option value="shop_owner">Shop Owner</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                  )}
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-md shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out mt-6"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <span>Register</span>
              </motion.button>
            </form>

            <motion.p
              className="text-center text-stone-700 mt-6"
              variants={itemVariants}
            >
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="text-emerald-700 hover:underline font-semibold focus:outline-none"
              >
                Login here.
              </button>
            </motion.p>
          </motion.div>
        ) : (
          <Login switchToRegister={switchToRegister} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Register;
