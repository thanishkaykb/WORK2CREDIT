import React, { createContext, useContext, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'

const AuthContext = createContext<{ isReady: boolean }>({ isReady: false })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setSession, fetchProfile, setLoading, setInitialized, reset } = useAuthStore()

  useEffect(() => {
    const currentUser = useAuthStore.getState().user

    // If a user is already loaded from persistent storage, ensure their profile is fresh
    if (currentUser?.id) {
      fetchProfile(currentUser.id)
    }

    // Check for Supabase session if Supabase is running/configured
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session)
        setUser(session.user)
        fetchProfile(session.user.id).finally(() => {
          setLoading(false)
          setInitialized(true)
        })
      } else {
        // If there's already a persistent user in the store (local or demo), preserve them!
        const existingUser = useAuthStore.getState().user
        if (!existingUser) {
          setSession(null)
          setUser(null)
        }
        setLoading(false)
        setInitialized(true)
      }
    }).catch(() => {
      // Offline fallback: keep existing persistent user intact
      setLoading(false)
      setInitialized(true)
    })

    // Listen for auth changes on Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        const currentUser = useAuthStore.getState().user
        // Only trigger reset if signed out from Supabase and user wasn't a local session
        if (!currentUser?.id?.startsWith('usr-') && !currentUser?.id?.startsWith('demo-')) {
          reset()
        }
        return
      }

      if (session?.user) {
        setSession(session)
        setUser(session.user)
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setLoading(true)
          await fetchProfile(session.user.id)
          setLoading(false)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ isReady: true }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const store = useAuthStore()
  return {
    user: store.user,
    session: store.session,
    profile: store.profile,
    isLoading: store.isLoading,
    isInitialized: store.isInitialized,
    isAuthenticated: !!store.user,
    isWorker: store.profile?.role === 'worker' || store.profile?.role === 'both',
    isCustomer: store.profile?.role === 'customer' || store.profile?.role === 'both',
    isAdmin: store.profile?.is_admin === true,
    loginWithEmail: store.loginWithEmail,
    registerWithEmail: store.registerWithEmail,
    updateProfile: store.updateProfile,
    loginAsDemo: store.loginAsDemo,
    signOut: store.signOut,
    fetchProfile: store.fetchProfile,
    setProfile: store.setProfile,
  }
}
