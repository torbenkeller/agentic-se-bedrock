import { useState, useMemo } from 'react';
import { Search, Filter, X, Heart, MapPin, Users, Monitor, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LocationCard } from './location-card';
import { useLocation } from '@/hooks/use-location';
import { useNavigate, useParams } from 'react-router-dom';
import type { Location, WorkplaceType, Equipment } from '@/types/location';

interface LocationListProps {
  onLocationSelect?: (location: Location) => void;
}

export function LocationList({ onLocationSelect }: LocationListProps) {
  const { 
    locations, 
    filters, 
    loading, 
    error, 
    toggleFavorite, 
    updateFilters, 
    clearFilters
  } = useLocation();

  const navigate = useNavigate();
  const { id: selectedId } = useParams();

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter locations based on current filters and search
  const filteredLocations = useMemo(() => {
    let result = [...locations];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(location => 
        location.name.toLowerCase().includes(query) ||
        location.address.city.toLowerCase().includes(query) ||
        location.description?.toLowerCase().includes(query)
      );
    }

    // Favorites filter
    if (filters.favoritesOnly) {
      result = result.filter(location => location.isFavorite);
    }

    // Cities filter
    if (filters.cities.length > 0) {
      result = result.filter(location => 
        filters.cities.includes(location.address.city)
      );
    }

    // Parking filter
    if (filters.hasParking) {
      result = result.filter(location => location.parkingInfo.available);
    }

    // Workplace types filter
    if (filters.workplaceTypes.length > 0) {
      result = result.filter(location => 
        filters.workplaceTypes.some(type => 
          location.workplaceTypes.includes(type)
        )
      );
    }

    // Equipment filter
    if (filters.equipment.length > 0) {
      result = result.filter(location => 
        filters.equipment.some(equipment => 
          location.equipment.includes(equipment)
        )
      );
    }

    // Sort by default location first
    const defaultLocationId = localStorage.getItem('defaultLocation');
    if (defaultLocationId) {
      result = result.sort((a, b) => {
        if (a.id === defaultLocationId) return -1;
        if (b.id === defaultLocationId) return 1;
        return 0;
      });
    }

    return result;
  }, [locations, filters, searchQuery]);

  // Get unique cities for filter
  const availableCities = useMemo(() => {
    const cities = new Set(locations.map(location => location.address.city));
    return Array.from(cities).sort();
  }, [locations]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           filters.favoritesOnly ||
           filters.cities.length > 0 ||
           filters.hasParking ||
           filters.workplaceTypes.length > 0 ||
           filters.equipment.length > 0;
  }, [searchQuery, filters]);

  const handleClearAll = () => {
    setSearchQuery('');
    clearFilters();
    setShowFilters(false);
  };

  const handleCityFilter = (city: string) => {
    const newCities = filters.cities.includes(city)
      ? filters.cities.filter(c => c !== city)
      : [...filters.cities, city];
    updateFilters({ cities: newCities });
  };

  const handleLocationSelect = (location: Location) => {
    navigate(`/locations/${location.id}`);
    onLocationSelect?.(location);
  };

  // Helper functions for advanced filters
  const handleWorkplaceTypeFilter = (workplaceType: string) => {
    const newTypes = filters.workplaceTypes.includes(workplaceType as WorkplaceType)
      ? filters.workplaceTypes.filter(type => type !== workplaceType)
      : [...filters.workplaceTypes, workplaceType as WorkplaceType];
    updateFilters({ workplaceTypes: newTypes });
  };

  const handleEquipmentFilter = (equipment: string) => {
    const newEquipment = filters.equipment.includes(equipment as Equipment)
      ? filters.equipment.filter(eq => eq !== equipment)
      : [...filters.equipment, equipment as Equipment];
    updateFilters({ equipment: newEquipment });
  };

  // Get available options for advanced filters
  const availableWorkplaceTypes = useMemo(() => {
    const types = new Set<WorkplaceType>();
    locations.forEach(location => {
      location.workplaceTypes.forEach(type => types.add(type));
    });
    return Array.from(types);
  }, [locations]);

  const availableEquipment = useMemo(() => {
    const equipment = new Set<Equipment>();
    locations.forEach(location => {
      location.equipment.forEach(eq => equipment.add(eq));
    });
    return Array.from(equipment);
  }, [locations]);

  const availableCountries = useMemo(() => {
    const countries = new Set(locations.map(location => location.address.country));
    return Array.from(countries).sort();
  }, [locations]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Standorte</h2>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Lade Standorte...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Standorte</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Standorte</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {filteredLocations.length} von {locations.length} Standorten
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Standorte durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 h-10"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex items-center gap-2 h-10"
            >
              <X className="h-4 w-4" />
              Zurücksetzen
            </Button>
          )}
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.favoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ favoritesOnly: !filters.favoritesOnly })}
                className="flex items-center gap-1"
              >
                <Heart className="h-3 w-3" />
                Nur Favoriten
              </Button>
              <Button
                variant={filters.hasParking ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilters({ hasParking: !filters.hasParking })}
                className="flex items-center gap-1"
              >
                <MapPin className="h-3 w-3" />
                Mit Parkplatz
              </Button>
            </div>

            {/* City Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Städte</h4>
              <div className="flex flex-wrap gap-2">
                {availableCities.map(city => (
                  <Badge
                    key={city}
                    variant={filters.cities.includes(city) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCityFilter(city)}
                  >
                    {city}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="border-t pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 w-full justify-between"
              >
                <span className="text-sm font-medium">Erweiterte Filter</span>
                {showAdvancedFilters ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Advanced Filters Content */}
            {showAdvancedFilters && (
              <div className="space-y-4 pt-2">
                {/* Workplace Types */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Arbeitsplatztypen
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableWorkplaceTypes.map(type => (
                      <Badge
                        key={type}
                        variant={filters.workplaceTypes.includes(type) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleWorkplaceTypeFilter(type)}
                      >
                        {type === 'desk' ? 'Schreibtisch' :
                         type === 'focus_pod' ? 'Fokus-Pod' :
                         type === 'phone_booth' ? 'Telefonkabine' :
                         type === 'lounge' ? 'Lounge' :
                         type === 'meeting_room' ? 'Besprechungsraum' :
                         type === 'conference_room' ? 'Konferenzraum' : type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Ausstattung
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {availableEquipment.map(equipment => (
                      <Badge
                        key={equipment}
                        variant={filters.equipment.includes(equipment) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleEquipmentFilter(equipment)}
                      >
                        {equipment === 'monitor' ? 'Monitor' :
                         equipment === 'docking_station' ? 'Docking Station' :
                         equipment === 'height_adjustable' ? 'Höhenverstellbar' :
                         equipment === 'ergonomic_chair' ? 'Ergonomischer Stuhl' :
                         equipment === 'whiteboard' ? 'Whiteboard' :
                         equipment === 'beamer' ? 'Beamer' :
                         equipment === 'video_conference' ? 'Videokonferenz' :
                         equipment === 'quiet_environment' ? 'Ruhige Umgebung' :
                         equipment === 'natural_light' ? 'Tageslicht' :
                         equipment === 'coffee_nearby' ? 'Kaffee in der Nähe' : equipment}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Countries */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Länder</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableCountries.map(country => (
                      <Badge
                        key={country}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          const countryLocations = locations.filter(loc => loc.address.country === country);
                          const countryCities = countryLocations.map(loc => loc.address.city);
                          const allSelected = countryCities.every(city => filters.cities.includes(city));
                          
                          if (allSelected) {
                            // Remove all cities from this country
                            const newCities = filters.cities.filter(city => !countryCities.includes(city));
                            updateFilters({ cities: newCities });
                          } else {
                            // Add all cities from this country
                            const newCities = [...new Set([...filters.cities, ...countryCities])];
                            updateFilters({ cities: newCities });
                          }
                        }}
                      >
                        {country === 'Deutschland' ? '🇩🇪 Deutschland' :
                         country === 'Schweiz' ? '🇨🇭 Schweiz' : country}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Suche: "{searchQuery}"
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchQuery('')}
                />
              </Badge>
            )}
            {filters.favoritesOnly && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                Favoriten
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters({ favoritesOnly: false })}
                />
              </Badge>
            )}
            {filters.cities.map(city => (
              <Badge key={city} variant="secondary" className="flex items-center gap-1">
                {city}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleCityFilter(city)}
                />
              </Badge>
            ))}
            {filters.hasParking && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Mit Parkplatz
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters({ hasParking: false })}
                />
              </Badge>
            )}
            {filters.workplaceTypes.map(type => (
              <Badge key={type} variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {type === 'desk' ? 'Schreibtisch' :
                 type === 'focus_pod' ? 'Fokus-Pod' :
                 type === 'phone_booth' ? 'Telefonkabine' :
                 type === 'lounge' ? 'Lounge' :
                 type === 'meeting_room' ? 'Besprechungsraum' :
                 type === 'conference_room' ? 'Konferenzraum' : type}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleWorkplaceTypeFilter(type)}
                />
              </Badge>
            ))}
            {filters.equipment.map(equipment => (
              <Badge key={equipment} variant="secondary" className="flex items-center gap-1">
                <Monitor className="h-3 w-3" />
                {equipment === 'monitor' ? 'Monitor' :
                 equipment === 'docking_station' ? 'Docking Station' :
                 equipment === 'height_adjustable' ? 'Höhenverstellbar' :
                 equipment === 'ergonomic_chair' ? 'Ergonomischer Stuhl' :
                 equipment === 'whiteboard' ? 'Whiteboard' :
                 equipment === 'beamer' ? 'Beamer' :
                 equipment === 'video_conference' ? 'Videokonferenz' :
                 equipment === 'quiet_environment' ? 'Ruhige Umgebung' :
                 equipment === 'natural_light' ? 'Tageslicht' :
                 equipment === 'coffee_nearby' ? 'Kaffee in der Nähe' : equipment}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => handleEquipmentFilter(equipment)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Location Grid */}
      {filteredLocations.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Keine Standorte gefunden
          </h3>
          <p className="text-gray-500 mb-4">
            Versuche andere Suchbegriffe oder entferne Filter.
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={handleClearAll}>
              Alle Filter zurücksetzen
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              isSelected={selectedId === location.id}
              onSelect={handleLocationSelect}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}