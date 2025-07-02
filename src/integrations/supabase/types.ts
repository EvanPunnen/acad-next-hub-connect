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
      assignments: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          grade: string | null
          id: string
          status: string | null
          student_id: string | null
          subject_code: string
          subject_name: string
          submission_url: string | null
          submitted_at: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
          subject_code: string
          subject_name: string
          submission_url?: string | null
          submitted_at?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          grade?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
          subject_code?: string
          subject_name?: string
          submission_url?: string | null
          submitted_at?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          created_at: string | null
          date: string
          id: string
          marked_at: string | null
          status: string | null
          student_id: string | null
          subject_code: string
          subject_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          marked_at?: string | null
          status?: string | null
          student_id?: string | null
          subject_code: string
          subject_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          marked_at?: string | null
          status?: string | null
          student_id?: string | null
          subject_code?: string
          subject_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      bus_bookings: {
        Row: {
          booking_date: string
          created_at: string
          id: string
          status: string | null
          student_id: string | null
          transport_id: string | null
        }
        Insert: {
          booking_date: string
          created_at?: string
          id?: string
          status?: string | null
          student_id?: string | null
          transport_id?: string | null
        }
        Update: {
          booking_date?: string
          created_at?: string
          id?: string
          status?: string | null
          student_id?: string | null
          transport_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bus_bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bus_bookings_transport_id_fkey"
            columns: ["transport_id"]
            isOneToOne: false
            referencedRelation: "transport"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          institution: string | null
          message: string
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          institution?: string | null
          message: string
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          institution?: string | null
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          event_id: string | null
          id: string
          registered_at: string
          student_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          registered_at?: string
          student_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          registered_at?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string
          event_date: string
          event_type: string | null
          id: string
          location: string | null
          max_participants: number | null
          start_time: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time: string
          event_date: string
          event_type?: string | null
          id?: string
          location?: string | null
          max_participants?: number | null
          start_time: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string
          event_date?: string
          event_type?: string | null
          id?: string
          location?: string | null
          max_participants?: number | null
          start_time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fees: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string | null
          fee_type: string
          id: string
          paid_date: string | null
          payment_method: string | null
          status: string | null
          student_id: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date?: string | null
          fee_type: string
          id?: string
          paid_date?: string | null
          payment_method?: string | null
          status?: string | null
          student_id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string | null
          fee_type?: string
          id?: string
          paid_date?: string | null
          payment_method?: string | null
          status?: string | null
          student_id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fees_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          faculty_id: string | null
          full_name: string | null
          id: string
          institution: string | null
          phone: string | null
          role: string | null
          student_id: string | null
          updated_at: string | null
          year: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          faculty_id?: string | null
          full_name?: string | null
          id: string
          institution?: string | null
          phone?: string | null
          role?: string | null
          student_id?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          faculty_id?: string | null
          full_name?: string | null
          id?: string
          institution?: string | null
          phone?: string | null
          role?: string | null
          student_id?: string | null
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      results: {
        Row: {
          academic_year: string | null
          created_at: string | null
          exam_type: string
          grade: string | null
          id: string
          marks_obtained: number | null
          semester: number | null
          subject_code: string
          subject_name: string
          total_marks: number | null
          user_id: string | null
        }
        Insert: {
          academic_year?: string | null
          created_at?: string | null
          exam_type: string
          grade?: string | null
          id?: string
          marks_obtained?: number | null
          semester?: number | null
          subject_code: string
          subject_name: string
          total_marks?: number | null
          user_id?: string | null
        }
        Update: {
          academic_year?: string | null
          created_at?: string | null
          exam_type?: string
          grade?: string | null
          id?: string
          marks_obtained?: number | null
          semester?: number | null
          subject_code?: string
          subject_name?: string
          total_marks?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string
          email: string
          faculty_id: string | null
          full_name: string
          id: string
          phone: string | null
          semester: number
          student_id: string
          updated_at: string
          year: number
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department: string
          email: string
          faculty_id?: string | null
          full_name: string
          id?: string
          phone?: string | null
          semester: number
          student_id: string
          updated_at?: string
          year: number
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string
          email?: string
          faculty_id?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          semester?: number
          student_id?: string
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      timetable: {
        Row: {
          created_at: string | null
          day_of_week: number | null
          end_time: string
          faculty_id: string | null
          faculty_name: string | null
          id: string
          room_number: string | null
          semester: number | null
          start_time: string
          subject_code: string
          subject_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: number | null
          end_time: string
          faculty_id?: string | null
          faculty_name?: string | null
          id?: string
          room_number?: string | null
          semester?: number | null
          start_time: string
          subject_code: string
          subject_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number | null
          end_time?: string
          faculty_id?: string | null
          faculty_name?: string | null
          id?: string
          room_number?: string | null
          semester?: number | null
          start_time?: string
          subject_code?: string
          subject_name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "timetable_faculty_id_fkey"
            columns: ["faculty_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transport: {
        Row: {
          bus_number: string
          capacity: number
          created_at: string
          created_by: string | null
          driver_name: string
          driver_phone: string
          id: string
          is_available: boolean | null
          route_details: string | null
          route_name: string
        }
        Insert: {
          bus_number: string
          capacity: number
          created_at?: string
          created_by?: string | null
          driver_name: string
          driver_phone: string
          id?: string
          is_available?: boolean | null
          route_details?: string | null
          route_name: string
        }
        Update: {
          bus_number?: string
          capacity?: number
          created_at?: string
          created_by?: string | null
          driver_name?: string
          driver_phone?: string
          id?: string
          is_available?: boolean | null
          route_details?: string | null
          route_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "transport_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
