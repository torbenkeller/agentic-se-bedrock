import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import type { Room } from '@/types/location';
import type { BookingTimeSlot } from '@/types/booking';
import { useCurrentUser } from '@/hooks/use-current-user';
import { fetchRoomAvailability, type RoomAvailability } from '@/lib/bookings';

/**
 * Creates a query key for room availability queries.
 * @param roomId - The ID of the room
 * @param date - The date to check availability
 * @returns The query key array
 */
export function createRoomAvailabilityQueryKey(roomId: string, date: Date, timeSlot?: BookingTimeSlot) {
  const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
  const slotKey = timeSlot ? `${timeSlot.start}-${timeSlot.end}` : 'all-day';
  return ['room-availability', roomId, dateKey, slotKey] as const;
}



/**
 * Simulated API fetch for room availability.
 * Uses checksum-based logic instead of text-based matching.
 */


/**
 * React Query hook with Suspense to get room availability for a specific date.
 * Uses the existing mock logic but loads data asynchronously.
 *
 * @param room - The room to check availability for
 * @param date - The date to check availability
 * @returns The availability status directly (Suspense handles loading)
 */
export function useRoomAvailability(room: Room, date: Date, timeSlot?: BookingTimeSlot): RoomAvailability {
  const user = useCurrentUser();
  const { data } = useSuspenseQuery({
    queryKey: createRoomAvailabilityQueryKey(room.id, date, timeSlot),
    queryFn: () => fetchRoomAvailability(room, date, { username: user.username }, timeSlot),
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
    refetchOnWindowFocus: false,
  });

  return data;
}

/**
 * Optional version of the room availability hook that doesn't use Suspense.
 * Returns undefined while loading, used for non-critical availability checks.
 *
 * @param room - The room to check availability for
 * @param date - The date to check availability
 * @returns The availability status or undefined if loading
 */
export function useRoomAvailabilityOptional(room: Room, date: Date, timeSlot?: BookingTimeSlot): RoomAvailability | undefined {
  const user = useCurrentUser();
  const { data } = useQuery({
    queryKey: createRoomAvailabilityQueryKey(room.id, date, timeSlot),
    queryFn: () => fetchRoomAvailability(room, date, { username: user.username }, timeSlot),
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
    refetchOnWindowFocus: false,
    
  });

  return data;
}
