export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'worker' | 'customer' | 'both' | 'admin'
export type BookingStatus = 'pending' | 'accepted' | 'declined' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'
export type TransactionStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'disputed' | 'awaiting_confirmation'
export type PaymentMethod = 'upi' | 'card' | 'cash' | 'razorpay' | 'stripe' | 'other'
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
export type PricingModel = 'fixed' | 'hourly' | 'quotation'
export type JobStatus = 'open' | 'in_review' | 'assigned' | 'completed' | 'cancelled'
export type ApplicationStatus = 'pending' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn'
export type DisputeStatus = 'open' | 'under_review' | 'resolved' | 'closed'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          phone: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          state: string | null
          country: string
          service_radius_km: number
          role: UserRole
          years_experience: number
          languages: string[]
          is_active: boolean
          identity_verified: VerificationStatus
          work2credit_score: number | null
          score_updated_at: string | null
          total_completed_jobs: number
          total_earnings: number
          average_rating: number
          total_reviews: number
          profile_completion: number
          is_admin: boolean
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at' | 'total_completed_jobs' | 'total_earnings' | 'average_rating' | 'total_reviews' | 'profile_completion'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      skills: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          worker_id: string
          category: string
          title: string
          description: string
          pricing_model: PricingModel
          price: number | null
          hourly_rate: number | null
          is_active: boolean
          min_hours: number | null
          max_hours: number | null
          is_verified: boolean
        }
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['skills']['Insert']>
      }
      portfolio_items: {
        Row: {
          id: string
          created_at: string
          worker_id: string
          skill_id: string | null
          title: string
          description: string | null
          image_url: string
          is_featured: boolean
        }
        Insert: Omit<Database['public']['Tables']['portfolio_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['portfolio_items']['Insert']>
      }
      certificates: {
        Row: {
          id: string
          created_at: string
          worker_id: string
          skill_id: string | null
          title: string
          issuer: string
          issued_date: string | null
          expiry_date: string | null
          document_url: string | null
          verification_status: VerificationStatus
        }
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>
      }
      jobs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          customer_id: string
          title: string
          description: string
          category: string
          city: string
          state: string | null
          budget_min: number | null
          budget_max: number | null
          preferred_date: string | null
          status: JobStatus
          assigned_worker_id: string | null
          attachments: string[]
        }
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>
      }
      job_applications: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          job_id: string
          worker_id: string
          quoted_price: number
          message: string
          estimated_days: number | null
          status: ApplicationStatus
        }
        Insert: Omit<Database['public']['Tables']['job_applications']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['job_applications']['Insert']>
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          customer_id: string
          worker_id: string
          skill_id: string
          job_id: string | null
          job_address: string
          job_description: string
          scheduled_date: string
          scheduled_time: string
          estimated_hours: number | null
          agreed_price: number
          status: BookingStatus
          payment_method: PaymentMethod
          payment_status: TransactionStatus
          worker_notes: string | null
          customer_notes: string | null
          completion_confirmed_by_customer: boolean
          completion_confirmed_by_worker: boolean
          cancelled_at: string | null
          cancelled_by: string | null
          cancellation_reason: string | null
        }
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>
      }
      availability_slots: {
        Row: {
          id: string
          worker_id: string
          date: string
          start_time: string
          end_time: string
          is_available: boolean
          booking_id: string | null
        }
        Insert: Omit<Database['public']['Tables']['availability_slots']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['availability_slots']['Insert']>
      }
      transactions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          booking_id: string
          customer_id: string
          worker_id: string
          amount: number
          platform_fee: number
          worker_payout: number
          payment_method: PaymentMethod
          status: TransactionStatus
          payment_gateway: string | null
          gateway_transaction_id: string | null
          gateway_order_id: string | null
          receipt_url: string | null
          is_verified: boolean
          cash_confirmed_by_customer: boolean
          cash_confirmed_by_worker: boolean
          disputed_at: string | null
          refunded_at: string | null
          refund_amount: number | null
        }
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['transactions']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          created_at: string
          booking_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          is_worker_review: boolean
          is_verified_booking: boolean
          is_hidden: boolean
          hidden_reason: string | null
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
      }
      score_snapshots: {
        Row: {
          id: string
          created_at: string
          worker_id: string
          score: number
          score_label: string
          confidence: string
          completed_jobs: number
          verified_earnings: number
          average_rating: number
          completion_rate: number
          payment_reliability: number
          repeat_customers: number
          skills_verified: number
          components: Json
        }
        Insert: Omit<Database['public']['Tables']['score_snapshots']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['score_snapshots']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          action_url: string | null
          related_id: string | null
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
      disputes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          booking_id: string
          raised_by: string
          reason: string
          description: string
          status: DisputeStatus
          resolution: string | null
          resolved_by: string | null
          resolved_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['disputes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['disputes']['Insert']>
      }
      messages: {
        Row: {
          id: string
          created_at: string
          booking_id: string
          sender_id: string
          content: string
          is_read: boolean
          attachment_url: string | null
        }
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      verification_requests: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          worker_id: string
          document_type: string
          document_url: string
          status: VerificationStatus
          reviewer_id: string | null
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['verification_requests']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['verification_requests']['Insert']>
      }
      service_categories: {
        Row: {
          id: string
          name: string
          icon: string
          description: string | null
          is_active: boolean
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['service_categories']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['service_categories']['Insert']>
      }
      saved_workers: {
        Row: {
          id: string
          created_at: string
          customer_id: string
          worker_id: string
        }
        Insert: Omit<Database['public']['Tables']['saved_workers']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['saved_workers']['Insert']>
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
  }
}
