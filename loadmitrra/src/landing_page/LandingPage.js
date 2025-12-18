import React from "react";

import Navbar from "../Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import Feature from "./Feature";
import CTA from "../CTA";
import Footer from "../Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Feature />
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;
