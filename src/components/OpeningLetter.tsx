import { motion } from 'framer-motion';
import { useState } from 'react';

export default function OpeningLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-secondary-foreground via-background to-background flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Elegant decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-32 right-20 w-96 h-96 bg-primary/6 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/4 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl">
        {/* 3D Perspective Container */}
        <motion.div
          className="relative w-full h-[500px] cursor-pointer"
          onClick={handleClick}
          style={{ perspective: "1200px" }}
        >
          {/* Envelope Front (visible when closed) */}
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
            {/* Envelope Outer */}
            <div className="w-full h-full bg-white relative overflow-hidden rounded-lg"
              style={{
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
              }}
            >
              {/* Envelope Flap */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/8 to-transparent pointer-events-none" />

              {/* Decorative top border line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              {/* Elegant seal - top right (Letter shape with oblique lines) */}
              <motion.div
                className="absolute top-8 right-8"
                animate={{ rotate: isOpen ? 360 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="w-24 h-24 border-2 border-primary/50 rounded-sm flex items-center justify-center relative overflow-hidden bg-primary/5">
                  {/* Oblique lines forming letter/seal shape */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
                    {/* Top left to bottom right diagonal */}
                    <line x1="15" y1="20" x2="85" y2="80" stroke="rgba(168, 81, 30, 0.6)" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Top right to bottom left diagonal */}
                    <line x1="85" y1="20" x2="15" y2="80" stroke="rgba(168, 81, 30, 0.6)" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Horizontal line through center */}
                    <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(168, 81, 30, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Decorative dots at intersections */}
                    <circle cx="50" cy="50" r="2.5" fill="rgba(168, 81, 30, 0.5)" />
                    <circle cx="50" cy="20" r="1.5" fill="rgba(168, 81, 30, 0.4)" />
                    <circle cx="50" cy="80" r="1.5" fill="rgba(168, 81, 30, 0.4)" />
                  </svg>
                </div>
              </motion.div>

              {/* Main content */}
              <div className="w-full h-full flex flex-col items-center justify-center p-12 relative">
                <motion.div
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6"
                >
                  <motion.h2
                    className="font-heading text-5xl md:text-6xl text-foreground leading-tight tracking-tight"
                    animate={{ y: isOpen ? -20 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Join Us
                  </motion.h2>
                  <motion.p
                    className="font-paragraph text-secondary-foreground/50 text-lg tracking-widest uppercase"
                    animate={{ y: isOpen ? 20 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    in Celebrating Love
                  </motion.p>
                  <motion.div
                    className="pt-6 flex justify-center gap-2 text-primary/40"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span>✦</span>
                    <span>✦</span>
                    <span>✦</span>
                  </motion.div>
                </motion.div>

                {/* Click hint */}
                <motion.p
                  className="absolute bottom-8 font-paragraph text-xs text-secondary-foreground/40 tracking-widest uppercase"
                  animate={{ opacity: isOpen ? 0 : 0.6 }}
                  transition={{ duration: 0.5 }}
                >
                  Click to open
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Envelope Back / Letter Inside (visible when open) */}
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
            {/* Letter Content */}
            <div className="w-full h-full bg-gradient-to-br from-primary-foreground via-primary-foreground to-primary-foreground/98 relative overflow-hidden rounded-lg"
              style={{
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)"
              }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/10" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/10" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/10" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/10" />

              {/* Subtle texture line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

              {/* Content */}
              <div className="w-full h-full flex flex-col items-center justify-center p-12 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center space-y-8 max-w-2xl"
                >
                  {/* Decorative line above */}
                  <div className="flex justify-center gap-3 text-primary/30">
                    <span className="text-2xl">✦</span>
                  </div>

                  <h3 className="font-heading text-4xl md:text-5xl text-primary leading-tight tracking-tight">
                    Join Us in Celebrating
                  </h3>

                  <p className="font-paragraph text-primary/75 text-lg leading-relaxed">
                    We invite you to share in our joy as we celebrate our union in the heart of Italy. A weekend of love, wine, and unforgettable memories awaits.
                  </p>

                  {/* Couple names */}
                  <div className="pt-6 space-y-2">
                    <p className="font-heading text-3xl text-primary tracking-tight">
                      Christa & Alexander
                    </p>
                    <div className="flex justify-center gap-2 text-primary/40 text-sm">
                      <span>✦</span>
                    </div>
                    <p className="font-paragraph text-primary/50 text-sm tracking-widest uppercase">
                      September 14, 2024 • Langhe, Piemonte
                    </p>
                  </div>

                  {/* Decorative line below */}
                  <div className="flex justify-center gap-3 text-primary/30 pt-4">
                    <span className="text-2xl">✦</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive hint below */}
        <motion.div
          className="text-center mt-16"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="font-paragraph text-sm text-secondary-foreground/50 tracking-widest uppercase"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ Click to open ✦
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
