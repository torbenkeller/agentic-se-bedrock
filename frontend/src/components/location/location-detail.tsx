import { 
  MapPin, 
  Car, 
  Train, 
  Heart,
  ExternalLink,
  X,
  Calendar,
  Utensils,
  Building,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation, useLocationById } from '@/hooks/use-location';
import { useParams, useNavigate } from 'react-router-dom';


import { cn } from '@/lib/utils';
import type { Room, PublicTransportInfo, Restaurant, Hotel } from '@/types/location';
import { useState } from 'react';
import { BookingModal } from '@/components/booking';



export function LocationDetail() {
  const { toggleFavorite } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const displayLocation = useLocationById(id!);
  const [isCopied, setIsCopied] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Use route param and React Query for selected location
  if (!id) {
    return null;
  }


  const handleFavoriteToggle = () => {
    toggleFavorite(displayLocation.id);
  };

  const handleClose = () => {
    navigate('/locations');
  };

  const handleBookRoom = () => {
    setIsBookingModalOpen(true);
  };

  const handleCopyAddress = async () => {
    const address = `${displayLocation.address.street}, ${displayLocation.address.postalCode} ${displayLocation.address.city}, ${displayLocation.address.country}`;
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const openInMaps = (type: 'google' | 'apple') => {
    const address = `${displayLocation.address.street}, ${displayLocation.address.postalCode} ${displayLocation.address.city}`;
    const encodedAddress = encodeURIComponent(address);
    
    if (type === 'google') {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    } else {
      window.open(`https://maps.apple.com/?q=${encodedAddress}`, '_blank');
    }
  };


  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {displayLocation.name}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleFavoriteToggle}
              title={displayLocation.isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
            >
              <Heart 
                className={cn(
                  "h-4 w-4",
                  displayLocation.isFavorite 
                    ? "fill-red-500 text-red-500" 
                    : "text-gray-400 hover:text-red-500"
                )} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleClose}
              title="Schließen"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Country Badge */}
        {displayLocation.address.country === 'Schweiz' && (
          <Badge variant="outline" className="mb-2 bg-red-50 text-red-700 border-red-200">
            🇨🇭 Schweiz
          </Badge>
        )}
        
        <p className="text-sm text-gray-600">
          {displayLocation.description}
        </p>
        
        {/* CTA Button */}
        <Button
          onClick={handleBookRoom}
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 flex items-center justify-center gap-2 mt-4"
          size="lg"
        >
          <Calendar className="h-5 w-5" />
          Raum buchen
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">

        {/* Address */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Adresse
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className={cn(
                  "flex items-center gap-1 h-6 px-2 transition-colors",
                  isCopied && "text-green-600"
                )}
                title={isCopied ? "Kopiert!" : "Adresse kopieren"}
              >
                {isCopied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm text-gray-600">
              <div>{displayLocation.address.street}</div>
              <div>{displayLocation.address.postalCode} {displayLocation.address.city}</div>
              <div>{displayLocation.address.country}</div>
            </div>
            
            {/* Map Actions */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openInMaps('google')}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Google Maps
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openInMaps('apple')}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Apple Maps
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Capacity & Highlights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Kapazität</span>
              <span>{displayLocation.capacity} Arbeitsplätze</span>
            </div>
            
            {displayLocation.highlights && displayLocation.highlights.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Highlights</p>
                <div className="flex flex-wrap gap-1">
                  {displayLocation.highlights.map((highlight: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs bg-gray-50 text-gray-600"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Room Overview */}
            {displayLocation.rooms && displayLocation.rooms.length > 0 && (
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 mb-2">Räume</p>
                <div className="space-y-2">
                  {displayLocation.rooms.map((room: Room) => (
                    <div key={room.id} className="flex justify-between text-xs">
                      <span className="text-gray-600">{room.name}</span>
                      <span className="text-gray-800">
                        {room.workplaces > 0 ? `${room.workplaces} AP` : ''}
                        {room.additionalSeats && room.additionalSeats > 0 ? 
                          `${room.workplaces > 0 ? ' + ' : ''}${room.additionalSeats} Plätze` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>


        {/* Transport Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Train className="h-4 w-4" />
              Anreise ÖPNV
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {displayLocation.transportInfo.publicTransport.map((transport: PublicTransportInfo, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="text-xs">
                  {transport.type === 'bus' ? '🚌' : 
                   transport.type === 'train' ? '🚆' : 
                   transport.type === 'subway' ? '🚇' : '🚊'} {transport.line}
                </Badge>
                <span className="text-gray-600">{transport.stop}</span>
                <span className="text-gray-500">({transport.walkingMinutes} min)</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Parking Info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Car className="h-4 w-4" />
              Parken
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {displayLocation.parkingInfo.available ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plätze verfügbar</span>
                  <span>{displayLocation.parkingInfo.capacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kosten</span>
                  <span>{displayLocation.parkingInfo.costs}</span>
                </div>
                {displayLocation.parkingInfo.restrictions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Hinweise:</p>
                    {displayLocation.parkingInfo.restrictions.map((restriction: string, index: number) => (
                      <p key={index} className="text-xs text-gray-500">• {restriction}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Keine Parkplätze verfügbar</p>
            )}
          </CardContent>
        </Card>

        {/* Restaurants */}
        {displayLocation.restaurants && displayLocation.restaurants.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Restaurants
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {displayLocation.restaurants.map((restaurant: Restaurant, index: number) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{restaurant.name}</span>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                        {restaurant.priceRange}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{restaurant.cuisine}</p>
                    {restaurant.notes && (
                      <p className="text-xs text-gray-400 mt-1">{restaurant.notes}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{restaurant.distance}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Hotels */}
        {displayLocation.hotels && displayLocation.hotels.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building className="h-4 w-4" />
                Hotels
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {displayLocation.hotels.map((hotel: Hotel, index: number) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{hotel.name}</span>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        {hotel.priceRange}
                      </Badge>
                    </div>
                    {hotel.features && hotel.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hotel.features.map((feature: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-gray-50 text-gray-600 whitespace-nowrap">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {hotel.notes && (
                      <p className="text-xs text-gray-400 mt-1">{hotel.notes}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{hotel.distance}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        location={displayLocation}
      />
    </div>
  );
}