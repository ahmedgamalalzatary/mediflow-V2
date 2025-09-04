// reviews.types
export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  rating: number; // 1-5
  comment: string;
  appointmentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  doctorId: string;
  rating: number;
  comment: string;
  appointmentId?: string;
}
