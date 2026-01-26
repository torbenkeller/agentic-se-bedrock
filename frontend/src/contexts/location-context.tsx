import { useState, useCallback, useEffect, type ReactNode } from 'react';
import type { 
  LocationContextState, 
  Location, 
  LocationFilters
} from '@/types/location';
import { LocationContext } from '@/lib/location-context';
import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '@/lib/mock-data/locations';

// Location Provider Props
interface LocationProviderProps {
  children: ReactNode;
}

// Default filters
const defaultFilters: LocationFilters = {
  workplaceTypes: [],
  equipment: [],
  cities: [],
  availableOnly: false,
  favoritesOnly: false,
  hasParking: false,
};

// Location Provider Component
export function LocationProvider({ children }: LocationProviderProps) {
  // State management (no selectedLocation)
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<LocationFilters>(defaultFilters);


  // React Query: fetch locations on render
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  // Initialize favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('location-favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((locationId: string) => {
    setFavorites((currentFavorites) => {
      const newFavorites = currentFavorites.includes(locationId)
        ? currentFavorites.filter((id) => id !== locationId)
        : [...currentFavorites, locationId];

      // Save to localStorage
      localStorage.setItem('location-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<LocationFilters>) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...newFilters,
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Refetch locations (keeps API compatibility)
  const loadLocations = useCallback(async () => {
    await refetch();
  }, [refetch]);



  // Derive locations with favorite flags
  const derivedLocations: Location[] = (data ?? []).map((location: Location) => ({
    ...location,
    isFavorite: favorites.includes(location.id),
  }));

  // Context value (selectedLocation is deprecated; keep null and no-ops for compatibility)
  const contextValue: LocationContextState = {
    locations: derivedLocations,
    favorites,
    filters,
    loading: isLoading,
    error: isError ? 'Fehler beim Laden der Standorte' : null,
    toggleFavorite,
    updateFilters,
    clearFilters,
    loadLocations,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}