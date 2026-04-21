import { motion } from 'framer-motion';
import { useState } from 'react';

export default function OpeningLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-secondary-foreground via-background to-background flex items-center justify-center overflow-hidden py-20 px-6">

      {/* Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-32 right-20 w-96 h-96 bg-primary/6 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/4 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl">

        <motion.div
          className="relative w-full h-[500px] cursor-pointer"
          onClick={handleClick}
          style={{ perspective: "1200px" }}
        >

          {/* FRONT */}
          <motion.div
            animate={{
              rotateY: isOpen ? 180 : 0,
              rotateX: isOpen ? 15 : 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-white relative overflow-hidden rounded-lg"
              style={{
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
              }}
            >

              {/* Flap */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/8 to-transparent" />

              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              {/* ✅ NEW: Envelope stamp + postmark */}
              <motion.div
                className="absolute top-6 right-6"
                animate={{ rotate: isOpen ? 8 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="relative w-20 h-20">

                  {/* Stamp */}
                  <div className="absolute top-0 right-0 w-14 h-14 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <span className="text-primary/60 text-xs tracking-widest">
                      IT
                    </span>
                  </div>

                  {/* Postmark lines */}
                  <div className="absolute top-4 right-10 flex flex-col gap-1">
                    <div className="w-10 h-[2px] bg-primary/30 rounded-full" />
                    <div className="w-12 h-[2px] bg-primary/20 rounded-full" />
                    <div className="w-8 h-[2px] bg-primary/20 rounded-full" />
                  </div>

                  {/* Circular mark */}
                  <div className="absolute top-6 right-6 w-10 h-10 border border-primary/30 rounded-full" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="w-full h-full flex flex-col items-center justify-center p-12 relative">
                <motion.div
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6"
                >
                  <motion.h2
                    className="text-5xl md:text-6xl"
                    animate={{ y: isOpen ? -20 : 0 }}
                  >
                    Join Us
                  </motion.h2>

                  <motion.p
                    className="text-secondary-foreground/50 text-lg tracking-widest uppercase"
                    animate={{ y: isOpen ? 20 : 0 }}
                  >
                    in Celebrating Love
                  </motion.p>

                  <motion.div
                    className="pt-6 flex justify-center gap-2 text-primary/40"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                  >
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                  </motion.div>
                </motion.div>

                <motion.p
                  className="absolute bottom-8 text-xs text-secondary-foreground/40 tracking-widest uppercase"
                  animate={{ opacity: isOpen ? 0 : 0.6 }}
                >
                  Click to open
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* BACK */}
          <motion.div
            animate={{
              rotateY: isOpen ? 0 : -180,
              rotateX: isOpen ? -15 : 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-0"
          >
            <div className="w-full h-full bg-primary-foreground rounded-lg flex items-center justify-center">
              <p className="text-primary text-lg">Your letter content</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
