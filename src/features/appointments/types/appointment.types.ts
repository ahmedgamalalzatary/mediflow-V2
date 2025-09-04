// appointment.types - Appointments Feature
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  type: 'consultation' | 'follow_up' | 'emergency';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingRequest {
  doctorId: string;
  scheduledAt: string;
  duration: number;
  type: 'consultation' | 'follow_up' | 'emergency';
  notes?: string;
}

export interface AppointmentFilter {
  status?: string[];
  type?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}
