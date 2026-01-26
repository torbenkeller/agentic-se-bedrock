import { createContext } from 'react';
import type { LocationContextState } from '@/types/location';

// Create the location context
export const LocationContext = createContext<LocationContextState | undefined>(undefined);