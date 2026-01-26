import { useCallback } from 'react';
import type { MockCalendarEvent } from '@/types/calendar';
import { useCalendar } from './use-calendar';

// Helper hook for event filtering and management
export function useCalendarEvents() {
  const { events, updateEvent } = useCalendar();

  const getEventsForDay = useCallback((date: Date): MockCalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  }, [events]);

  const getEventsForWeek = useCallback((weekStart: Date): MockCalendarEvent[] => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= weekStart && eventDate <= weekEnd;
    });
  }, [events]);

  const getEventsByCategory = useCallback((category: string): MockCalendarEvent[] => {
    return events.filter(event => event.category === category);
  }, [events]);

  const getOfficeRequiredEvents = useCallback((): MockCalendarEvent[] => {
    return events.filter(event => event.requiresOfficePresence === true);
  }, [events]);

  const toggleOfficePresence = useCallback((eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      updateEvent(eventId, { 
        requiresOfficePresence: !event.requiresOfficePresence,
        isManuallySet: true 
      });
    }
  }, [events, updateEvent]);

  const updateEventCategory = useCallback((eventId: string, category: MockCalendarEvent['category']) => {
    updateEvent(eventId, { 
      category,
      isManuallySet: true 
    });
  }, [updateEvent]);

  return {
    events,
    getEventsForDay,
    getEventsForWeek,
    getEventsByCategory,
    getOfficeRequiredEvents,
    toggleOfficePresence,
    updateEventCategory,
  };
}