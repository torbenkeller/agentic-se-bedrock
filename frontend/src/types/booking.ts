// Booking types for Calvin prototype
// Based on AR006 user story requirements

export interface BookingTimeSlot {
  start: string; // Format: "HH:mm"
  end: string;   // Format: "HH:mm"
}

export interface BookingRequest {
  locationId: string;
  date: Date;
  timeSlot: BookingTimeSlot;
  isFullDay: boolean;
  resourceType: 'room' | 'workspace';
  resourceId?: string;
}

export interface BookingFormData {
  date?: Date;
  timeSlot?: BookingTimeSlot;
  isFullDay: boolean;
  quickTimeRange?: 'morning' | 'afternoon' | 'fullday';
}

export type BookingStep = 'date' | 'time' | 'resource' | 'confirmation';

export interface BookingState {
  currentStep: BookingStep;
  formData: BookingFormData;
  selectedLocation: string;
  isLoading: boolean;
  error: string | null;
}