import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { localDatabase, type Profile } from '../lib/localDatabase'

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void
  loginWithEmail: (email: string, password: string) => Promise<{ success: boolean; profile?: Profile; error?: string }>
  registerWithEmail: (params: {
    email: string
    password: string
    full_name: string
    phone?: string
    city?: string
    role?: 'worker' | 'customer' | 'both'
  }) => Promise<{ success: boolean; profile?: Profile; error?: string }>
  updateProfile: (updates: Partial<Profile>) => Promise<Profile | null>
  loginAsDemo: (role: 'worker' | 'customer' | 'admin') => void
  fetchProfile: (userId: string) => Promise<void>
  signOut: () => Promise<void>
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      isLoading: false,
      isInitialized: true,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized }),

      loginWithEmail: async (email: string, password: string) => {
        try {
          set({ isLoading: true })
          const normalized = email.trim().toLowerCase()

          // 1. Try localDatabase first
          try {
            const { profile } = localDatabase.authenticate(normalized, password)

            const mockUser: User = {
              id: profile.id,
              app_metadata: {},
              user_metadata: { full_name: profile.full_name, phone: profile.phone, city: profile.city },
              aud: 'authenticated',
              created_at: profile.created_at,
              email: profile.email,
            } as any

            const mockSession: Session = {
              access_token: 'w2c_token_' + profile.id,
              token_type: 'bearer',
              expires_in: 3600 * 24 * 30,
              expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 30,
              refresh_token: 'w2c_ref_' + profile.id,
              user: mockUser,
            } as any

            set({
              user: mockUser,
              profile,
              session: mockSession,
              isLoading: false,
              isInitialized: true,
            })

            return { success: true, profile }
          } catch (localErr: any) {
            // If the user entered an incorrect password for an existing account, stop immediately
            if (localErr.message?.includes('Incorrect password')) {
              set({ isLoading: false })
              return { success: false, error: localErr.message }
            }

            // If account was not found locally, attempt Supabase if configured
            try {
              const { data: authData, error: sbError } = await supabase.auth.signInWithPassword({
                email: normalized,
                password,
              })

              if (!sbError && authData.user) {
                await get().fetchProfile(authData.user.id)
                set({
                  user: authData.user,
                  session: authData.session,
                  isLoading: false,
                  isInitialized: true,
                })
                return { success: true, profile: get().profile || undefined }
              }
            } catch {
              // Supabase offline
            }

            set({ isLoading: false })
            return {
              success: false,
              error: localErr.message || 'No account found with this email. Please check your spelling or register.',
            }
          }
        } catch (err: any) {
          set({ isLoading: false })
          return { success: false, error: err.message || 'An unexpected error occurred during login.' }
        }
      },

      registerWithEmail: async (params) => {
        try {
          set({ isLoading: true })
          const { profile } = localDatabase.registerUser(params)

          const mockUser: User = {
            id: profile.id,
            app_metadata: {},
            user_metadata: { full_name: profile.full_name, phone: profile.phone, city: profile.city },
            aud: 'authenticated',
            created_at: profile.created_at,
            email: profile.email,
          } as any

          const mockSession: Session = {
            access_token: 'w2c_token_' + profile.id,
            token_type: 'bearer',
            expires_in: 3600 * 24 * 30,
            expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 30,
            refresh_token: 'w2c_ref_' + profile.id,
            user: mockUser,
          } as any

          set({
            user: mockUser,
            profile,
            session: mockSession,
            isLoading: false,
            isInitialized: true,
          })

          return { success: true, profile }
        } catch (err: any) {
          set({ isLoading: false })
          return { success: false, error: err.message || 'Registration failed.' }
        }
      },

      updateProfile: async (updates: Partial<Profile>) => {
        const currentProfile = get().profile
        if (!currentProfile) return null

        try {
          const updated = localDatabase.updateProfile(currentProfile.id, updates)
          set({ profile: updated })

          // Also attempt Supabase update if online
          try {
            await (supabase.from('profiles') as any).update(updates).eq('id', currentProfile.id)
          } catch {
            // safe ignore if offline
          }

          return updated
        } catch (err) {
          console.error('[Auth] Failed to update profile:', err)
          return null
        }
      },

      loginAsDemo: (role) => {
        const emailMap: Record<string, string> = {
          worker: 'worker@demo.com',
          customer: 'customer@demo.com',
          admin: 'admin@demo.com',
        }
        const email = emailMap[role]
        const profile = localDatabase.findProfileByEmail(email) || localDatabase.findProfileById(`demo-${role}-1`)
        if (!profile) return

        const mockUser: User = {
          id: profile.id,
          app_metadata: {},
          user_metadata: { full_name: profile.full_name },
          aud: 'authenticated',
          created_at: profile.created_at,
          email: profile.email,
        } as any

        const mockSession: Session = {
          access_token: 'w2c_token_' + profile.id,
          token_type: 'bearer',
          expires_in: 3600 * 24 * 30,
          expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 30,
          refresh_token: 'w2c_ref_' + profile.id,
          user: mockUser,
        } as any

        set({
          user: mockUser,
          profile,
          session: mockSession,
          isLoading: false,
          isInitialized: true,
        })
      },

      fetchProfile: async (userId: string) => {
        try {
          // Check local database first
          const local = localDatabase.findProfileById(userId)
          if (local) {
            set({ profile: local })
            return
          }

          // Fallback to Supabase query if available
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

          if (!error && data) {
            set({ profile: data })
          }
        } catch (err) {
          console.error('[Auth] fetchProfile error:', err)
        }
      },

      signOut: async () => {
        try {
          await supabase.auth.signOut()
        } catch {
          // ignore error if supabase offline
        }
        get().reset()
      },

      reset: () => set({
        user: null,
        session: null,
        profile: null,
        isLoading: false,
      }),
    }),
    {
      name: 'w2c-auth',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session,
      }),
    }
  )
)
