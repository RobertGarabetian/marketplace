"use client";
import { useState, useEffect, useRef } from "react";
import CardScene from "@/components/3d/CardScene";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Index = () => {
  // Handle wheel events to control when the page starts scrolling
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [allowPageScroll, setAllowPageScroll] = useState(false);

  // Handle wheel events to control when the page starts scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If the rectangle hasn't completed its journey, prevent default scrolling
      if (scrollY < 2000 && e.deltaY > 0) {
        e.preventDefault();
        setScrollY((prev) => Math.min(prev + e.deltaY, 2000));
      } else if (scrollY >= 2000) {
        // Once the rectangle has completed its journey, allow page scrolling
        setAllowPageScroll(true);
      } else if (scrollY > 0 && e.deltaY < 0) {
        // Allow scrolling back up to reset the rectangle
        e.preventDefault();
        setScrollY((prev) => Math.max(prev + e.deltaY, 0));

        // If we're going back to the start, reset the page scroll permission
        if (scrollY - e.deltaY <= 0) {
          setAllowPageScroll(false);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollY]);

  // Track regular scroll position only after we allow page scroll
  useEffect(() => {
    if (!allowPageScroll) return;

    const handleScroll = () => {
      // Only update regular scroll position once we're allowing page scroll
      if (allowPageScroll) {
        // Keep scrollY at 2000 once we've started page scrolling
        setScrollY(2000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allowPageScroll]);
  // Calculate the background gradient based on the scroll position
  const scrollProgress = Math.min(scrollY / 2000, 1);
  const gradientPosition = `${Math.max(
    0,
    Math.min(100, scrollProgress * 100)
  )}%`;
  return (
    <motion.div
      className="min-h-screen text-white overflow-x-hidden"
      initial={{
        background:
          "linear-gradient(to right, rgba(37, 92, 153, 1) 0%, rgba(15, 23, 42, 1) 0%)",
      }}
      animate={{
        background: `linear-gradient(to right, rgba(37, 92, 153, 1) ${gradientPosition}, rgba(15, 23, 42, 1) ${gradientPosition})`,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <main>
        {/* 3D Scene */}
        <section className="h-screen w-full fixed top-0 left-0 z-10">
          <CardScene scrollY={scrollY} />

          {/* Overlay text */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <div className="text-center ">
              <span className="text-accent text-lg font-bold uppercase tracking-wider">
                Card Exchange
              </span>
              <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-white max-w-2xl mx-auto [text-shadow:_0_1px_5px_rgb(0_0_0_/_50%)]">
                Find the decks you&apos;ve been looking for
              </h1>

              <div className="mt-8 flex justify-center gap-4 pointer-events-auto">
                <Button className="bg-white text-black hover:bg-white/90">
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content section that scrolls on top of the fixed section */}
        <div
          ref={contentRef}
          className="relative z-20"
          style={{
            marginTop: "100vh", // Start content after the height of the first section
            background:
              "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8) 5%, black 15%)",
          }}
        >
          {/* Add a spacer to allow scrolling to reveal content */}
          <div style={{ height: "100px" }}></div>

          {/* Content sections */}
          <section className="min-h-screen py-20 px-6 md:px-10 backdrop-blur-sm">
            <div className="max-w-screen mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
                Our Featured Decks
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/60 rounded-xl p-6 hover:bg-gray-800/80 transition-all duration-300"
                  >
                    <div className="aspect-[2/3] bg-gray-700 rounded-lg mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">
                      Premium Deck {index + 1}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Exquisite design with premium quality materials and
                      finish.
                    </p>
                    <Button variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="min-h-screen py-20 px-6 md:px-10 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                About Our Collection
              </h2>
              <p className="text-lg text-gray-300 mb-12">
                Our playing cards are designed with meticulous attention to
                detail, using only the finest materials. Each deck tells a
                unique story through its artwork and design, making it not just
                a tool for card games but also a collectible piece of art.
              </p>

              <div className="space-y-10">
                {[
                  {
                    title: "Premium Materials",
                    desc: "We use the highest quality card stock and finishes.",
                  },
                  {
                    title: "Limited Editions",
                    desc: "Many of our decks are produced in limited quantities.",
                  },
                  {
                    title: "Artistic Designs",
                    desc: "We collaborate with renowned artists for unique aesthetics.",
                  },
                ].map((item, index) => (
                  <div key={index} className="p-6 bg-gray-800/60 rounded-xl">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </motion.div>
  );
};

export default Index;
