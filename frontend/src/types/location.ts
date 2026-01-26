// Location Types for Calvin Prototype
// Based on AR004-AR005 planning document and INNOQ requirements

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ParkingInfo {
  available: boolean;
  capacity: number;
  costs: string;
  restrictions: string[];
}

export interface PublicTransportInfo {
  type: 'bus' | 'train' | 'tram' | 'subway';
  line: string;
  stop: string;
  walkingMinutes: number;
}

export interface TransportInfo {
  publicTransport: PublicTransportInfo[];
  walkingDistance: number; // in meters
  bikeParking: boolean;
}

export interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  holidays: string;
}

export type WorkplaceType = 
  | 'desk' 
  | 'focus_pod' 
  | 'phone_booth' 
  | 'lounge' 
  | 'meeting_room'
  | 'conference_room';

export type Equipment = 
  | 'monitor' 
  | 'docking_station' 
  | 'height_adjustable' 
  | 'ergonomic_chair'
  | 'whiteboard'
  | 'beamer'
  | 'video_conference'
  | 'quiet_environment'
  | 'natural_light'
  | 'coffee_nearby';

export interface AvailabilitySlot {
  date: string; // ISO date string
  timeSlot: string; // e.g., "09:00-10:00"
  available: boolean;
  workplaceType: WorkplaceType;
  resourceId: string;
}

export interface Room {
  id: string;
  name: string;
  workplaces: number;
  additionalSeats?: number;
  equipment: string[];
  notes?: string;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  distance: string;
  priceRange: '€' | '€€' | '€€€';
  notes?: string;
}

export interface Hotel {
  name: string;
  distance: string;
  priceRange: '€' | '€€' | '€€€';
  features?: string[];
  notes?: string;
}

export interface Location {
  id: string;
  name: string;
  address: Address;
  openingHours: OpeningHours;
  capacity: number;
  workplaceTypes: WorkplaceType[];
  equipment: Equipment[];
  photos: string[];
  parkingInfo: ParkingInfo;
  transportInfo: TransportInfo;
  availability: AvailabilitySlot[];
  isFavorite?: boolean;
  description?: string;
  highlights?: string[];
  rooms?: Room[];
  restaurants?: Restaurant[];
  hotels?: Hotel[];
  type?: 'headquarters' | 'subsidiary';
}

// Location context state
export interface LocationContextState {
  locations: Location[];
  favorites: string[]; // location IDs
  filters: LocationFilters;
  loading: boolean;
  error: string | null;
  toggleFavorite: (locationId: string) => void;
  updateFilters: (filters: Partial<LocationFilters>) => void;
  clearFilters: () => void;
  loadLocations: () => Promise<void>;
}

// Filter types for location search
export interface LocationFilters {
  workplaceTypes: WorkplaceType[];
  equipment: Equipment[];
  cities: string[];
  availableOnly: boolean;
  favoritesOnly: boolean;
  hasParking: boolean;
}

// Location search and display types
export type LocationSortBy = 'name' | 'city' | 'capacity' | 'favorites';
export type LocationViewMode = 'list' | 'grid' | 'map';

export interface LocationSearchParams {
  query?: string;
  filters: LocationFilters;
  sortBy: LocationSortBy;
  viewMode: LocationViewMode;
}