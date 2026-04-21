import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://static.wixstatic.com/media/71f2f6_e2d041a6d79b49cc946ace5062383e8f~mv2.png?originWidth=1920&originHeight=1024"
          alt="Rolling hills of Langhe vineyards in Piedmont, Italy"
          className="w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[120rem] mx-auto px-6 lg:px-12 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-paragraph text-lg lg:text-xl text-primary-foreground/90 mb-6 tracking-wider uppercase">
            You are invited to celebrate
          </p>
          <h1 className="font-heading text-6xl lg:text-8xl xl:text-9xl text-primary-foreground mb-8">
            Christa & You
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="font-paragraph text-xl lg:text-2xl text-primary-foreground/90 mb-4">
            Langhe, Piedmont, Italy
          </p>
          <p className="font-paragraph text-lg lg:text-xl text-primary-foreground/80">
            A celebration of love among the vineyards
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <a href="#introduction" className="flex flex-col items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <span className="font-paragraph text-sm uppercase tracking-wider">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
