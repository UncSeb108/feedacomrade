"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaMoneyBill,
  FaHandHoldingHeart,
  FaCreditCard,
  FaCalendarAlt,
  FaLock,
  FaMobileAlt,
} from "react-icons/fa";

const Donate = () => {
  const predefinedAmounts = [
    { id: "1000", amount: 1000, label: "KES 1000 - One Week of Meals" },
    { id: "2500", amount: 2500, label: "KES 2500 - One Month of Meals" },
    { id: "5000", amount: 5000, label: "KES 5000 - Support a Comrade for a Semester" },
  ];

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [mpesaPhoneNumber, setMpesaPhoneNumber] = useState("");

  const [donationSuccess, setDonationSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount)); // Update custom amount input
    setErrors((prev) => ({ ...prev, amount: "" })); // Clear amount error
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);

      const numericValue = Number(value);

      // If input matches one of the predefined amounts → highlight that card
      const matched = predefinedAmounts.find(
        (item) => item.amount === numericValue
      );
      if (matched) {
        setSelectedAmount(matched.amount);
      } else {
        setSelectedAmount(null);
      }
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    // Clear specific payment method fields and errors when method changes
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setMpesaPhoneNumber("");
    setErrors((prev) => ({
      ...prev,
      paymentMethod: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      mpesaPhoneNumber: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const finalAmount = selectedAmount || parseFloat(customAmount);

    if (!finalAmount || finalAmount <= 0) {
      newErrors.amount = "Please select or enter a valid donation amount.";
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    } else if (paymentMethod === "credit_card") {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length !== 16) {
        newErrors.cardNumber = "Valid 16-digit card number is required.";
      }
      if (
        !expiryDate.trim() ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)
      ) {
        newErrors.expiryDate = "Valid MM/YY expiry date is required.";
      }
      if (!cvv.trim() || cvv.length < 3 || cvv.length > 4) {
        newErrors.cvv = "Valid 3 or 4-digit CVV is required.";
      }
    } else if (paymentMethod === "mpesa") {
      if (
        !mpesaPhoneNumber.trim() ||
        !/^\+?\d{10,15}$/.test(mpesaPhoneNumber)
      ) {
        newErrors.mpesaPhoneNumber =
          "Valid Mpesa phone number is required (e.g., +2547...).";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDonationSuccess(false);
    setApiError("");
    setLoading(true);

    if (validateForm()) {
      const finalAmount = selectedAmount || parseFloat(customAmount);

      if (paymentMethod === "mpesa") {
        console.log("Sending donation request with:", {
          amount: finalAmount,
          phone: mpesaPhoneNumber,
        });
        try {
          const response = await fetch("https://feedacomrade-xvzyr.ondigitalocean.app/api/donate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: finalAmount,
              phone: mpesaPhoneNumber,
            }),
          });

          const data = await response.json();
          console.log("Received response:", data);

          if (response.ok) {
            setDonationSuccess(true);
            setSelectedAmount(null);
            setCustomAmount("");
            setPaymentMethod("");
            setMpesaPhoneNumber("");
            setErrors({});
          } else {
            setApiError(data.error || "An unexpected error occurred.");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setApiError("Failed to connect to the server. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        // Handle other payment methods if necessary
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-stone-100 p-4 font-serif"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full text-center">
        {/* Main Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-4"
          variants={itemVariants}
        >
          Make a Difference Today{" "}
          <FaHeart className="inline-block text-red-500 ml-2" />
        </motion.h2>

        {/* Introductory Paragraph */}
        <motion.p
          className="text-stone-700 text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Your contribution directly funds subsidized meals, ensuring students
          can eat without financial distress and focus on their education. Every
          meal you help provide is a step towards a brighter future for a
          comrade.
        </motion.p>

        {/* How Donations Help Section */}
        <motion.div className="mb-12" variants={itemVariants}>
          <h3 className="text-2xl font-bold text-emerald-700 mb-4">
            How Your Donation Helps:
          </h3>
          <ul className="list-disc list-inside text-stone-700 text-lg leading-relaxed space-y-2 max-w-xl mx-auto">
            <li>Provides nutritious and affordable meals to students.</li>
            <li>Reduces financial burden and stress on vulnerable students.</li>
            <li>
              Directly supports improved academic performance and retention.
            </li>
            <li>
              Empowers students to pursue their educational dreams without
              hunger.
            </li>
          </ul>
        </motion.div>

        {/* Donation Form/Options Section */}
        <motion.div
          className="bg-stone-50 p-8 rounded-lg shadow-md"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-emerald-700 mb-6">
            Choose Your Impact
          </h3>

          {donationSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <strong className="font-bold">Thank You!</strong>
              <span className="block sm:inline ml-2">
                Your donation has been successfully processed.
              </span>
            </motion.div>
          )}

          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">
                {apiError}
              </span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pre-defined Donation Amounts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {predefinedAmounts.map((option) => (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => handleAmountSelect(option.amount)}
                  className={`p-4 rounded-md border-2 ${selectedAmount === option.amount
                      ? "bg-amber-500 border-amber-500 text-white shadow-lg"
                      : "bg-emerald-100 border-emerald-100 text-emerald-800 hover:bg-emerald-200 hover:border-emerald-200"
                    } transition-all duration-200 ease-in-out font-bold flex flex-col items-center`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaMoneyBill className="text-2xl mb-2" />
                  <span className="text-xl">KES {option.amount}</span>
                  <span className="text-sm mt-1">
                    {option.label.split(" - ")[1]}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label
                htmlFor="custom-amount"
                className="block text-stone-700 text-sm font-bold mb-2"
              >
                Or Enter Custom Amount:
              </label>
              <div className="relative flex items-center">
                <FaMoneyBill className="absolute left-3 text-gray-400" />
                <input
                  type="number"
                  id="custom-amount"
                  name="customAmount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.amount ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                  placeholder="e.g., 5000"
                  min="1"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label
                htmlFor="payment-method"
                className="block text-stone-700 text-sm font-bold mb-2"
              >
                Select Payment Method:
              </label>
              <div className="relative">
                <select
                  id="payment-method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  className={`block appearance-none w-full bg-white border ${errors.paymentMethod ? "border-red-500" : "border-gray-300"
                    } text-stone-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-emerald-500`}
                  required
                >
                  <option value="">-- Select Method --</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="mpesa">Mpesa</option>
                  <option value="bank_transfer">Bank Transfer</option>
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
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            {/* Conditional Payment Details */}
            {paymentMethod === "credit_card" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4 overflow-hidden"
              >
                <h4 className="text-xl font-bold text-emerald-700 mb-2 text-left">
                  Credit Card Details
                </h4>
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-stone-700 text-sm font-bold mb-2 text-left"
                  >
                    Card Number
                  </label>
                  <div className="relative flex items-center">
                    <FaCreditCard className="absolute left-3 text-gray-400" />
                    <input
                      type="text"
                      id="card-number"
                      name="cardNumber"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(
                          e.target.value
                            .replace(/\s/g, "")
                            .replace(/(\d{4})/g, "$1 ")
                            .trim()
                        )
                      } // Format as XXXX XXXX XXXX XXXX
                      className={`w-full pl-10 pr-3 py-2 border ${errors.cardNumber ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength="19" // 16 digits + 3 spaces
                      required
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry-date"
                      className="block text-stone-700 text-sm font-bold mb-2 text-left"
                    >
                      Expiry Date (MM/YY)
                    </label>
                    <div className="relative flex items-center">
                      <FaCalendarAlt className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        id="expiry-date"
                        name="expiryDate"
                        value={expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                          if (value.length > 2) {
                            value =
                              value.substring(0, 2) +
                              "/" +
                              value.substring(2, 4);
                          }
                          setExpiryDate(value);
                        }}
                        className={`w-full pl-10 pr-3 py-2 border ${errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-stone-700 text-sm font-bold mb-2 text-left"
                    >
                      CVV
                    </label>
                    <div className="relative flex items-center">
                      <FaLock className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, ""))
                        } // Only digits
                        className={`w-full pl-10 pr-3 py-2 border ${errors.cvv ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                        placeholder="XXX"
                        maxLength="4"
                        required
                      />
                    </div>
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1 text-left">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === "mpesa" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4 overflow-hidden"
              >
                <h4 className="text-xl font-bold text-emerald-700 mb-2 text-left">
                  Mpesa Details
                </h4>
                <div>
                  <label
                    htmlFor="mpesa-phone"
                    className="block text-stone-700 text-sm font-bold mb-2 text-left"
                  >
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <FaMobileAlt className="absolute left-3 text-gray-400" />
                    <input
                      type="tel" // Use type="tel" for phone numbers
                      id="mpesa-phone"
                      name="mpesaPhoneNumber"
                      value={mpesaPhoneNumber}
                      onChange={(e) => setMpesaPhoneNumber(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 border ${errors.mpesaPhoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700`}
                      placeholder="e.g., +2547XXXXXXXX"
                      required
                    />
                  </div>
                  {errors.mpesaPhoneNumber && (
                    <p className="text-red-500 text-xs mt-1 text-left">
                      {errors.mpesaPhoneNumber}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Donate Now Button */}
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-8 py-3 text-lg font-bold text-white bg-amber-500 rounded-md shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out disabled:bg-gray-400"
              variants={buttonVariants}
              whileHover={!loading ? "hover" : ""}
              whileTap={!loading ? "tap" : ""}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FaHandHoldingHeart className="text-xl" />
              )}
              <span>{loading ? "Processing..." : "Donate Now"}</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Concluding Statement */}
        <motion.p
          className="text-stone-700 text-xl font-semibold mt-12"
          variants={itemVariants}
        >
          Together, we can feed a comrade and empower futures.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Donate;
