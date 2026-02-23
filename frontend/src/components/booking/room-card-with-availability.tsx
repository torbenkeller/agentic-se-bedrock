import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Monitor, 
  Video, 
  Wifi, 
  Coffee,
  Zap,
  Volume2,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRoomAvailabilityOptional } from '@/hooks/use-room-availability';
import type { Room } from '@/types/location';
import type { BookingTimeSlot } from '@/types/booking';

interface RoomCardWithAvailabilityProps {
  room: Room;
  selectedDate: Date;
  timeSlot: BookingTimeSlot;
  isSelected: boolean;
  onRoomSelect: (room: Room) => void;
}

const getEquipmentIcon = (equipment: string) => {
  switch (equipment.toLowerCase()) {
    case 'monitor':
    case 'bildschirm':
      return <Monitor className="h-4 w-4" />;
    case 'video':
    case 'videokonferenz':
    case 'beamer':
      return <Video className="h-4 w-4" />;
    case 'wifi':
    case 'wlan':
      return <Wifi className="h-4 w-4" />;
    case 'coffee':
    case 'kaffee':
      return <Coffee className="h-4 w-4" />;
    case 'power':
    case 'strom':
      return <Zap className="h-4 w-4" />;
    case 'quiet':
    case 'ruhig':
      return <Volume2 className="h-4 w-4" />;
    case 'natural_light':
    case 'tageslicht':
      return <Sun className="h-4 w-4" />;
    default:
      return null;
  }
};

export function RoomCardWithAvailability({ 
  room, 
  selectedDate, 
  timeSlot,
  isSelected, 
  onRoomSelect 
}: RoomCardWithAvailabilityProps) {
  const availability = useRoomAvailabilityOptional(room, selectedDate, timeSlot);
  const isDisabled = availability === 'unavailable';
  const isLoading = availability === undefined;

  const handleClick = () => {
    // Allow selection while loading or if not unavailable
    if (!isDisabled) {
      onRoomSelect(room);
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md min-h-[200px] flex flex-col",
        isSelected && "border-black border-2",
        isDisabled && "opacity-50 cursor-not-allowed",
        isLoading && "cursor-wait"
      )}
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{room.name}</CardTitle>
          {isLoading ? (
            <Badge
              variant="outline"
              className="text-xs bg-gray-100 text-gray-500 border-gray-200 animate-pulse"
            >
              Prüfe...
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                availability === 'available'
                  ? "bg-green-100 text-green-800 border-green-200"
                  : availability === 'partially'
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                  : "bg-red-100 text-red-800 border-red-200"
              )}
            >
              {availability === 'available'
                ? 'Verfügbar'
                : availability === 'partially'
                ? 'Teilweise belegt'
                : 'Nicht verfügbar'}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1">
        {/* Capacity */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>
            {room.workplaces > 0 ? `${room.workplaces} Arbeitsplätze` : ''}
            {room.additionalSeats && room.additionalSeats > 0 ? 
              `${room.workplaces > 0 ? ' + ' : ''}${room.additionalSeats} Zusatzplätze` : ''}
          </span>
        </div>

        {/* Equipment */}
        {room.equipment && room.equipment.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {room.equipment.slice(0, 4).map((equipment, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                  {getEquipmentIcon(equipment)}
                  <span className="truncate">{equipment}</span>
                </div>
              ))}
              {room.equipment.length > 4 && (
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  +{room.equipment.length - 4} weitere
                </span>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {room.notes && (
          <p className="text-xs text-gray-500 mt-2">
            {room.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}