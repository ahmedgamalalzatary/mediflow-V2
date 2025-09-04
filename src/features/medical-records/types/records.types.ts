// records.types
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId?: string;
  title: string;
  description: string;
  category: 'lab_result' | 'prescription' | 'diagnosis' | 'imaging' | 'other';
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadRecordData {
  title: string;
  description: string;
  category: string;
  file?: File;
}
