import { useContext } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LocationContext } from '@/lib/location-context';
import type { LocationContextState, Location } from '@/types/location';
import { fetchLocationById } from '@/lib/mock-data/locations';

/**
 * Hook to access location context
 * @returns LocationContextState
 * @throws Error if used outside LocationProvider
 */
export const useLocation = (): LocationContextState => {
  const context = useContext(LocationContext);
  
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  
  return context;
};

/**
 * React Query Hook to load a single location by ID from mock API.
 * Can be swapped to a real API later without changing consumers.
 */
export function useLocationById(id: string): Location {
  const { data } = useSuspenseQuery({
    queryKey: ['location', id],
    queryFn: () => fetchLocationById(id),
  });

  if (!data) {
    throw new Error(`Location ${id} not found`);
  }

  return data;
}

