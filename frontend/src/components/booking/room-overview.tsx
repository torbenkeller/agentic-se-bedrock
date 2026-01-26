import { cn } from '@/lib/utils';
import { RoomCardWithAvailability } from './room-card-with-availability';
import type { Location, Room } from '@/types/location';
import type { BookingTimeSlot } from '@/types/booking';

interface RoomOverviewProps {
  location: Location;
  selectedDate: Date;
  timeSlot: BookingTimeSlot;
  selectedRoom?: Room;
  onRoomSelect: (room: Room) => void;
  className?: string;
}


export function RoomOverview({
  location,
  selectedDate,
  timeSlot,
  selectedRoom,
  onRoomSelect,
  className
}: RoomOverviewProps) {
  const rooms = location.rooms || [];

  if (rooms.length === 0) {
    return (
      <div className={cn("p-8 text-center text-gray-500", className)}>
        <p>Keine Räume für diesen Standort verfügbar</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 overflow-x-hidden", className)}>
      <h3 className="text-lg font-semibold">Verfügbare Räume</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-x-hidden">
        {rooms.map((room) => (
          <RoomCardWithAvailability
            key={room.id}
            room={room}
            selectedDate={selectedDate}
            timeSlot={timeSlot}
            isSelected={selectedRoom?.name === room.name}
            onRoomSelect={onRoomSelect}
          />
        ))}
      </div>
    </div>
  );
}
