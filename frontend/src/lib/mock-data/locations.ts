import type { Location, WorkplaceType, Equipment } from '@/types/location';

// Mock location data for all 8 INNOQ locations
// Based on real INNOQ office locations with realistic data

export const mockLocations: Location[] = [
  {
    id: 'monheim',
    name: 'Monheim',
    description: 'Hauptsitz von INNOQ mit modernen Arbeitsplätzen und Konferenzräumen',
    address: {
      street: 'Krischerstr. 100',
      city: 'Monheim am Rhein',
      postalCode: '40789',
      country: 'Deutschland'
    },
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-18:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 45,
    workplaceTypes: ['desk', 'focus_pod', 'phone_booth', 'lounge', 'meeting_room', 'conference_room'],
    equipment: ['monitor', 'docking_station', 'height_adjustable', 'ergonomic_chair', 'whiteboard', 'beamer', 'video_conference', 'quiet_environment', 'natural_light', 'coffee_nearby'],
    photos: [
      '/images/locations/monheim-office.jpg',
      '/images/locations/monheim-meeting.jpg',
      '/images/locations/monheim-lounge.jpg'
    ],
    parkingInfo: {
      available: true,
      capacity: 25,
      costs: 'Kostenlos für Mitarbeiter',
      restrictions: ['Nur für INNOQ Mitarbeiter', 'Maximal 10 Stunden']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'bus',
          line: '788',
          stop: 'Monheim Busbahnhof',
          walkingMinutes: 8
        },
        {
          type: 'train',
          line: 'S1',
          stop: 'Langenfeld (Rheinland)',
          walkingMinutes: 15
        }
      ],
      walkingDistance: 800,
      bikeParking: true
    },
    highlights: ['Hauptsitz', 'Vollausstattung', 'Große Konferenzräume'],
    availability: [
      {
        date: '2024-07-15',
        timeSlot: '09:00-18:00',
        available: true,
        workplaceType: 'desk',
        resourceId: 'monheim-desk-1'
      }
    ],
    isFavorite: true,
    type: 'headquarters'
  },
  {
    id: 'koeln',
    name: 'Köln',
    description: 'Zentral gelegenes Büro in der Kölner Innenstadt',
    address: {
      street: 'Spichernstraße 44',
      city: 'Köln',
      postalCode: '50672',
      country: 'Deutschland'
    },
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-17:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 32,
    workplaceTypes: ['desk', 'focus_pod', 'meeting_room'],
    equipment: ['monitor', 'docking_station', 'height_adjustable', 'whiteboard', 'video_conference', 'quiet_environment', 'coffee_nearby'],
    photos: [
      '/images/locations/koeln-office.jpg',
      '/images/locations/koeln-focus.jpg'
    ],
    parkingInfo: {
      available: true,
      capacity: 8,
      costs: '15€ pro Tag',
      restrictions: ['Voranmeldung erforderlich', 'Begrenzte Plätze']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'subway',
          line: 'U1, U7, U12, U15',
          stop: 'Appellhofplatz',
          walkingMinutes: 3
        },
        {
          type: 'tram',
          line: '1, 7, 9',
          stop: 'Appellhofplatz',
          walkingMinutes: 3
        }
      ],
      walkingDistance: 200,
      bikeParking: true
    },
    highlights: ['Zentrale Lage', 'ÖPNV-Anbindung', 'Altstadt-Nähe'],
    availability: [],
    isFavorite: false,
    rooms: [
      {
        id: 'koeln-empfang',
        name: 'Empfang',
        workplaces: 4,
        additionalSeats: 2,
        equipment: ['Drucker', '2er Sofa'],
        notes: 'Wartebereich'
      },
      {
        id: 'koeln-konferenzraum',
        name: 'Konferenzraum',
        workplaces: 0,
        additionalSeats: 12,
        equipment: ['85" Fernseher', 'Apple TV', 'Logitech Rally Bar', 'Zoom Room', 'Flipchart', '2x Whiteboards'],
        notes: 'Mobile Bestuhlung: 6 Tische und 12 Stühle'
      },
      {
        id: 'koeln-event-raum',
        name: 'Event-Raum',
        workplaces: 4,
        additionalSeats: 5,
        equipment: ['Beamer', 'Apple TV', 'Mobile Schreibtische'],
        notes: '2er und 3er Sofa vor dem Beamer'
      },
      {
        id: 'koeln-terrassenzugang',
        name: 'Terrassenzugang',
        workplaces: 2,
        additionalSeats: 2,
        equipment: ['4er Besprechungstisch', '2er Stehtisch', 'Whiteboard']
      },
      {
        id: 'koeln-terrasse',
        name: 'Terrasse',
        workplaces: 0,
        additionalSeats: 14,
        equipment: ['2 Tische', 'Gasgrill'],
        notes: 'Außenbereich'
      }
    ],
    restaurants: [
      {
        name: 'Meson El Cordobes',
        cuisine: 'Spanisch/Tapas',
        distance: 'Nebenan',
        priceRange: '€€',
        notes: 'Unmittelbar nebenan'
      },
      {
        name: 'Kitchenette',
        cuisine: 'Warme Küche & Salate',
        distance: 'Nebenan',
        priceRange: '€€'
      },
      {
        name: 'Anya Imbiss',
        cuisine: 'Irakisch',
        distance: '5 min',
        priceRange: '€',
        notes: 'Kurzer Spaziergang'
      }
    ],
    hotels: [
      {
        name: 'Motel One Köln-Mediapark',
        distance: '10 min',
        priceRange: '€€',
        features: ['Große Parkgarage']
      },
      {
        name: 'NH Collection Köln Mediapark',
        distance: '10 min',
        priceRange: '€€€',
        features: ['Parkgarage', 'Bar']
      },
      {
        name: '25hours Hotel The Circle',
        distance: '15 min',
        priceRange: '€€€',
        features: ['Dachterassenbar', 'Restaurant', 'Meetingräume']
      },
      {
        name: 'Ruby Ella',
        distance: '12 min',
        priceRange: '€€'
      }
    ],
    type: 'subsidiary'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    description: 'Modernes Büro im Herzen Berlins mit Startup-Atmosphäre',
    address: {
      street: 'Ohlauer Str. 43',
      city: 'Berlin',
      postalCode: '10999',
      country: 'Deutschland'
    },
    openingHours: {
      monday: '08:00-19:00',
      tuesday: '08:00-19:00',
      wednesday: '08:00-19:00',
      thursday: '08:00-19:00',
      friday: '08:00-17:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 28,
    workplaceTypes: ['desk', 'focus_pod', 'lounge', 'meeting_room'],
    equipment: ['monitor', 'docking_station', 'ergonomic_chair', 'whiteboard', 'beamer', 'video_conference', 'natural_light', 'coffee_nearby'],
    photos: [
      '/images/locations/berlin-office.jpg',
      '/images/locations/berlin-lounge.jpg'
    ],
    parkingInfo: {
      available: false,
      capacity: 0,
      costs: 'Nicht verfügbar',
      restrictions: ['Keine Parkplätze vorhanden']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'subway',
          line: 'U6',
          stop: 'Französische Straße',
          walkingMinutes: 5
        },
        {
          type: 'bus',
          line: 'TXL, 100, 200',
          stop: 'Unter den Linden/Friedrichstraße',
          walkingMinutes: 2
        }
      ],
      walkingDistance: 150,
      bikeParking: true
    },
    highlights: ['Startup-Atmosphäre', 'Brandenburger Tor Nähe', 'Zentral'],
    availability: [],
    isFavorite: false,
    type: 'subsidiary'
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    description: 'Büro in der Hafenstadt mit maritimem Flair',
    address: {
      street: 'Wendenstraße 130',
      city: 'Hamburg',
      postalCode: '20537',
      country: 'Deutschland'
    },
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-17:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 22,
    workplaceTypes: ['desk', 'meeting_room', 'lounge'],
    equipment: ['monitor', 'docking_station', 'height_adjustable', 'whiteboard', 'video_conference', 'quiet_environment', 'coffee_nearby'],
    photos: [
      '/images/locations/hamburg-office.jpg',
      '/images/locations/hamburg-meeting.jpg'
    ],
    parkingInfo: {
      available: true,
      capacity: 5,
      costs: '20€ pro Tag',
      restrictions: ['Voranmeldung erforderlich', 'Sehr begrenzt']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'subway',
          line: 'U2',
          stop: 'Gänsemarkt',
          walkingMinutes: 4
        },
        {
          type: 'bus',
          line: '4, 5, 109',
          stop: 'Gänsemarkt',
          walkingMinutes: 4
        }
      ],
      walkingDistance: 300,
      bikeParking: false
    },
    highlights: ['Maritimes Flair', 'Innenstadt', 'Kompakt'],
    availability: [],
    isFavorite: false,
    type: 'subsidiary'
  },
  {
    id: 'muenchen',
    name: 'München',
    description: 'Bayerisches Büro mit Alpenblick und modernen Arbeitsplätzen',
    address: {
      street: 'Kreuzstr. 16',
      city: 'München',
      postalCode: '80331',
      country: 'Deutschland'
    },
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-17:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 18,
    workplaceTypes: ['desk', 'focus_pod', 'meeting_room'],
    equipment: ['monitor', 'docking_station', 'ergonomic_chair', 'whiteboard', 'beamer', 'video_conference', 'natural_light', 'coffee_nearby'],
    photos: [
      '/images/locations/muenchen-office.jpg',
      '/images/locations/muenchen-focus.jpg'
    ],
    parkingInfo: {
      available: true,
      capacity: 6,
      costs: '25€ pro Tag',
      restrictions: ['Voranmeldung notwendig', 'Zentrale Lage']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'subway',
          line: 'U3, U6',
          stop: 'Lehel',
          walkingMinutes: 6
        },
        {
          type: 'tram',
          line: '19',
          stop: 'Nationaltheater',
          walkingMinutes: 5
        }
      ],
      walkingDistance: 400,
      bikeParking: true
    },
    highlights: ['Alpenblick', 'Maximilianstraße', 'Elegant'],
    availability: [],
    isFavorite: false,
    type: 'subsidiary'
  },
  {
    id: 'zuerich',
    name: 'Zürich',
    description: 'Schweizer Standort mit Blick auf die Alpen',
    address: {
      street: 'Hardturmstrasse 253',
      city: 'Zürich',
      postalCode: '8005',
      country: 'Schweiz'
    },
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-17:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 15,
    workplaceTypes: ['desk', 'meeting_room'],
    equipment: ['monitor', 'docking_station', 'height_adjustable', 'whiteboard', 'video_conference', 'natural_light'],
    photos: [
      '/images/locations/zuerich-office.jpg',
      '/images/locations/zuerich-view.jpg'
    ],
    parkingInfo: {
      available: false,
      capacity: 0,
      costs: 'Nicht verfügbar',
      restrictions: ['Keine Parkplätze', 'ÖPNV empfohlen']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'train',
          line: 'S-Bahn',
          stop: 'Zürich HB',
          walkingMinutes: 3
        },
        {
          type: 'tram',
          line: '6, 7, 13',
          stop: 'Bahnhofstraße',
          walkingMinutes: 1
        }
      ],
      walkingDistance: 100,
      bikeParking: true
    },
    highlights: ['Alpenblick', 'Hauptbahnhof-Nähe', 'International'],
    availability: [],
    isFavorite: false,
    type: 'subsidiary'
  },
  {
    id: 'baar',
    name: 'Baar',
    description: 'Schweizer Standort mit Fokus auf konzentriertes Arbeiten',
    address: {
      street: 'Schutzengelstr. 57',
      city: 'Baar',
      postalCode: '6340',
      country: 'Schweiz'
    },
    openingHours: {
      monday: '08:00-17:00',
      tuesday: '08:00-17:00',
      wednesday: '08:00-17:00',
      thursday: '08:00-17:00',
      friday: '08:00-16:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 12,
    workplaceTypes: ['desk', 'focus_pod'],
    equipment: ['monitor', 'docking_station', 'height_adjustable', 'quiet_environment', 'natural_light'],
    photos: [
      '/images/locations/cham-office.jpg',
      '/images/locations/cham-focus.jpg'
    ],
    parkingInfo: {
      available: true,
      capacity: 15,
      costs: 'Kostenlos',
      restrictions: ['Genügend Plätze vorhanden']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'bus',
          line: '6047',
          stop: 'Cham Busbahnhof',
          walkingMinutes: 10
        }
      ],
      walkingDistance: 800,
      bikeParking: true
    },
    highlights: ['Schweiz', 'Konzentriertes Arbeiten', 'Ruhige Lage'],
    availability: [],
    isFavorite: false,
    type: 'headquarters'
  },
  {
    id: 'offenbach',
    name: 'Offenbach',
    description: 'Standort im Rhein-Main-Gebiet mit guter Verkehrsanbindung',
    address: {
      street: 'Ludwigstr. 180 E',
      city: 'Offenbach am Main',
      postalCode: '63067',
      country: 'Deutschland'
    },
    openingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-17:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
      holidays: 'Geschlossen'
    },
    capacity: 20,
    workplaceTypes: ['desk', 'meeting_room', 'lounge'],
    equipment: ['monitor', 'docking_station', 'ergonomic_chair', 'whiteboard', 'video_conference', 'coffee_nearby'],
    photos: [
      '/images/locations/offenbach-office.jpg',
      '/images/locations/offenbach-meeting.jpg'
    ],
    parkingInfo: {
      available: true,
      capacity: 12,
      costs: '5€ pro Tag',
      restrictions: ['Günstige Preise', 'Gute Verfügbarkeit']
    },
    transportInfo: {
      publicTransport: [
        {
          type: 'subway',
          line: 'S1, S2, S8, S9',
          stop: 'Offenbach Ost',
          walkingMinutes: 7
        },
        {
          type: 'bus',
          line: 'OF-30',
          stop: 'Kaiserlei',
          walkingMinutes: 3
        }
      ],
      walkingDistance: 500,
      bikeParking: true
    },
    highlights: ['Rhein-Main-Gebiet', 'S-Bahn Anbindung', 'Günstige Parkplätze'],
    availability: [],
    isFavorite: false,
    type: 'subsidiary'
  }
];

