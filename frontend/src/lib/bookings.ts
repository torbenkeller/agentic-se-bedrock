/**
 * Placeholder booking API for early integration.
 * This module simulates creating a booking and can be replaced with a real API later.
 */

import type { BookingTimeSlot } from '@/types/booking';
import type { Room } from '@/types/location';

export interface ApiContext {
  username: string;
}

export type ResourceType = 'room' | 'workspace';

export interface CreateBookingInput {
  locationId: string;
  date: Date;
  resourceType: ResourceType;
  resourceId: string;
  timeSlot: BookingTimeSlot;
}

export interface CreateBookingResponse {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'failed';
  message?: string;
}

/**
 * Simulate network latency
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simple id generator with fallback for environments without crypto.randomUUID
 */
function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `bk_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export type RoomAvailability = 'available' | 'partially' | 'unavailable';

/**
 * Simulated API fetch for room availability.
 * Uses checksum-based logic instead of text-based matching.
 */
export async function fetchRoomAvailability(room: Room, date: Date, ctx: ApiContext, timeSlot?: BookingTimeSlot): Promise<RoomAvailability> {
  // Log simulated API call
  const dateStr = date.toISOString().split('T')[0];
  const slotStr = timeSlot ? `${timeSlot.start}-${timeSlot.end}` : 'all-day';
  console.log(`GET bookings-service/availabilities/${room.id}?date=${dateStr}&slot=${slotStr} User:${ctx.username}`);

  // Simulate network delay
  await delay(200 + Math.random() * 300);

  // Mock logic based on room ID checksum and day of week
  const dayOfWeek = date.getDay();
  const checksum = room.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const score = checksum + dayOfWeek;

  if (score % 3 === 0) return 'unavailable';
  if (score % 2 === 0) return 'partially';

  return 'available';
}

/**
 * Placeholder function to create a booking.
 * - Simulates latency
 * - Returns a fake booking id and "confirmed" status
 *
 * Replace this with a real API call when ready:
 *   - POST to your backend
 *   - Map CreateBookingInput to the API contract
 *   - Handle errors and statuses accordingly
 */
export async function createBooking(input: CreateBookingInput, ctx: ApiContext): Promise<CreateBookingResponse> {
  // Log simulated API call
  const dateStr = input.date.toISOString().split('T')[0];
  console.log(`POST bookings-service/bookings User:${ctx.username}`, {
    locationId: input.locationId,
    date: dateStr,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    timeSlot: input.timeSlot
  });

  // Very lightweight input sanity check for early feedback during integration
  if (!input.locationId) {
    throw new Error('locationId is required');
  }
  if (!input.date) {
    throw new Error('date is required');
  }
  if (input.resourceType === 'room' && !input.resourceId) {
    // In a real API, this would be a 400 error
    throw new Error('resourceId is required when resourceType is "room"');
  }

  // Simulate network/request time
  await delay(500);

  // Return a successful, confirmed booking
  return {
    bookingId: generateId(),
    status: 'confirmed',
    message: `Booking created (placeholder) for user ${ctx.username}`,
  };
}
