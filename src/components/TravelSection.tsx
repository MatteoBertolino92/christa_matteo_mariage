import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { TravelRoutes } from '@/entities';
import { Plane, Train, Car, Clock, ExternalLink } from 'lucide-react';

export default function TravelSection() {
  const [routes, setRoutes] = useState<TravelRoutes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    try {
      const result = await BaseCrudService.getAll<TravelRoutes>('travelroutes');
      setRoutes(result.items);
    } catch (error) {
      console.error('Error loading travel routes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransportIcon = (mode: string | undefined) => {
    if (!mode) return <Car size={24} />;
    const lowerMode = mode.toLowerCase();
    if (lowerMode.includes('plane') || lowerMode.includes('flight')) return <Plane size={24} />;
    if (lowerMode.includes('train')) return <Train size={24} />;
    return <Car size={24} />;
  };

  return (
    <section id="travel" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-6xl mb-6">
            Getting to Langhe
          </h2>
          <p className="font-paragraph text-lg opacity-90 max-w-3xl mx-auto">
            Whether you're traveling from Paris, Bangui, Savona, or anywhere else in the world, here's how to reach our celebration in the heart of Piedmont.
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? null : routes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {routes.map((route, index) => (
                <motion.div
                  key={route._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-primary-foreground text-secondary-foreground p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-primary">
                      {getTransportIcon(route.transportMode)}
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-primary">
                        From {route.originCity}
                      </h3>
                      {route.transportMode && (
                        <p className="font-paragraph text-sm text-secondary-foreground/70 capitalize">
                          {route.transportMode}
                        </p>
                      )}
                    </div>
                  </div>

                  {route.estimatedDuration && (
                    <div className="flex items-center gap-3 mb-4">
                      <Clock size={18} className="text-primary flex-shrink-0" />
                      <span className="font-paragraph text-sm">
                        {route.estimatedDuration}
                      </span>
                    </div>
                  )}

                  {route.travelInstructions && (
                    <p className="font-paragraph text-base leading-relaxed mb-6">
                      {route.travelInstructions}
                    </p>
                  )}

                  {route.bookingLink && (
                    <a
                      href={route.bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-paragraph text-sm text-primary hover:underline"
                    >
                      <span>Book your travel</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg opacity-70">
                Travel information coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
