import { useCallback } from 'react';
import { useCalendar } from './use-calendar';

// Helper hook for calendar navigation
export function useCalendarNavigation() {
  const { selectedWeek, setSelectedWeek } = useCalendar();

  const goToNextWeek = useCallback(() => {
    const nextWeek = new Date(selectedWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setSelectedWeek(nextWeek);
  }, [selectedWeek, setSelectedWeek]);

  const goToPreviousWeek = useCallback(() => {
    const previousWeek = new Date(selectedWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setSelectedWeek(previousWeek);
  }, [selectedWeek, setSelectedWeek]);

  const goToToday = useCallback(() => {
    setSelectedWeek(new Date());
  }, [setSelectedWeek]);

  const goToSpecificWeek = useCallback((date: Date) => {
    // Set to Monday of the week containing the given date
    const monday = new Date(date);
    const dayOfWeek = monday.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Sunday = 0, so we want 6 days back
    monday.setDate(monday.getDate() - daysToSubtract);
    setSelectedWeek(monday);
  }, [setSelectedWeek]);

  return {
    selectedWeek,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    goToSpecificWeek,
  };
}