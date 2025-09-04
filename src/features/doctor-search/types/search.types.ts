// search.types
export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  location: string;
  rating: number;
  availability: TimeSlot[];
}

export interface SearchFilters {
  specialization?: string;
  location?: string;
  rating?: number;
  availability?: string;
}

export interface TimeSlot {
  start: string;
  end: string;
}
