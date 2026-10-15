import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Work2Credit] Supabase credentials missing. ' +
    'Copy .env.example to .env and fill in your local Supabase values. ' +
    'Run `supabase start` to start a local Supabase instance.'
  )
}

export const supabase = createClient<Database>(
  supabaseUrl || 'http://localhost:54321',
  supabaseAnonKey || 'missing-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)

export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'missing-anon-key' &&
  !supabaseAnonKey.includes('demo') &&
  supabaseUrl !== 'http://localhost:54321'
) || (
  supabaseUrl === 'http://localhost:54321' &&
  supabaseAnonKey?.startsWith('eyJ')
)
