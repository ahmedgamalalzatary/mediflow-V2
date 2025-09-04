// Global Types - database.types
// Auto-generated types from Supabase will be placed here

export interface Database {
  // Database schema types will be defined here
}

export type Tables<T extends keyof Database> = Database[T] extends {
  Row: infer R;
} ? R : never;

export type Enums<T extends keyof Database> = Database[T] extends {
  Enum: infer E;
} ? E : never;
