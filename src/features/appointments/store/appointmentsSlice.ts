// appointmentsSlice - Appointments Feature
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Appointment } from '../types/appointment.types';

export interface AppointmentsState {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  isLoading: false,
  error: null,
};

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
      state.error = null;
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(apt => apt.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const appointmentsActions = appointmentsSlice.actions;

export const appointmentsSelectors = {
  selectAppointments: (state: { appointments: AppointmentsState }) => state.appointments.appointments,
  selectIsLoading: (state: { appointments: AppointmentsState }) => state.appointments.isLoading,
  selectError: (state: { appointments: AppointmentsState }) => state.appointments.error,
};

export default appointmentsSlice;
