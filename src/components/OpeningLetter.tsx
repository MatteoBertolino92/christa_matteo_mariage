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

              {/* Envelope postage + postmark */}
              <motion.div
                className="absolute top-6 right-6"
                animate={{ rotate: isOpen ? 8 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="relative w-20 h-20">

                  {/* Stamp (top-right corner) */}
                  <div className="absolute top-0 right-0 w-14 h-14 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center">
                    <span className="text-primary/60 text-xs font-paragraph tracking-widest">
                      IT
                    </span>
                  </div>

                  {/* Postmark lines */}
                  <div className="absolute top-4 right-10 flex flex-col gap-1">
                    <div className="w-10 h-[2px] bg-primary/30 rounded-full" />
                    <div className="w-12 h-[2px] bg-primary/20 rounded-full" />
                    <div className="w-8 h-[2px] bg-primary/20 rounded-full" />
                  </div>

                  {/* Circular postmark */}
                  <div className="absolute top-6 right-6 w-10 h-10 border border-primary/30 rounded-full" />
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
                    Ouvrez l'invitation
                  </h3>

                  <p className="font-paragraph text-primary/75 text-lg leading-relaxed">
                    We invite you to share in our joy as we celebrate our union in the heart of Italy. A weekend of love, wine, and unforgettable memories awaits.
                  </p>

                  {/* Couple names */}
                  <div className="pt-6 space-y-2">
                    <p className="font-heading text-3xl text-primary tracking-tight">
                      Christa & Matteo
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
