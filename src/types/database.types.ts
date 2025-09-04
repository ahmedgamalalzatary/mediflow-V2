// Mediflow Database Types
// Generated TypeScript types for Supabase database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_logs: {
        Row: {
          id: string
          admin_id: string
          action: string
          target_type: string
          target_id: string
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_id: string
          action: string
          target_type: string
          target_id: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string
          action?: string
          target_type?: string
          target_id?: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          duration_minutes: number | null
          status: Database["public"]["Enums"]["appointment_status"]
          reason_for_visit: string | null
          notes: string | null
          patient_notes: string | null
          consultation_fee: number | null
          cancelled_by: string | null
          cancellation_reason: string | null
          rescheduled_from: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          duration_minutes?: number | null
          status?: Database["public"]["Enums"]["appointment_status"]
          reason_for_visit?: string | null
          notes?: string | null
          patient_notes?: string | null
          consultation_fee?: number | null
          cancelled_by?: string | null
          cancellation_reason?: string | null
          rescheduled_from?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          appointment_date?: string
          appointment_time?: string
          duration_minutes?: number | null
          status?: Database["public"]["Enums"]["appointment_status"]
          reason_for_visit?: string | null
          notes?: string | null
          patient_notes?: string | null
          consultation_fee?: number | null
          cancelled_by?: string | null
          cancellation_reason?: string | null
          rescheduled_from?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_rescheduled_from_fkey"
            columns: ["rescheduled_from"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          }
        ]
      }
      doctor_availability: {
        Row: {
          id: string
          doctor_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_available?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          }
        ]
      }
      doctors: {
        Row: {
          id: string
          license_number: string
          specialties: string[]
          qualifications: string[]
          experience_years: number | null
          bio: string | null
          consultation_fee: number | null
          verification_status: Database["public"]["Enums"]["verification_status"]
          verification_documents: Json | null
          verified_at: string | null
          verified_by: string | null
          rating: number | null
          total_reviews: number | null
          languages: string[] | null
          hospital_affiliations: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          license_number: string
          specialties: string[]
          qualifications: string[]
          experience_years?: number | null
          bio?: string | null
          consultation_fee?: number | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verification_documents?: Json | null
          verified_at?: string | null
          verified_by?: string | null
          rating?: number | null
          total_reviews?: number | null
          languages?: string[] | null
          hospital_affiliations?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          license_number?: string
          specialties?: string[]
          qualifications?: string[]
          experience_years?: number | null
          bio?: string | null
          consultation_fee?: number | null
          verification_status?: Database["public"]["Enums"]["verification_status"]
          verification_documents?: Json | null
          verified_at?: string | null
          verified_by?: string | null
          rating?: number | null
          total_reviews?: number | null
          languages?: string[] | null
          hospital_affiliations?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string | null
          appointment_id: string | null
          title: string
          description: string | null
          record_type: Database["public"]["Enums"]["record_type"]
          record_date: string
          file_urls: string[] | null
          metadata: Json | null
          is_private: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id?: string | null
          appointment_id?: string | null
          title: string
          description?: string | null
          record_type: Database["public"]["Enums"]["record_type"]
          record_date: string
          file_urls?: string[] | null
          metadata?: Json | null
          is_private?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string | null
          appointment_id?: string | null
          title?: string
          description?: string | null
          record_type?: Database["public"]["Enums"]["record_type"]
          record_date?: string
          file_urls?: string[] | null
          metadata?: Json | null
          is_private?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          appointment_id: string | null
          content: string
          message_type: string | null
          file_url: string | null
          status: Database["public"]["Enums"]["message_status"]
          read_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          appointment_id?: string | null
          content: string
          message_type?: string | null
          file_url?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          read_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          receiver_id?: string
          appointment_id?: string | null
          content?: string
          message_type?: string | null
          file_url?: string | null
          status?: Database["public"]["Enums"]["message_status"]
          read_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          address: Json | null
          role: Database["public"]["Enums"]["user_role"]
          is_active: boolean | null
          email_verified: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          is_active?: boolean | null
          email_verified?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          is_active?: boolean | null
          email_verified?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          appointment_id: string
          rating: number
          comment: string | null
          is_anonymous: boolean | null
          is_published: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          appointment_id: string
          rating: number
          comment?: string | null
          is_anonymous?: boolean | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          appointment_id?: string
          rating?: number
          comment?: string | null
          is_anonymous?: boolean | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: true
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_doctor: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_patient: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      appointment_status: "pending" | "confirmed" | "cancelled" | "completed" | "rescheduled"
      message_status: "sent" | "delivered" | "read"
      record_type: "prescription" | "lab_result" | "diagnosis" | "treatment_plan" | "medical_history"
      user_role: "patient" | "doctor" | "admin"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
