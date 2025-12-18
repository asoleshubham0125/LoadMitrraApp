import Navbar from "../Navbar";
import Footer from "../Footer";
import CTA from "../CTA";

import Hero from "./Hero";
import Stat from "./Stat";
import DriverChoose from "./DriverChoose";
import DriverReview from "./DriverReview";
import HowToStart from "./HowToStart";

export default function ForDriver() {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Stat />
        <DriverChoose />
        <DriverReview />
        <HowToStart />
        <CTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
