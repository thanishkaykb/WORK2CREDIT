import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Avatar } from '../ui/index'
import { cn } from '../../lib/utils'
import {
  LayoutDashboard, Search, Calendar, CreditCard, Star, MessageSquare,
  Bell, Settings, Shield, Users, BarChart2, FileText, Briefcase,
  ChevronLeft, ChevronRight, LogOut, Award, AlertTriangle, CheckSquare,
  Wallet, UserCheck, ClipboardList, Menu
} from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  badge?: number
}

const workerNavItems: NavItem[] = [
  { label: 'Dashboard',        path: '/dashboard/worker',           icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Services',      path: '/dashboard/worker/services',  icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Bookings',         path: '/dashboard/worker/bookings',  icon: <Calendar className="w-4 h-4" /> },
  { label: 'Job Board',        path: '/jobs',                       icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Availability',     path: '/dashboard/worker/availability', icon: <CheckSquare className="w-4 h-4" /> },
  { label: 'Earnings',         path: '/dashboard/worker/earnings',  icon: <Wallet className="w-4 h-4" /> },
  { label: 'Transactions',     path: '/dashboard/worker/transactions', icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Reviews',          path: '/dashboard/worker/reviews',   icon: <Star className="w-4 h-4" /> },
  { label: 'Work2Credit Score',path: '/score',                      icon: <Award className="w-4 h-4" /> },
  { label: 'Portfolio',        path: '/dashboard/worker/portfolio', icon: <FileText className="w-4 h-4" /> },
  { label: 'Verification',     path: '/verification',               icon: <UserCheck className="w-4 h-4" /> },
  { label: 'Messages',         path: '/messages',                   icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Notifications',    path: '/notifications',              icon: <Bell className="w-4 h-4" /> },
  { label: 'Disputes',         path: '/disputes',                   icon: <AlertTriangle className="w-4 h-4" /> },
  { label: 'Settings',         path: '/settings',                   icon: <Settings className="w-4 h-4" /> },
]

const customerNavItems: NavItem[] = [
  { label: 'Dashboard',        path: '/dashboard/customer',             icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Find Services',    path: '/marketplace',                    icon: <Search className="w-4 h-4" /> },
  { label: 'My Bookings',      path: '/dashboard/customer/bookings',    icon: <Calendar className="w-4 h-4" /> },
  { label: 'Job Requests',     path: '/dashboard/customer/jobs',        icon: <Briefcase className="w-4 h-4" /> },
  { label: 'Saved Workers',    path: '/dashboard/customer/saved',       icon: <Star className="w-4 h-4" /> },
  { label: 'Transactions',     path: '/dashboard/customer/transactions',icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Messages',         path: '/messages',                       icon: <MessageSquare className="w-4 h-4" /> },
  { label: 'Notifications',    path: '/notifications',                  icon: <Bell className="w-4 h-4" /> },
  { label: 'Disputes',         path: '/disputes',                       icon: <AlertTriangle className="w-4 h-4" /> },
  { label: 'Settings',         path: '/settings',                       icon: <Settings className="w-4 h-4" /> },
]

const adminNavItems: NavItem[] = [
  { label: 'Overview',         path: '/admin',                      icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Users',            path: '/admin/users',                icon: <Users className="w-4 h-4" /> },
  { label: 'Verifications',    path: '/admin/verifications',        icon: <UserCheck className="w-4 h-4" /> },
  { label: 'Bookings',         path: '/admin/bookings',             icon: <Calendar className="w-4 h-4" /> },
  { label: 'Transactions',     path: '/admin/transactions',         icon: <CreditCard className="w-4 h-4" /> },
  { label: 'Reviews',          path: '/admin/reviews',              icon: <Star className="w-4 h-4" /> },
  { label: 'Disputes',         path: '/admin/disputes',             icon: <AlertTriangle className="w-4 h-4" /> },
  { label: 'Score Config',     path: '/admin/score-config',         icon: <Award className="w-4 h-4" /> },
  { label: 'Analytics',        path: '/admin/analytics',            icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Categories',       path: '/admin/categories',           icon: <ClipboardList className="w-4 h-4" /> },
  { label: 'Audit Logs',       path: '/admin/audit',                icon: <Shield className="w-4 h-4" /> },
  { label: 'Settings',         path: '/settings',                   icon: <Settings className="w-4 h-4" /> },
]

interface SidebarProps {
  type: 'worker' | 'customer' | 'admin'
}

export function Sidebar({ type }: SidebarProps) {
  const location = useLocation()
  const { profile, signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = type === 'admin' ? adminNavItems : type === 'worker' ? workerNavItems : customerNavItems

  const isActive = (path: string) =>
    path === '/dashboard/worker' || path === '/dashboard/customer' || path === '/admin'
      ? location.pathname === path
      : location.pathname.startsWith(path)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + Collapse button */}
      <div className={cn('flex items-center h-16 px-4 border-b border-teal-100 flex-shrink-0', collapsed ? 'justify-center' : 'justify-between')}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-600 to-mint-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">W2</span>
            </div>
            <span className="text-sm font-bold text-teal-900">Work2Credit</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-teal-50 text-teal-400 transition-colors"
          id="sidebar-collapse-btn"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Profile summary */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-teal-50">
          <div className="flex items-center gap-3">
            <Avatar src={profile?.avatar_url} name={profile?.full_name || 'User'} size="sm" ring />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-teal-900 truncate">{profile?.full_name}</p>
              <p className="text-xs text-teal-500 truncate capitalize">{type} account</p>
            </div>
          </div>
          {type === 'worker' && profile?.work2credit_score != null && (
            <div className="mt-3 flex items-center justify-between bg-teal-50 rounded-lg px-3 py-2">
              <span className="text-xs text-teal-600 font-medium">Score</span>
              <span className="text-sm font-bold text-teal-700">{profile.work2credit_score}</span>
            </div>
          )}
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-3 space-y-0.5">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'nav-item',
              collapsed ? 'justify-center px-2' : '',
              isActive(item.path) && 'nav-item-active'
            )}
            title={collapsed ? item.label : undefined}
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge ? (
              <span className="ml-auto bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                {item.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className={cn('px-2 py-3 border-t border-teal-100', collapsed ? 'flex justify-center' : '')}>
        <button
          onClick={signOut}
          className={cn(
            'nav-item w-full text-red-600 hover:bg-red-50 hover:text-red-700',
            collapsed ? 'justify-center px-2' : ''
          )}
          title={collapsed ? 'Sign Out' : undefined}
          id="sidebar-signout-btn"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-teal-100 h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-teal-50 text-teal-600"
          id="mobile-sidebar-toggle"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-semibold text-teal-900">
          {type === 'admin' ? 'Admin' : type === 'worker' ? 'Worker' : 'Customer'} Dashboard
        </span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-white shadow-xl h-full overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 bg-white border-r border-teal-100 transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <SidebarContent />
      </aside>
    </>
  )
}
