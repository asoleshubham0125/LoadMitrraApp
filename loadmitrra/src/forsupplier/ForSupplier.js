import Navbar from "../Navbar";
import Footer from "../Footer";
import CTA from "../CTA";

import Hero from "./Hero";
import Stats from "./Stats";
import SupplierChoose from "./SupplierChoose";
import SupplierReview from "./SupplierReview";
import HowToStart from "./HowToStart";

export default function ForDriver() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Stats />
        <SupplierChoose />
        <SupplierReview />
        <HowToStart />
        <CTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
