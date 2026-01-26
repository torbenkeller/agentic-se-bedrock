import { createContext } from 'react';
import type { CalendarContextState } from '@/types/calendar';

// Create the context
export const CalendarContext = createContext<CalendarContextState | undefined>(undefined);