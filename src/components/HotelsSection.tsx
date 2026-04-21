import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { RecommendedHotels } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, DollarSign, ExternalLink } from 'lucide-react';

export default function HotelsSection() {
  const [hotels, setHotels] = useState<RecommendedHotels[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const result = await BaseCrudService.getAll<RecommendedHotels>('hotels');
      setHotels(result.items);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="hotels" className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-6xl text-primary mb-6">
            Where to Stay
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl mx-auto">
            We've selected a range of accommodations to suit every preference and budget. All are conveniently located near our celebration venue.
          </p>
        </motion.div>

        <div className="min-h-[500px]">
          {isLoading ? null : hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel, index) => (
                <motion.div
                  key={hotel._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background border-2 border-primary/20 hover:border-primary transition-colors overflow-hidden group"
                >
                  {hotel.hotelImage && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={hotel.hotelImage}
                        alt={hotel.hotelName || 'Hotel'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={500}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-primary mb-4">
                      {hotel.hotelName}
                    </h3>

                    {hotel.description && (
                      <p className="font-paragraph text-sm text-secondary-foreground/80 mb-4 leading-relaxed">
                        {hotel.description}
                      </p>
                    )}

                    <div className="space-y-3 mb-6">
                      {hotel.priceRange && (
                        <div className="flex items-center gap-3">
                          <DollarSign size={18} className="text-primary flex-shrink-0" />
                          <span className="font-paragraph text-sm text-secondary-foreground">
                            {hotel.priceRange}
                          </span>
                        </div>
                      )}
                      {hotel.distanceToVenue && (
                        <div className="flex items-center gap-3">
                          <MapPin size={18} className="text-primary flex-shrink-0" />
                          <span className="font-paragraph text-sm text-secondary-foreground">
                            {hotel.distanceToVenue} from venue
                          </span>
                        </div>
                      )}
                    </div>

                    {hotel.bookingLink && (
                      <a
                        href={hotel.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-paragraph text-sm hover:bg-primary/90 transition-colors w-full justify-center"
                      >
                        <span>Book Now</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                Hotel recommendations coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
