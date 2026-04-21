import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function OpeningLetter() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Auto-open after a short delay
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const letterVariants = {
    closed: {
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    open: {
      rotateX: -180,
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.6 }
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-secondary-foreground to-background flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full max-w-2xl perspective">
        {/* Letter Container */}
        <motion.div
          className="relative w-full h-96 cursor-pointer"
          onClick={handleClick}
          style={{ perspective: "1000px" }}
        >
          {/* Envelope Back (closed state) */}
          <motion.div
            variants={letterVariants}
            animate={isOpen ? "open" : "closed"}
            className="absolute inset-0 bg-white shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "top center"
            }}
          >
            {/* Front of envelope */}
            <div className="w-full h-full flex flex-col items-center justify-center p-12 relative">
              {/* Envelope flap effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/10 to-transparent" />
              
              {/* Decorative seal */}
              <div className="absolute top-8 right-8 w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-primary rounded-full flex items-center justify-center">
                  <span className="text-primary font-heading text-xl">✦</span>
                </div>
              </div>

              {/* Main text on envelope */}
              <h2 className="font-heading text-4xl md:text-5xl text-foreground text-center leading-tight">
                Join Us
              </h2>
              <p className="font-paragraph text-secondary-foreground/60 text-center mt-4 text-lg">
                Click to open
              </p>
            </div>
          </motion.div>

          {/* Letter Content (inside) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-foreground to-primary-foreground/95 shadow-2xl p-12 flex flex-col items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.6, delay: isOpen ? 0.4 : 0 }}
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="text-center space-y-6"
            >
              <h3 className="font-heading text-3xl md:text-4xl text-primary leading-tight">
                Join Us in Celebrating
              </h3>
              <p className="font-paragraph text-primary/80 text-lg leading-relaxed max-w-md">
                We invite you to share in our joy as we celebrate our union in the heart of Italy. A weekend of love, wine, and unforgettable memories awaits.
              </p>
              <div className="pt-4">
                <p className="font-heading text-primary text-2xl">
                  Christa & Alexander
                </p>
                <p className="font-paragraph text-primary/60 text-sm mt-2">
                  September 14, 2024 • Langhe, Piemonte
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Click instruction */}
        <motion.p
          className="text-center font-paragraph text-secondary-foreground/60 text-sm mt-12"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {isOpen ? "" : "✦ Click the letter to open ✦"}
        </motion.p>
      </div>
    </section>
  );
}
