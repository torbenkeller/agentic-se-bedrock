import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRoomAvailability } from '@/hooks/use-room-availability';
import type { Room } from '@/types/location';
import type { BookingTimeSlot } from '@/types/booking';

interface AvailabilityBadgeProps {
  room: Room;
  selectedDate: Date;
  timeSlot: BookingTimeSlot;
}

const getStatusColor = (status: 'available' | 'partially' | 'unavailable') => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'partially':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'unavailable':
      return 'bg-red-100 text-red-800 border-red-200';
  }
};

const getStatusText = (status: 'available' | 'partially' | 'unavailable') => {
  switch (status) {
    case 'available':
      return 'Verfügbar';
    case 'partially':
      return 'Teilweise belegt';
    case 'unavailable':
      return 'Nicht verfügbar';
  }
};

function AvailabilityContent({ room, selectedDate, timeSlot }: AvailabilityBadgeProps) {
  const availability = useRoomAvailability(room, selectedDate, timeSlot);

  return (
    <Badge
      variant="outline"
      className={cn("text-xs", getStatusColor(availability))}
    >
      {getStatusText(availability)}
    </Badge>
  );
}

export function AvailabilityBadge({ room, selectedDate, timeSlot }: AvailabilityBadgeProps) {
  return (
    <Suspense
      fallback={
        <Badge
          variant="outline"
          className="text-xs bg-gray-100 text-gray-500 border-gray-200 animate-pulse"
        >
          Prüfe...
        </Badge>
      }
    >
      <AvailabilityContent room={room} selectedDate={selectedDate} timeSlot={timeSlot} />
    </Suspense>
  );
}
