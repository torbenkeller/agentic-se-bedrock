import { Heart, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Location } from '@/types/location';

interface LocationCardProps {
  location: Location;
  isSelected?: boolean;
  onSelect?: (location: Location) => void;
  onToggleFavorite?: (locationId: string) => void;
}

// Get color based on city initial
const getCityColor = (city: string): { bg: string; text: string } => {
  const colors = {
    'Monheim am Rhein': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'Berlin': { bg: 'bg-red-100', text: 'text-red-600' },
    'Hamburg': { bg: 'bg-green-100', text: 'text-green-600' },
    'Köln': { bg: 'bg-purple-100', text: 'text-purple-600' },
    'München': { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    'Offenbach am Main': { bg: 'bg-orange-100', text: 'text-orange-600' },
    'Zürich': { bg: 'bg-blue-100', text: 'text-blue-600' },
    'Baar': { bg: 'bg-teal-100', text: 'text-teal-600' },
  };
  return colors[city as keyof typeof colors] || { bg: 'bg-gray-100', text: 'text-gray-600' };
};

// Get city abbreviation
const getCityAbbreviation = (city: string): string => {
  const abbreviations = {
    'Monheim am Rhein': 'MO',
    'Berlin': 'B',
    'Hamburg': 'HH', 
    'Köln': 'K',
    'München': 'M',
    'Offenbach am Main': 'OF',
    'Zürich': 'ZH',
    'Baar': 'BA',
  };
  return abbreviations[city as keyof typeof abbreviations] || city.substring(0, 2).toUpperCase();
};


export function LocationCard({ location, isSelected = false, onSelect, onToggleFavorite }: LocationCardProps) {
  const cityColor = getCityColor(location.address.city);
  const cityAbbreviation = getCityAbbreviation(location.address.city);
  
  // Get country flag emoji
  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'Schweiz':
        return '🇨🇭';
      case 'Deutschland':
        return '🇩🇪';
      default:
        return '🏢';
    }
  };

  const handleCardClick = () => {
    onSelect?.(location);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggleFavorite?.(location.id);
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer",
        isSelected && "border-2 border-black shadow-lg"
      )}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            cityColor.bg
          )}>
            <span className={cn("font-semibold", cityColor.text)}>
              {cityAbbreviation}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{location.name}</h3>
              <span className="text-lg">{getCountryFlag(location.address.country)}</span>
            </div>
            <p className="text-sm text-gray-500">
              {location.type === 'headquarters' ? 'Hauptstandort' : 'Zweigstelle'}
            </p>
          </div>
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleFavoriteClick}
          title={location.isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
        >
          <Heart 
            className={cn(
              "h-4 w-4",
              location.isFavorite 
                ? "fill-red-500 text-red-500" 
                : "text-gray-400 hover:text-red-500"
            )} 
          />
        </Button>
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-gray-400" />
        <p className="text-sm text-gray-600">
          {location.address.street}, {location.address.postalCode} {location.address.city}
        </p>
      </div>

      {/* Highlights */}
      {location.highlights && location.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {location.highlights.slice(0, 3).map((highlight, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-gray-50 text-gray-600 whitespace-nowrap"
            >
              {highlight}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-gray-500">
          <Users className="h-4 w-4" />
          <span>{location.capacity} Arbeitsplätze</span>
        </div>
      </div>
    </div>
  );
}