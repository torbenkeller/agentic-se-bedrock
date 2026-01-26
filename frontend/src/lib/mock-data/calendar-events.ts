import type { MockCalendarEvent } from '@/types/calendar';

// Mock Calendar Events for Sandra Weber's typical work week
// Week of July 15-19, 2024 (Monday to Friday)
// Based on her persona as Principal Consultant and user journey

// Additional July/August 2025 events for calendar highlights
export const mockCalendarHighlights: MockCalendarEvent[] = [
  // July 2025 highlights
  {
    id: 'jul-1',
    subject: 'Q3 Kick-off Meeting',
    startTime: new Date('2025-07-03T10:00:00'),
    endTime: new Date('2025-07-03T11:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Thomas Müller', email: 'thomas@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'team_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },
  {
    id: 'jul-2',
    subject: 'Client Strategy Workshop',
    startTime: new Date('2025-07-15T09:00:00'),
    endTime: new Date('2025-07-15T17:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Client Team', email: 'team@client.com', isExternal: true }
    ],
    location: 'Monheim',
    category: 'client_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },
  
  // August 2025 highlights
  {
    id: 'aug-1',
    subject: 'Architektur Review Q3',
    startTime: new Date('2025-08-05T14:00:00'),
    endTime: new Date('2025-08-05T16:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Dr. Marcus Klein', email: 'marcus@innoq.com', isExternal: false }
    ],
    location: 'Remote',
    category: 'team_meeting',
    requiresOfficePresence: false,
    isManuallySet: false
  },
  {
    id: 'aug-2',
    subject: 'New Project Kickoff',
    startTime: new Date('2025-08-12T10:00:00'),
    endTime: new Date('2025-08-12T12:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Project Team', email: 'team@newclient.de', isExternal: true }
    ],
    location: 'Berlin',
    category: 'client_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },
  {
    id: 'aug-3',
    subject: 'Team Offsite Planning',
    startTime: new Date('2025-08-26T09:00:00'),
    endTime: new Date('2025-08-26T17:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Thomas Müller', email: 'thomas@innoq.com', isExternal: false },
      { name: 'Julia Hoffmann', email: 'julia@innoq.com', isExternal: false }
    ],
    location: 'Hamburg',
    category: 'team_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  }
];

