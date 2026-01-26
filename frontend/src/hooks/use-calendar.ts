import { useContext } from 'react';
import type { CalendarContextState } from '@/types/calendar';
import { CalendarContext } from '@/lib/calendar-context';

// Custom hook to use the calendar context
export function useCalendar(): CalendarContextState {
  const context = useContext(CalendarContext);
  
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  
  return context;
}