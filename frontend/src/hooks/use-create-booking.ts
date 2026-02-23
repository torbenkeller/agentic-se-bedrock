import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { createBooking, type CreateBookingInput, type CreateBookingResponse } from '@/lib/bookings';
import { createRoomAvailabilityQueryKey } from './use-room-availability';
import { useCurrentUser } from '@/hooks/use-current-user';

/**
 * Custom hook to create a booking.
 * - Wraps React Query's useMutation for createBooking
 * - On success, invalidates room availability queries to refresh UI
 */
export function useCreateBooking(
  options?: UseMutationOptions<CreateBookingResponse, Error, CreateBookingInput>
) {
  const queryClient = useQueryClient();
  const user = useCurrentUser();

  return useMutation<CreateBookingResponse, Error, CreateBookingInput>({
    mutationFn: (variables) => createBooking(variables, { username: user.username }),
    ...options,
    onSuccess: async (data, variables, context) => {
      try {
        // Invalidate related room availability queries after booking is created
        if (variables.resourceType === 'room' && variables.resourceId) {
          // Invalidate the specific room+date availability
          const exactKey = createRoomAvailabilityQueryKey(variables.resourceId, variables.date, variables.timeSlot);
          await queryClient.invalidateQueries({ queryKey: exactKey, exact: true });

          // Invalidate all availability entries for that room (other dates) if any are cached
          await queryClient.invalidateQueries({
            queryKey: ['room-availability', variables.resourceId],
            exact: false,
          });
        } else {
          // Fallback: invalidate all room availability queries
          await queryClient.invalidateQueries({ queryKey: ['room-availability'], exact: false });
        }
      } finally {
        // Run any consumer-provided onSuccess handler after invalidation
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      }
    },
  });
}
