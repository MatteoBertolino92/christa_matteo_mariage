/*import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { EventSchedule } from '@/entities';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function EventDetailsSection() {
  const [events, setEvents] = useState<EventSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const result = await BaseCrudService.getAll<EventSchedule>('eventschedule');
      setEvents(result.items);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatEventDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'EEEE, MMMM d, yyyy');
  };

  const formatEventTime = (time: any) => {
    if (!time) return '';
    return time;
  };

  return (
    <section id="event-details" className="py-24 lg:py-32 bg-background">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-6xl text-primary mb-6">
            Event Schedule
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl mx-auto">
            Join us for a weekend of celebration in the beautiful Langhe region. Here are the key moments we'll share together.
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? null : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-secondary p-8 border-2 border-primary/20 hover:border-primary transition-colors"
                >
                  <div className="mb-6">
                    <h3 className="font-heading text-2xl text-primary mb-4">
                      {event.eventName}
                    </h3>
                    <div className="space-y-3">
                      {event.eventDate && (
                        <div className="flex items-start gap-3">
                          <Calendar size={20} className="text-primary mt-1 flex-shrink-0" />
                          <span className="font-paragraph text-base text-secondary-foreground">
                            {formatEventDate(event.eventDate)}
                          </span>
                        </div>
                      )}
                      {event.eventTime && (
                        <div className="flex items-start gap-3">
                          <Clock size={20} className="text-primary mt-1 flex-shrink-0" />
                          <span className="font-paragraph text-base text-secondary-foreground">
                            {formatEventTime(event.eventTime)}
                          </span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-start gap-3">
                          <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                          <span className="font-paragraph text-base text-secondary-foreground">
                            {event.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {event.description && (
                    <p className="font-paragraph text-sm text-secondary-foreground/80 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                Event schedule coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}*/
