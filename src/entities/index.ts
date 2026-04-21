/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: activities
 * Interface for LocalActivities
 */
export interface LocalActivities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  activityName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  activityImage?: string;
  /** @wixFieldType url */
  url?: string;
  /** @wixFieldType text */
  priceRange?: string;
}


/**
 * Collection ID: eventschedule
 * Interface for EventSchedule
 */
export interface EventSchedule {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  eventTime?: any;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: gifts
 * Interface for GiftRegistry
 */
export interface GiftRegistry {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  giftName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  giftLink?: string;
  /** @wixFieldType text */
  contributionInstructions?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  giftImage?: string;
  /** @wixFieldType boolean */
  isPurchased?: boolean;
}


/**
 * Collection ID: hotels
 * Interface for RecommendedHotels
 */
export interface RecommendedHotels {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  hotelName?: string;
  /** @wixFieldType text */
  priceRange?: string;
  /** @wixFieldType text */
  distanceToVenue?: string;
  /** @wixFieldType url */
  bookingLink?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  hotelImage?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: travelroutes
 * Interface for TravelRoutes
 */
export interface TravelRoutes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  originCity?: string;
  /** @wixFieldType text */
  travelInstructions?: string;
  /** @wixFieldType text */
  transportMode?: string;
  /** @wixFieldType text */
  estimatedDuration?: string;
  /** @wixFieldType url */
  bookingLink?: string;
}
