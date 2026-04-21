import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { LocalActivities } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, DollarSign, ExternalLink } from 'lucide-react';

export default function ActivitiesSection() {
  const [activities, setActivities] = useState<LocalActivities[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const result = await BaseCrudService.getAll<LocalActivities>('activities');
      setActivities(result.items);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="activities" className="py-24 lg:py-32 bg-background">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-6xl text-primary mb-6">
            Explore Langhe
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl mx-auto">
            Make the most of your time in Piedmont. The Langhe region offers unforgettable experiences, from wine tastings to truffle hunting and medieval village tours.
          </p>
        </motion.div>

        <div className="min-h-[500px]">
          {isLoading ? null : activities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-secondary border-2 border-primary/20 hover:border-primary transition-colors overflow-hidden group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    {activity.activityImage && (
                      <div className="lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden">
                        <Image
                          src={activity.activityImage}
                          alt={activity.activityName || 'Activity'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          width={400}
                        />
                      </div>
                    )}
                    
                    <div className={`p-8 ${activity.activityImage ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
                      <h3 className="font-heading text-2xl lg:text-3xl text-primary mb-4">
                        {activity.activityName}
                      </h3>

                      {activity.description && (
                        <p className="font-paragraph text-base text-secondary-foreground/80 mb-6 leading-relaxed">
                          {activity.description}
                        </p>
                      )}

                      <div className="space-y-3 mb-6">
                        {activity.location && (
                          <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                            <span className="font-paragraph text-sm text-secondary-foreground">
                              {activity.location}
                            </span>
                          </div>
                        )}
                        {activity.priceRange && (
                          <div className="flex items-start gap-3">
                            <DollarSign size={18} className="text-primary mt-1 flex-shrink-0" />
                            <span className="font-paragraph text-sm text-secondary-foreground">
                              {activity.priceRange}
                            </span>
                          </div>
                        )}
                      </div>

                      {activity.url && (
                        <a
                          href={activity.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-paragraph text-sm text-primary hover:underline"
                        >
                          <span>Learn more</span>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                Activity recommendations coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
