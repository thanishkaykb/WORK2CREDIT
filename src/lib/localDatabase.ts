import type { Database, UserRole, VerificationStatus } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface UserAccount {
  id: string
  email: string
  password: string
  created_at: string
  last_login_at?: string
}

const USERS_STORAGE_KEY = 'w2c_db_users_v2'
const PROFILES_STORAGE_KEY = 'w2c_db_profiles_v2'

// Built-in Demo Profiles
const INITIAL_DEMO_PROFILES: Record<string, Profile> = {
  'demo-worker-1': {
    id: 'demo-worker-1',
    email: 'worker@demo.com',
    full_name: 'Rajesh Kumar',
    role: 'both',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    service_radius_km: 25,
    years_experience: 10,
    languages: ['English', 'Hindi', 'Marathi'],
    is_active: true,
    bio: 'Master Electrician & Certified Appliance Specialist with 10+ years experience across residential and commercial projects.',
    identity_verified: 'verified',
    is_admin: false,
    work2credit_score: 847,
    score_updated_at: new Date().toISOString(),
    total_completed_jobs: 127,
    total_earnings: 184500,
    average_rating: 4.9,
    total_reviews: 98,
    profile_completion: 100,
    avatar_url: null,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  'demo-customer-1': {
    id: 'demo-customer-1',
    email: 'customer@demo.com',
    full_name: 'Ananya Sharma',
    role: 'customer',
    phone: '+91 98111 22334',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    service_radius_km: 20,
    years_experience: 0,
    languages: ['English', 'Kannada', 'Hindi'],
    is_active: true,
    bio: 'Homeowner and property manager.',
    identity_verified: 'verified',
    is_admin: false,
    work2credit_score: 720,
    score_updated_at: new Date().toISOString(),
    total_completed_jobs: 14,
    total_earnings: 0,
    average_rating: 5.0,
    total_reviews: 14,
    profile_completion: 90,
    avatar_url: null,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
  'demo-admin-1': {
    id: 'demo-admin-1',
    email: 'admin@demo.com',
    full_name: 'Platform Administrator',
    role: 'both',
    phone: '+91 99999 00000',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    service_radius_km: 100,
    years_experience: 15,
    languages: ['English', 'Hindi'],
    is_active: true,
    bio: 'Work2Credit System Administrator',
    identity_verified: 'verified',
    is_admin: true,
    work2credit_score: 990,
    score_updated_at: new Date().toISOString(),
    total_completed_jobs: 320,
    total_earnings: 520000,
    average_rating: 5.0,
    total_reviews: 210,
    profile_completion: 100,
    avatar_url: null,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: new Date().toISOString(),
  },
}

const INITIAL_DEMO_USERS: UserAccount[] = [
  {
    id: 'demo-worker-1',
    email: 'worker@demo.com',
    password: 'password123',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'demo-customer-1',
    email: 'customer@demo.com',
    password: 'password123',
    created_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 'demo-admin-1',
    email: 'admin@demo.com',
    password: 'password123',
    created_at: '2025-01-01T00:00:00Z',
  },
]

class LocalDatabase {
  private users: Map<string, UserAccount> = new Map()
  private profiles: Map<string, Profile> = new Map()
  private isLoaded = false

  constructor() {
    this.init()
  }

  private init() {
    if (this.isLoaded) return

    try {
      // 1. Load users
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY)
      if (storedUsers) {
        const parsed: UserAccount[] = JSON.parse(storedUsers)
        parsed.forEach(u => this.users.set(u.email.toLowerCase(), u))
      } else {
        // Seed demo users
        INITIAL_DEMO_USERS.forEach(u => this.users.set(u.email.toLowerCase(), u))
        this.saveUsers()
      }

      // 2. Load profiles
      const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY)
      if (storedProfiles) {
        const parsed: Record<string, Profile> = JSON.parse(storedProfiles)
        Object.entries(parsed).forEach(([id, p]) => this.profiles.set(id, p))
      } else {
        // Seed demo profiles
        Object.entries(INITIAL_DEMO_PROFILES).forEach(([id, p]) => this.profiles.set(id, p))
        this.saveProfiles()
      }

      // Ensure demo profiles always exist
      Object.entries(INITIAL_DEMO_PROFILES).forEach(([id, p]) => {
        if (!this.profiles.has(id)) {
          this.profiles.set(id, p)
        }
      })
      INITIAL_DEMO_USERS.forEach(u => {
        if (!this.users.has(u.email.toLowerCase())) {
          this.users.set(u.email.toLowerCase(), u)
        }
      })

      this.isLoaded = true
    } catch (err) {
      console.warn('[LocalDatabase] Storage access restricted or error:', err)
      // Memory fallback
      INITIAL_DEMO_USERS.forEach(u => this.users.set(u.email.toLowerCase(), u))
      Object.entries(INITIAL_DEMO_PROFILES).forEach(([id, p]) => this.profiles.set(id, p))
      this.isLoaded = true
    }
  }

  private saveUsers() {
    try {
      const list = Array.from(this.users.values())
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(list))
    } catch (e) {
      console.error('[LocalDatabase] Failed to persist users:', e)
    }
  }

  private saveProfiles() {
    try {
      const record: Record<string, Profile> = {}
      this.profiles.forEach((p, id) => {
        record[id] = p
      })
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(record))
    } catch (e) {
      console.error('[LocalDatabase] Failed to persist profiles:', e)
    }
  }

  public findUserByEmail(email: string): UserAccount | undefined {
    this.init()
    return this.users.get(email.trim().toLowerCase())
  }

  public findProfileById(id: string): Profile | undefined {
    this.init()
    return this.profiles.get(id)
  }

  public findProfileByEmail(email: string): Profile | undefined {
    this.init()
    const normalized = email.trim().toLowerCase()
    for (const profile of this.profiles.values()) {
      if (profile.email.toLowerCase() === normalized) {
        return profile
      }
    }
    return undefined
  }

  public getAllProfiles(): Profile[] {
    this.init()
    return Array.from(this.profiles.values())
  }

  public getAllWorkers(): Profile[] {
    this.init()
    return Array.from(this.profiles.values()).filter(
      p => p.role === 'worker' || p.role === 'both'
    )
  }

  public registerUser(params: {
    email: string
    password: string
    full_name: string
    phone?: string
    city?: string
    role?: 'worker' | 'customer' | 'both'
  }): { user: UserAccount; profile: Profile } {
    this.init()
    const normalizedEmail = params.email.trim().toLowerCase()

    if (this.users.has(normalizedEmail)) {
      throw new Error('An account with this email address already exists. Please sign in.')
    }

    const userId = 'usr-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36)
    const now = new Date().toISOString()
    const userRole: UserRole = params.role || 'both'

    const newAccount: UserAccount = {
      id: userId,
      email: normalizedEmail,
      password: params.password,
      created_at: now,
      last_login_at: now,
    }

    const newProfile: Profile = {
      id: userId,
      email: normalizedEmail,
      full_name: params.full_name.trim(),
      phone: params.phone?.trim() || null,
      avatar_url: null,
      bio: userRole === 'customer'
        ? `Customer looking for verified home & professional services in ${params.city || 'India'}.`
        : `Professional service specialist located in ${params.city || 'India'}. Verified Work2Credit member.`,
      city: params.city?.trim() || null,
      state: null,
      country: 'India',
      service_radius_km: 25,
      role: userRole,
      years_experience: userRole === 'customer' ? 0 : 3,
      languages: ['English', 'Hindi'],
      is_active: true,
      identity_verified: 'unverified' as VerificationStatus,
      work2credit_score: userRole === 'customer' ? 700 : 725,
      score_updated_at: now,
      total_completed_jobs: 0,
      total_earnings: 0,
      average_rating: 5.0,
      total_reviews: 0,
      profile_completion: 85,
      is_admin: false,
      created_at: now,
      updated_at: now,
    }

    this.users.set(normalizedEmail, newAccount)
    this.profiles.set(userId, newProfile)

    this.saveUsers()
    this.saveProfiles()

    return { user: newAccount, profile: newProfile }
  }

  public authenticate(email: string, password: string): { user: UserAccount; profile: Profile } {
    this.init()
    const normalizedEmail = email.trim().toLowerCase()
    const user = this.users.get(normalizedEmail)

    if (!user) {
      throw new Error('No account found with this email. Please check your spelling or register.')
    }

    // Allow demo accounts to log in with any password or matching password
    const isDemo = user.id.startsWith('demo-')
    if (!isDemo && user.password !== password) {
      throw new Error('Incorrect password. Please try again.')
    }

    let profile = this.profiles.get(user.id)
    if (!profile) {
      // Create fallback profile if somehow missing
      profile = {
        id: user.id,
        email: user.email,
        full_name: 'Work2Credit User',
        phone: null,
        avatar_url: null,
        bio: null,
        city: null,
        state: null,
        country: 'India',
        service_radius_km: 25,
        role: 'both',
        years_experience: 1,
        languages: ['English', 'Hindi'],
        is_active: true,
        identity_verified: 'unverified',
        work2credit_score: 720,
        score_updated_at: new Date().toISOString(),
        total_completed_jobs: 0,
        total_earnings: 0,
        average_rating: 5.0,
        total_reviews: 0,
        profile_completion: 70,
        is_admin: false,
        created_at: user.created_at,
        updated_at: new Date().toISOString(),
      }
      this.profiles.set(user.id, profile)
      this.saveProfiles()
    }

    // Update last login
    user.last_login_at = new Date().toISOString()
    this.saveUsers()

    return { user, profile }
  }

  public updateProfile(userId: string, updates: Partial<Profile>): Profile {
    this.init()
    const existing = this.profiles.get(userId)
    if (!existing) {
      throw new Error('Profile not found')
    }

    const updated: Profile = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString(),
    }

    this.profiles.set(userId, updated)
    this.saveProfiles()
    return updated
  }

  public resetPassword(email: string, newPassword: string): boolean {
    this.init()
    const normalizedEmail = email.trim().toLowerCase()
    const user = this.users.get(normalizedEmail)
    if (!user) {
      return false
    }

    user.password = newPassword
    this.saveUsers()
    return true
  }
}

export const localDatabase = new LocalDatabase()
