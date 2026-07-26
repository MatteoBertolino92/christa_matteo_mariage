import Footer from '@/components/Footer';
import Header from '@/components/Header';
import OpeningLetter from '@/components/OpeningLetter';
import RSVPSection from '@/components/RSVPSection';
import { Image } from '@/components/ui/image';
import { getTranslation } from '@/lib/i18n';
import { useLanguageStore } from '@/lib/languageStore';
import { motion, useInView } from 'framer-motion';
import { Calendar, Car, Clock, ExternalLink, Gift, MapPin, Plane } from 'lucide-react';
import { useEffect, useRef } from 'react';

// --- CANONICAL DATA TYPES (From src/entities/index.ts) ---
interface LocalActivities {
  _id: string;
  activityName?: string;
  description?: string;
  location?: string;
  activityImage?: string;
  url?: string;
  priceRange?: string;
}

interface EventSchedule {
  _id: string;
  eventName?: string;
  eventDate?: Date | string;
  eventTime?: any;
  location?: string;
  description?: string;
}

interface GiftRegistry {
  _id: string;
  giftName?: string;
  description?: string;
  giftLink?: string;
  contributionInstructions?: string;
  giftImage?: string;
  isPurchased?: boolean;
}

interface RecommendedHotels {
  _id: string;
  hotelName?: string;
  priceRange?: string;
  distanceToVenue?: string;
  bookingLink?: string;
  hotelImage?: string;
  description?: string;
}

interface TravelRoutes {
  _id: string;
  originCity?: string;
  travelInstructions?: string;
  transportMode?: string;
  estimatedDuration?: string;
  bookingLink?: string;
}

// --- CANONICAL DATA SOURCES ---
const eventScheduleData: EventSchedule[] = [
  {
    _id: 'evt-1',
    eventName: 'Welcome Aperitivo',
    eventDate: 'Friday, September 13th',
    eventTime: '18:00',
    location: 'Cantina Comunale di La Morra',
    description: 'Join us as we kick off the weekend with local wines, truffles, and breathtaking views of the Langhe hills. Casual attire.'
  },
  {
    _id: 'evt-2',
    eventName: 'The Ceremony',
    eventDate: 'Saturday, September 14th',
    eventTime: '15:30',
    location: 'Castello di Grinzane Cavour',
    description: 'We exchange our vows in the historic courtyard. Please arrive 30 minutes early. Formal attire requested.'
  },
  {
    _id: 'evt-3',
    eventName: 'Reception & Celebration',
    eventDate: 'Saturday, September 14th',
    eventTime: '18:00',
    location: 'Tenuta Fontanafredda',
    description: 'Dinner, dancing, and endless Barolo late into the night. Bring your dancing shoes.'
  },
  {
    _id: 'evt-4',
    eventName: 'Farewell Brunch',
    eventDate: 'Sunday, September 15th',
    eventTime: '11:00',
    location: 'Relais San Maurizio',
    description: 'A relaxed morning to recover and say our goodbyes before you head home or continue your Italian adventure.'
  }
];

const travelRoutesData: TravelRoutes[] = [
  {
    _id: 'trv-1',
    originCity: 'Paris',
    transportMode: 'Flight + Car',
    estimatedDuration: '4.5 Hours',
    travelInstructions: 'Fly direct from CDG or ORY to Turin (TRN). From Turin airport, rent a car and drive south on the A6/A33 directly into the Langhe region (approx. 1.5 hours drive).'
  },
  {
    _id: 'trv-2',
    originCity: 'Bangui',
    transportMode: 'Flight + Train/Car',
    estimatedDuration: '14+ Hours',
    travelInstructions: 'Fly from BGF to Milan Malpensa (MXP) via Paris or Addis Ababa. From Milan, you can rent a car (2.5 hours drive) or take the high-speed train to Turin, then a regional train to Alba.'
  },
  {
    _id: 'trv-3',
    originCity: 'Savona',
    transportMode: 'Car',
    estimatedDuration: '1.5 Hours',
    travelInstructions: 'The most scenic route. Drive north on the A6 motorway towards Torino, take the exit for Marene, and follow signs for Alba/Barolo. A beautiful drive through the hills.'
  }
];