// Helper functions for working with location mock data
export const getLocationById = (id: string): Location | undefined => {
  return mockLocations.find(location => location.id === id);
};

export const getLocationsByCity = (city: string): Location[] => {
  return mockLocations.filter(location => 
    location.address.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getFavoriteLocations = (): Location[] => {
  return mockLocations.filter(location => location.isFavorite === true);
};

export const getLocationsByWorkplaceType = (workplaceType: WorkplaceType): Location[] => {
  return mockLocations.filter(location => 
    location.workplaceTypes.includes(workplaceType)
  );
};

export const getLocationsByEquipment = (equipment: Equipment): Location[] => {
  return mockLocations.filter(location => 
    location.equipment.includes(equipment)
  );
};

export const getLocationsWithParking = (): Location[] => {
  return mockLocations.filter(location => location.parkingInfo.available);
};

// Simulate API delay for realistic prototype behavior
export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const fetchLocations = async (): Promise<Location[]> => {
  await delay(800); // Simulate API call
  return [...mockLocations];
};

export const fetchLocationById = async (id: string): Promise<Location | null> => {
  await delay(300);
  return getLocationById(id) || null;
};

export const searchLocations = async (query: string): Promise<Location[]> => {
  await delay(500);
  const lowerQuery = query.toLowerCase();
  return mockLocations.filter(location => 
    location.name.toLowerCase().includes(lowerQuery) ||
    location.address.city.toLowerCase().includes(lowerQuery) ||
    location.description?.toLowerCase().includes(lowerQuery)
  );
};