import { useState } from 'react';
import { useCreateBooking } from '@/hooks/use-create-booking';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { DatePickerBar } from './date-picker-bar';
import { RoomOverview } from './room-overview';

import type { Location, Room } from '@/types/location';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: Location;
}

export function BookingModal({ isOpen, onClose, location }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();

  const fullDaySlot = { start: '09:00', end: '18:00' };
  const { mutate: book, isPending } = useCreateBooking({
    onSuccess: () => {
      setSelectedDate(new Date());
      setSelectedRoom(undefined);

      onClose();
    },
    onError: (error) => {
      console.error('Booking failed:', error);
    },
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Reset room selection when date changes
    setSelectedRoom(undefined);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleCancel = () => {
    setSelectedDate(new Date());
    setSelectedRoom(undefined);

    onClose();
  };

  const handleBook = () => {
    if (selectedDate && selectedRoom) {
      book({
        locationId: location.id,
        date: selectedDate,
        resourceType: 'room',
        resourceId: selectedRoom.id,
        timeSlot: fullDaySlot,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[90vw] w-[90vw] max-h-[90vh] overflow-hidden sm:!max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>
            Buchung für {location.name}
          </DialogTitle>
          <DialogDescription>
            Standort: {location.address.city} • Kapazität: {location.capacity} Arbeitsplätze
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <DatePickerBar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />

          <div className="overflow-y-auto max-h-[500px] min-h-[300px]">
            <RoomOverview
              location={location}
              selectedDate={selectedDate}
              timeSlot={fullDaySlot}
              selectedRoom={selectedRoom}
              onRoomSelect={handleRoomSelect}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleBook}
            disabled={!selectedRoom || isPending}
          >
            Buchen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}