// Mock Calendar Event Types for Calvin Prototype
// Based on AR001 planning document

export type EventCategory = 'client_meeting' | 'team_meeting' | 'focus_work' | 'uncategorized';

export interface EventAttendee {
  name: string;
  email: string;
  isExternal: boolean;
}

export interface MockCalendarEvent {
  id: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  attendees: EventAttendee[];
  location?: string;
  category?: EventCategory;
  requiresOfficePresence?: boolean;
  isManuallySet?: boolean;
}

// Calendar view types
export type CalendarViewMode = 'week' | 'month';

// Calendar context state
export interface CalendarContextState {
  events: MockCalendarEvent[];
  selectedWeek: Date;
  viewMode: CalendarViewMode;
  setEvents: (events: MockCalendarEvent[]) => void;
  setSelectedWeek: (date: Date) => void;
  setViewMode: (mode: CalendarViewMode) => void;
  updateEvent: (eventId: string, updates: Partial<MockCalendarEvent>) => void;
}

// Event categorization service types
export interface CategorizationResult {
  category: EventCategory;
  requiresOfficePresence: boolean;
  confidence: number;
}

// Filter types for event management
export interface EventFilters {
  categories: EventCategory[];
  officePresenceOnly: boolean;
  dateRange: {
    start: Date;
    end: Date;
  };
}