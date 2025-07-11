import React from "react";
import Hero from "./_components/Hero";
import ShopOkoaIntro from "./_components/ShopOkoaIntro";
import AboutUs from "./_components/AboutUs";
import ContactUs from "./_components/ContactUs";
import FAQ from "./_components/FAQ";
import Navbar from "../components/Navbar";
import Testimonials from "./_components/Testimonials";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ShopOkoaIntro />
      <AboutUs />
      <Testimonials />
      <FAQ />
      <ContactUs />
    </>
  );
};

export default Home;