export const mockCalendarWeek: MockCalendarEvent[] = [
  // Monday, July 15, 2024
  {
    id: '1',
    subject: 'Wochenplanung Team Sprint',
    startTime: new Date('2024-07-15T09:00:00'),
    endTime: new Date('2024-07-15T10:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Thomas Müller', email: 'thomas@innoq.com', isExternal: false },
      { name: 'Julia Hoffmann', email: 'julia@innoq.com', isExternal: false },
      { name: 'Marc Schneider', email: 'marc@innoq.com', isExternal: false },
      { name: 'Lisa Chen', email: 'lisa@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'team_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },
  {
    id: '2',
    subject: 'Fokuszeit: Proposal Vorbereitung',
    startTime: new Date('2024-07-15T11:00:00'),
    endTime: new Date('2024-07-15T12:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false }
    ],
    category: 'focus_work',
    requiresOfficePresence: false,
    isManuallySet: true
  },
  {
    id: '3',
    subject: 'Client Call - Projekt Alpha Status',
    startTime: new Date('2024-07-15T14:00:00'),
    endTime: new Date('2024-07-15T15:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Michael Schmidt', email: 'michael@alphacorp.de', isExternal: true },
      { name: 'Anna Müller', email: 'anna@alphacorp.de', isExternal: true }
    ],
    location: 'Remote',
    category: 'client_meeting',
    requiresOfficePresence: false,
    isManuallySet: true
  },

  // Tuesday, July 16, 2024 - Key day from user journey
  {
    id: '4',
    subject: 'Kundenpräsentation - Projekt Phoenix',
    startTime: new Date('2024-07-16T14:00:00'),
    endTime: new Date('2024-07-16T16:00:00'),
    attendees: [
      { name: 'Max Mustermann', email: 'max@kunde.de', isExternal: true },
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Thomas Müller', email: 'thomas@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'client_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },
  {
    id: '5',
    subject: 'Nachbereitung Phoenix Meeting',
    startTime: new Date('2024-07-16T16:30:00'),
    endTime: new Date('2024-07-16T17:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Thomas Müller', email: 'thomas@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'team_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },

  // Wednesday, July 17, 2024
  {
    id: '6',
    subject: 'Client Call - Projekt Beta Kickoff',
    startTime: new Date('2024-07-17T10:00:00'),
    endTime: new Date('2024-07-17T11:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Dr. Elena Wagner', email: 'elena@betacorp.com', isExternal: true },
      { name: 'Jens Petersen', email: 'jens@betacorp.com', isExternal: true },
      { name: 'Sarah Johnson', email: 'sarah@betacorp.com', isExternal: true }
    ],
    location: 'Remote',
    category: 'client_meeting',
    requiresOfficePresence: false,
    isManuallySet: false
  },
  {
    id: '7',
    subject: 'Architektur Review - Interne Abstimmung',
    startTime: new Date('2024-07-17T13:00:00'),
    endTime: new Date('2024-07-17T14:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Dr. Marcus Klein', email: 'marcus@innoq.com', isExternal: false },
      { name: 'Lisa Chen', email: 'lisa@innoq.com', isExternal: false }
    ],
    location: 'Remote',
    category: 'team_meeting',
    requiresOfficePresence: false,
    isManuallySet: false
  },

  // Thursday, July 18, 2024 - Focus day from user journey
  {
    id: '8',
    subject: 'Proposal Erstellung - Deep Work',
    startTime: new Date('2024-07-18T09:00:00'),
    endTime: new Date('2024-07-18T12:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'focus_work',
    requiresOfficePresence: true,
    isManuallySet: true
  },
  {
    id: '9',
    subject: 'Proposal Review mit Stakeholdern',
    startTime: new Date('2024-07-18T14:00:00'),
    endTime: new Date('2024-07-18T15:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Julia Hoffmann', email: 'julia@innoq.com', isExternal: false },
      { name: 'Dr. Marcus Klein', email: 'marcus@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'team_meeting',
    requiresOfficePresence: true,
    isManuallySet: false
  },
  {
    id: '10',
    subject: 'Finale Proposal Überarbeitung',
    startTime: new Date('2024-07-18T16:00:00'),
    endTime: new Date('2024-07-18T17:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false }
    ],
    location: 'Köln',
    category: 'focus_work',
    requiresOfficePresence: true,
    isManuallySet: true
  },

  // Friday, July 19, 2024 - Planning day
  {
    id: '11',
    subject: 'Client Call - Projekt Gamma Check-in',
    startTime: new Date('2024-07-19T09:30:00'),
    endTime: new Date('2024-07-19T10:30:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Robert Fischer', email: 'robert@gammainc.de', isExternal: true }
    ],
    location: 'Remote',
    category: 'client_meeting',
    requiresOfficePresence: false,
    isManuallySet: false
  },
  {
    id: '12',
    subject: 'Team Retrospektive',
    startTime: new Date('2024-07-19T11:00:00'),
    endTime: new Date('2024-07-19T12:00:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false },
      { name: 'Thomas Müller', email: 'thomas@innoq.com', isExternal: false },
      { name: 'Julia Hoffmann', email: 'julia@innoq.com', isExternal: false },
      { name: 'Marc Schneider', email: 'marc@innoq.com', isExternal: false }
    ],
    location: 'Remote',
    category: 'team_meeting',
    requiresOfficePresence: false,
    isManuallySet: false
  },
  {
    id: '13',
    subject: 'Wochenplanung für folgende Woche',
    startTime: new Date('2024-07-19T16:00:00'),
    endTime: new Date('2024-07-19T16:50:00'),
    attendees: [
      { name: 'Sandra Weber', email: 'sandra@innoq.com', isExternal: false }
    ],
    category: 'focus_work',
    requiresOfficePresence: false,
    isManuallySet: true
  }
];

// Helper functions for working with mock data
export const getEventsForDay = (date: Date): MockCalendarEvent[] => {
  // Combine both 2024 mock data and 2025 highlights
  const allEvents = [...mockCalendarWeek, ...mockCalendarHighlights];
  return allEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate.toDateString() === date.toDateString();
  });
};

export const getEventsForWeek = (weekStart: Date): MockCalendarEvent[] => {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  
  const allEvents = [...mockCalendarWeek, ...mockCalendarHighlights];
  return allEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    return eventDate >= weekStart && eventDate <= weekEnd;
  });
};

export const getEventsByCategory = (category: string): MockCalendarEvent[] => {
  const allEvents = [...mockCalendarWeek, ...mockCalendarHighlights];
  return allEvents.filter(event => event.category === category);
};

export const getOfficeRequiredEvents = (): MockCalendarEvent[] => {
  const allEvents = [...mockCalendarWeek, ...mockCalendarHighlights];
  return allEvents.filter(event => event.requiresOfficePresence === true);
};