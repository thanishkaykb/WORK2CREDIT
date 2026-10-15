import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar } from '../ui/index'
import { Bell, Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Settings } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Navbar() {
  const { isAuthenticated, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const dashboardPath = profile?.is_admin
    ? '/admin'
    : profile?.role === 'worker' || profile?.role === 'both'
    ? '/dashboard/worker'
    : '/dashboard/customer'

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-teal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-mint-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">W2</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base font-bold text-teal-900 leading-tight">Work2Credit</span>
              <span className="text-xs text-teal-500 leading-tight">Your Skills. Your Future.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/marketplace" className="nav-item text-sm">Marketplace</Link>
            <Link to="/jobs" className="nav-item text-sm">Find Jobs</Link>
            <Link to="/how-it-works" className="nav-item text-sm">How It Works</Link>
            {isAuthenticated && (
              <Link to="/score" className="nav-item text-sm">My Score</Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-teal-50 text-teal-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-mint-500 rounded-full" />
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-teal-50 transition-colors"
                    id="profile-menu-btn"
                  >
                    <Avatar
                      src={profile?.avatar_url}
                      name={profile?.full_name || 'User'}
                      size="sm"
                    />
                    <span className="text-sm font-medium text-teal-800 max-w-[120px] truncate">
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                    <ChevronDown className={cn('w-4 h-4 text-teal-400 transition-transform', profileOpen && 'rotate-180')} />
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 card shadow-card-lg z-20 py-1 animate-fade-in">
                        <div className="px-4 py-3 border-b border-teal-50">
                          <p className="font-semibold text-teal-900 text-sm truncate">{profile?.full_name}</p>
                          <p className="text-xs text-teal-500 truncate">{profile?.email}</p>
                        </div>
                        <Link to={dashboardPath} className="flex items-center gap-2 px-4 py-2.5 text-sm text-teal-700 hover:bg-teal-50 transition-colors" onClick={() => setProfileOpen(false)}>
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-teal-700 hover:bg-teal-50 transition-colors" onClick={() => setProfileOpen(false)}>
                          <User className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-teal-700 hover:bg-teal-50 transition-colors" onClick={() => setProfileOpen(false)}>
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <div className="border-t border-teal-50 mt-1">
                          <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm py-2 px-4">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm py-2">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-teal-50 text-teal-600 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-teal-100 bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            <Link to="/marketplace" className="nav-item" onClick={() => setMobileOpen(false)}>Marketplace</Link>
            <Link to="/jobs" className="nav-item" onClick={() => setMobileOpen(false)}>Find Jobs</Link>
            <Link to="/how-it-works" className="nav-item" onClick={() => setMobileOpen(false)}>How It Works</Link>
            {isAuthenticated && (
              <>
                <Link to="/score" className="nav-item" onClick={() => setMobileOpen(false)}>My Score</Link>
                <Link to={dashboardPath} className="nav-item" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/notifications" className="nav-item" onClick={() => setMobileOpen(false)}>Notifications</Link>
                <Link to="/settings" className="nav-item" onClick={() => setMobileOpen(false)}>Settings</Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false) }}
                  className="w-full text-left nav-item text-red-600"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link to="/login" className="btn-secondary flex-1 text-center text-sm py-2" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn-primary flex-1 text-center text-sm py-2" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
