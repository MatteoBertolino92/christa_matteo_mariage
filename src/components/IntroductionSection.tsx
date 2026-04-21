import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function IntroductionSection() {
  return (
    <section id="introduction" className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl lg:text-6xl text-primary mb-8">
              Our Story
            </h2>
            <div className="space-y-6 font-paragraph text-base lg:text-lg text-secondary-foreground">
              <p>
                We are thrilled to invite you to join us in the heart of Italy's most enchanting wine region. The Langhe, with its rolling hills covered in vineyards and medieval villages, provides the perfect backdrop for our celebration.
              </p>
              <p>
                This region holds a special place in our hearts, representing the beauty of tradition, the richness of culture, and the warmth of community. We cannot wait to share this magical place with all of you.
              </p>
              <p>
                From Paris, Bangui, Savona, and beyond, we are bringing together our loved ones from across the world to witness and celebrate our union. Your presence means everything to us.
              </p>
            </div>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/71f2f6_ae2357d890fa4c78ad1b7524b493562a~mv2.png?originWidth=384&originHeight=512"
                  alt="Christa - portrait in the vineyards"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={400}
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/71f2f6_16dacff556c740429141f30005dbfe30~mv2.png?originWidth=384&originHeight=512"
                  alt="Couple walking through Langhe countryside"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={400}
                />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/71f2f6_0113971bf6154dd994b75dfc0bc4d809~mv2.png?originWidth=384&originHeight=512"
                  alt="Groom - portrait among the vines"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={400}
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/71f2f6_685444207e21448dbe3066e61514530a~mv2.png?originWidth=384&originHeight=512"
                  alt="Couple embracing with Langhe hills in background"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  width={400}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
