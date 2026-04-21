import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { GiftRegistry } from '@/entities';
import { Image } from '@/components/ui/image';
import { ExternalLink, Check } from 'lucide-react';

export default function GiftRegistrySection() {
  const [gifts, setGifts] = useState<GiftRegistry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGifts();
  }, []);

  const loadGifts = async () => {
    try {
      const result = await BaseCrudService.getAll<GiftRegistry>('gifts');
      setGifts(result.items);
    } catch (error) {
      console.error('Error loading gifts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="gifts" className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-6xl text-primary mb-6">
            Gift Registry
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've created a registry to help us start our new life together.
          </p>
        </motion.div>

        <div className="min-h-[500px]">
          {isLoading ? null : gifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gifts.map((gift, index) => (
                <motion.div
                  key={gift._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-background border-2 overflow-hidden group relative ${
                    gift.isPurchased 
                      ? 'border-primary/30 opacity-75' 
                      : 'border-primary/20 hover:border-primary transition-colors'
                  }`}
                >
                  {gift.isPurchased && (
                    <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2">
                      <Check size={16} />
                      <span className="font-paragraph text-xs uppercase tracking-wider">Reserved</span>
                    </div>
                  )}

                  {gift.giftImage && (
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={gift.giftImage}
                        alt={gift.giftName || 'Gift'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={500}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-primary mb-4">
                      {gift.giftName}
                    </h3>

                    {gift.description && (
                      <p className="font-paragraph text-sm text-secondary-foreground/80 mb-4 leading-relaxed">
                        {gift.description}
                      </p>
                    )}

                    {gift.contributionInstructions && (
                      <div className="mb-6 p-4 bg-primary/5 border border-primary/20">
                        <p className="font-paragraph text-xs text-secondary-foreground/70 leading-relaxed">
                          {gift.contributionInstructions}
                        </p>
                      </div>
                    )}

                    {gift.giftLink && !gift.isPurchased && (
                      <a
                        href={gift.giftLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-paragraph text-sm hover:bg-primary/90 transition-colors w-full justify-center"
                      >
                        <span>View Gift</span>
                        <ExternalLink size={16} />
                      </a>
                    )}

                    {gift.isPurchased && (
                      <div className="px-6 py-3 bg-primary/10 text-primary font-paragraph text-sm text-center">
                        Thank you! This gift has been reserved
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <p className="font-paragraph text-lg text-secondary-foreground mb-6">
                  We are still finalizing our gift registry. Please check back soon, or feel free to contact us directly if you have any questions.
                </p>
                <p className="font-paragraph text-base text-secondary-foreground/70">
                  Your love and support mean the world to us.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