const recommendedHotelsData: RecommendedHotels[] = [
  {
    _id: 'htl-1',
    hotelName: 'Casa di Langa',
    priceRange: '$$$$',
    distanceToVenue: '15 mins drive',
    description: 'A stunning sustainable luxury resort nestled in the vineyards. We have a small block of rooms reserved here under our names.',
    hotelImage: 'https://static.wixstatic.com/media/71f2f6_e4a20df274224d0384e31f437b18243c~mv2.png?originWidth=576&originHeight=384'
  },
  {
    _id: 'htl-2',
    hotelName: 'Albergo dell\'Agenzia',
    priceRange: '$$$',
    distanceToVenue: '20 mins drive',
    description: 'Located in Pollenzo, this historic neo-Gothic complex offers beautiful grounds, a pool, and is home to the University of Gastronomic Sciences.',
    hotelImage: 'https://static.wixstatic.com/media/71f2f6_f5daaccc039e4526a70d1cd16395b223~mv2.png?originWidth=576&originHeight=384'
  },
  {
    _id: 'htl-3',
    hotelName: 'Uve Rooms & Wine Bar',
    priceRange: '$$',
    distanceToVenue: '10 mins drive',
    description: 'A boutique, modern option right in the heart of La Morra. Perfect for those who want to be walking distance to local enotecas.',
    hotelImage: 'https://static.wixstatic.com/media/71f2f6_3c808119b8804ea7ae71a04e12d107cd~mv2.png?originWidth=576&originHeight=384'
  }
];

const localActivitiesData: LocalActivities[] = [
  {
    _id: 'act-1',
    activityName: 'Barolo Wine Tasting',
    location: 'Various Cantinas',
    description: 'You cannot visit Langhe without tasting the "King of Wines". We recommend booking tastings at Marchesi di Barolo or Ceretto in advance.',
    activityImage: 'https://static.wixstatic.com/media/71f2f6_0c58de260d1c4162a2e1cc2bdb70a6a0~mv2.png?originWidth=1152&originHeight=640'
  },
  {
    _id: 'act-2',
    activityName: 'Truffle Hunting Experience',
    location: 'Alba Woods',
    description: 'Join a local "Trifolau" and his trained dog for a walk through the woods to hunt for the famous white truffle of Alba.',
    activityImage: 'https://static.wixstatic.com/media/71f2f6_eb397476825546859f0f3d22aba66c2a~mv2.png?originWidth=1152&originHeight=640'
  },
  {
    _id: 'act-3',
    activityName: 'E-Bike Vineyard Tour',
    location: 'La Morra / Barbaresco',
    description: 'Rent an e-bike and cycle through the UNESCO World Heritage landscapes. It is the best way to see the rolling hills and hidden castles.',
    activityImage: 'https://static.wixstatic.com/media/71f2f6_53ca94954c494ce78a7f13a41f920da9~mv2.png?originWidth=1152&originHeight=640'
  }
];

const giftRegistryData: GiftRegistry[] = [
  {
    _id: 'gft-1',
    giftName: 'Our Japanese Honeymoon',
    description: 'Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a contribution towards our dream honeymoon in Japan would be warmly appreciated.',
    contributionInstructions: 'Contributions can be made securely via the link below, or a wishing well will be available at the reception.',
    giftImage: 'https://static.wixstatic.com/media/71f2f6_b0a041f668274e33a96d2407f452b5b5~mv2.png?originWidth=1152&originHeight=768'
  }
];

// --- COMPONENTS ---

/*const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const { language } = useLanguageStore();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-secondary-foreground" id="home">
      {// Parallax Background
      }
      <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="https://static.wixstatic.com/media/71f2f6_64dd71f49e6e432292f224dbdd3bb476~mv2.png?originWidth=1600&originHeight=896"
          alt="Moody Langhe Landscape"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </motion.div>

      {// Main Typography - Left Aligned
      }
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center z-10"
      >
        <div className="max-w-4xl">
          <p className="text-primary-foreground/80 font-paragraph tracking-[0.2em] uppercase text-sm mb-6 ml-1">
            September 14, 2024 • Langhe, Piemonte
          </p>
          <h1 className="text-primary-foreground font-heading text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tight">
            Christa <br />
            <span className="italic font-light text-primary/90">&</span> Matteo
          </h1>
        </div>
      </motion.div>

      {// The Overlapping Introduction Block (Inspired by the image)
      }
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-full md:w-[600px] lg:w-[700px] bg-primary p-10 md:p-16 lg:p-20 z-20"
      >
        <a href="#schedule" className="inline-flex items-center gap-3 text-primary-foreground font-paragraph uppercase tracking-widest text-sm border-b border-primary-foreground/30 pb-1 hover:border-primary-foreground transition-colors">
          {getTranslation('viewSchedule', language)} <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
};*/

const TheCoupleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguageStore();

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background" id="couple">
      <div className="max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="order-2 lg:order-1" ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <span className="text-primary font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block">
                01 // {getTranslation('theCouple', language)}
              </span>
              <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-8 leading-tight">
                {getTranslation('twoWorlds', language)}
              </h2>
              <p className="font-paragraph text-secondary-foreground/80 text-lg leading-relaxed mb-6">
                {getTranslation('coupleDescription', language)}
              </p>
              <p className="font-paragraph text-secondary-foreground/80 text-lg leading-relaxed">
                {getTranslation('coupleDescription2', language)}
              </p>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 relative h-[60vh] lg:h-[80vh] w-full">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* ... keep existing code (image and decorative frame) ... */}
              <Image
                src="/mariage_3.jpg"
                alt="Christa and Matteo"
                className="w-full h-full object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-primary/20 -z-10 hidden md:block" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScheduleSection = () => {
  const { language } = useLanguageStore();

  // Map event names to translation keys for event-specific data
  const getEventTranslations = (eventName: string) => {
    const eventMap: { [key: string]: { title: string; description: string; date: string; location: string, map?: string } } = {
      'Welcome Aperitivo': {
        title: 'welcomeAperitivo',
        description: 'welcomeDescription',
        date: 'welcomeAperitivo_date',
        location: 'welcomeAperitivo_location'
      },
      'The Ceremony': {
        title: 'theCeremony',
        description: 'ceremonyDescription',
        date: 'theCeremony_date',
        location: 'theCeremony_location',
        map: 'https://share.google/o3kCWzLvHP5WtsphQ'
      },
      'Reception & Celebration': {
        title: 'receptionCelebration',
        description: 'receptionDescription',
        date: 'receptionCelebration_date',
        location: 'receptionCelebration_location'
      },
      'Farewell Brunch': {
        title: 'farewellBrunch',
        description: 'brunchDescription',
        date: 'farewellBrunch_date',
        location: 'farewellBrunch_location'
      }
    };
    return eventMap[eventName];
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary-foreground text-secondary" id="schedule">
      <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">

        {/* Sticky Left Column */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <span className="text-primary font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block">
              02 // {getTranslation('theItinerary', language)}
            </span>
            <h2 className="font-heading text-5xl md:text-7xl mb-8 leading-tight text-secondary">
              {getTranslation('weekendSchedule', language)}
            </h2>
            <p className="font-paragraph text-secondary/70 text-lg">
              {getTranslation('scheduleDescription', language)}
            </p>
          </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="lg:w-2/3 flex flex-col">
          {eventScheduleData.map((event, index) => {
            const translations = getEventTranslations(event.eventName || '');
            return (
              <div key={event._id} className="group relative border-t border-secondary/20 py-12 first:pt-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Calendar size={16} />
                      <span className="font-paragraph text-sm font-bold">
                        {translations ? getTranslation(translations.date as keyof typeof translations, language) : event.eventDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary/60">
                      <Clock size={16} />
                      <span className="font-paragraph text-sm">{event.eventTime}</span>
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <h3 className="font-heading text-3xl md:text-4xl mb-4 text-secondary group-hover:text-primary transition-colors">
                      {translations ? getTranslation(translations.title as keyof typeof translations, language) : event.eventName}
                    </h3>

                    <p className="font-paragraph text-secondary/60 leading-relaxed">
                      {translations ? getTranslation(translations.description as keyof typeof translations, language) : event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

const TravelSection = () => {
  const { language } = useLanguageStore();

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background" id="travel">
      <div className="max-w-[120rem] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-primary font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block">
            03 // {getTranslation('gettingHere', language)}
          </span>
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-8">
            {getTranslation('allRoadsLeadToLanghe', language)}
          </h2>
          <p className="font-paragraph text-secondary-foreground/80 text-lg">
            {getTranslation('travelDescription', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {travelRoutesData.map((route) => (
            <div key={route._id} className="border border-primary/10 p-10 hover:border-primary/30 transition-colors bg-white">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-heading text-3xl text-foreground">{route.originCity}</h3>
                {route.transportMode?.includes('Flight') ? <Plane className="text-primary" size={28} /> : <Car className="text-primary" size={28} />}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="font-paragraph text-sm text-secondary-foreground/60 uppercase tracking-wider">{getTranslation('mode', language)}</span>
                  <span className="font-paragraph text-sm font-bold text-foreground">{route.transportMode}</span>
                </div>
                <div className="flex justify-between border-b border-primary/10 pb-2">
                  <span className="font-paragraph text-sm text-secondary-foreground/60 uppercase tracking-wider">{getTranslation('duration', language)}</span>
                  <span className="font-paragraph text-sm font-bold text-foreground">{route.estimatedDuration}</span>
                </div>
              </div>

              <p className="font-paragraph text-secondary-foreground/80 leading-relaxed">
                {route.travelInstructions}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HotelsSection = () => {
  const { language } = useLanguageStore();

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#F0EBE1]" id="hotels">
      <div className="max-w-[120rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-primary font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block">
              04 // {getTranslation('accommodation', language)}
            </span>
            <h2 className="font-heading text-5xl md:text-7xl text-foreground">
              {getTranslation('whereToStay', language)}
            </h2>
          </div>
          <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-md">
            {getTranslation('hotelDescription', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {recommendedHotelsData.map((hotel) => (
            <div key={hotel._id} className="group cursor-pointer">
              <div className="relative h-[400px] w-full mb-6 overflow-hidden">
                <Image
                  src={hotel.hotelImage || "https://static.wixstatic.com/media/71f2f6_89dcfe24a9f648fd8151051a9c3cc865~mv2.png?originWidth=576&originHeight=384"}
                  alt={hotel.hotelName || "Hotel"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 font-paragraph text-xs font-bold tracking-widest text-foreground">
                  {hotel.priceRange}
                </div>
              </div>
              <h3 className="font-heading text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {hotel.hotelName}
              </h3>
              <div className="flex items-center gap-2 text-primary mb-4">
                <MapPin size={14} />
                <span className="font-paragraph text-sm font-bold">{hotel.distanceToVenue}</span>
              </div>
              <p className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                {hotel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ActivitiesSection = () => {
  const { language } = useLanguageStore();

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background" id="activities">
      <div className="max-w-[120rem] mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block">
            05 // {getTranslation('explore', language)}
          </span>
          <h2 className="font-heading text-5xl md:text-7xl text-foreground">
            {getTranslation('discoverLanghe', language)}
          </h2>
        </div>

        <div className="space-y-32">
          {localActivitiesData.map((activity, index) => (
            <div key={activity._id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] relative">
                <Image
                  src={activity.activityImage || "https://static.wixstatic.com/media/71f2f6_83c532564532465686a61293445c5e56~mv2.png?originWidth=1152&originHeight=640"}
                  alt={activity.activityName || "Activity"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2 lg:px-12">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <MapPin size={18} />
                  <span className="font-paragraph text-sm font-bold tracking-widest uppercase">{activity.location}</span>
                </div>
                <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
                  {activity.activityName}
                </h3>
                <p className="font-paragraph text-secondary-foreground/80 text-lg leading-relaxed mb-8">
                  {activity.description}
                </p>
                <button className="font-paragraph text-sm font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
                  {getTranslation('learnMore', language)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GiftRegistrySection = () => {
  const gift = giftRegistryData[0]; // Assuming one main registry entry for this design
  const { language } = useLanguageStore();

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-primary text-primary-foreground relative overflow-hidden" id="registry">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <Image
            src="https://static.wixstatic.com/media/71f2f6_78e2bc1f8b7e410b9377b3ac408a3e0a~mv2.png?originWidth=1152&originHeight=768"
            alt="Texture"
            className="w-full h-full object-cover mix-blend-overlay"
          />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Gift size={48} className="mx-auto mb-8 opacity-80" />
        <span className="font-paragraph tracking-[0.2em] uppercase text-xs font-bold mb-6 block opacity-80">
          06 // {getTranslation('registry', language)}
        </span>
        <h2 className="font-heading text-5xl md:text-7xl mb-8">
          {getTranslation('honeymoon', language)}
        </h2>
        <p className="font-paragraph text-lg md:text-xl leading-relaxed mb-12 opacity-90">
          {getTranslation('honeymoonDescription', language)}
        </p>

        <div className="bg-primary-foreground/10 p-8 md:p-12 backdrop-blur-sm border border-primary-foreground/20">
          <p className="font-paragraph mb-8 opacity-90">
            {getTranslation('contributionInstructions', language)}
          </p>
          <button className="bg-primary-foreground text-primary px-8 py-4 font-paragraph text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors inline-flex items-center gap-2">
            {getTranslation('contributeHere', language)} <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const { initializeFromGeolocation } = useLanguageStore();

  useEffect(() => {
    // Initialize language based on geolocation on component mount
    initializeFromGeolocation();
  }, [initializeFromGeolocation]);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main>
        <OpeningLetter />
        <TheCoupleSection />
        <ScheduleSection />
        <TravelSection />
        <HotelsSection />
        <ActivitiesSection />
        <RSVPSection />
        <GiftRegistrySection />
      </main>
      <Footer />
    </div>
  );
}
