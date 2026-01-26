import { useState, useCallback, type ReactNode } from 'react';
import type { CalendarContextState, MockCalendarEvent, CalendarViewMode } from '@/types/calendar';
import { mockCalendarWeek, mockCalendarHighlights } from '@/lib/mock-data/calendar-events';
import { CalendarContext } from '@/lib/calendar-context';

// Calendar Provider Props
interface CalendarProviderProps {
  children: ReactNode;
}

// Calendar Provider Component
export function CalendarProvider({ children }: CalendarProviderProps) {
  // State for calendar data - combine both 2024 and 2025 events
  const [events, setEvents] = useState<MockCalendarEvent[]>([...mockCalendarWeek, ...mockCalendarHighlights]);
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date('2024-07-15')); // Week of July 15, 2024
  const [viewMode, setViewMode] = useState<CalendarViewMode>('week');

  // Update a specific event
  const updateEvent = useCallback((eventId: string, updates: Partial<MockCalendarEvent>) => {
    setEvents(currentEvents => 
      currentEvents.map(event => 
        event.id === eventId 
          ? { ...event, ...updates }
          : event
      )
    );
  }, []);

  // Context value
  const contextValue: CalendarContextState = {
    events,
    selectedWeek,
    viewMode,
    setEvents,
    setSelectedWeek,
    setViewMode,
    updateEvent,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}

