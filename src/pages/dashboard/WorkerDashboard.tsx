import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { StatCard, Avatar, StarRating, EmptyState, Alert } from '../../components/ui/index'
import { Badge } from '../../components/ui/Badge'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency, formatDate, getScoreLabel, getBookingStatusConfig } from '../../lib/utils'
import {
  TrendingUp, Calendar, Star, Wallet, Award, Plus, ArrowRight,
  CheckCircle, Clock, AlertCircle, Briefcase, Bell
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Demo data - in production, all data comes from Supabase queries
const DEMO_EARNINGS = [
  { month: 'Apr', earnings: 12500 },
  { month: 'May', earnings: 18000 },
  { month: 'Jun', earnings: 15000 },
  { month: 'Jul', earnings: 22000 },
  { month: 'Aug', earnings: 19500 },
  { month: 'Sep', earnings: 28000 },
  { month: 'Oct', earnings: 24000 },
]

const DEMO_BOOKINGS = [
  { id: '1', customer: 'Ananya S.',    service: 'Electrical Repair',  date: '2026-10-16', time: '10:00 AM', amount: 1500, status: 'accepted' },
  { id: '2', customer: 'Rahul M.',     service: 'Wiring Installation', date: '2026-10-17', time: '2:00 PM',  amount: 3500, status: 'pending' },
  { id: '3', customer: 'Priya K.',     service: 'Fan Installation',    date: '2026-10-14', time: '11:00 AM', amount: 800,  status: 'completed' },
  { id: '4', customer: 'Suresh V.',    service: 'Electrical Repair',  date: '2026-10-12', time: '9:00 AM',  amount: 2200, status: 'completed' },
]

const DEMO_JOBS = [
  { id: '1', title: 'AC Wiring in new flat', budget: '₹2,000–4,000', city: 'Mumbai', posted: '2h ago', applicants: 3 },
  { id: '2', title: 'Generator installation', budget: '₹5,000–8,000', city: 'Mumbai', posted: '5h ago', applicants: 7 },
  { id: '3', title: 'Circuit board repair',   budget: '₹1,500–3,000', city: 'Thane',  posted: '1d ago', applicants: 2 },
]

export function WorkerDashboard() {
  const { profile } = useAuth()
  const scoreInfo = getScoreLabel(profile?.work2credit_score ?? 720)

  const completedJobs = profile?.total_completed_jobs ?? 127
  const earnings = profile?.total_earnings ?? 284500
  const rating = profile?.average_rating ?? 4.8
  const score = profile?.work2credit_score ?? 720

  return (
    <div className="flex min-h-screen bg-cream-100">
      <Sidebar type="worker" />
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-5 lg:p-8 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-teal-900">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Worker'} 👋
              </h1>
              <p className="text-teal-500 text-sm mt-1">
                {formatDate(new Date().toISOString(), 'EEEE, dd MMMM yyyy')}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/dashboard/worker/services" className="btn-secondary text-sm" id="worker-add-service">
                <Plus className="w-4 h-4" />
                Add Service
              </Link>
              <Link to="/dashboard/worker/availability" className="btn-primary text-sm" id="worker-manage-availability">
                <Calendar className="w-4 h-4" />
                Manage Availability
              </Link>
            </div>
          </div>

          {/* Work2Credit Score Banner */}
          <div className={`rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${scoreInfo.bgColor} border-teal-100`}>
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center border-4 border-teal-200">
                  <div className="text-center">
                    <p className={`text-2xl font-extrabold ${scoreInfo.color}`}>{score}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className={`w-4 h-4 ${scoreInfo.color}`} />
                  <span className={`font-bold ${scoreInfo.color}`}>Work2Credit Score</span>
                  <Badge variant="teal" size="sm">EXPERIMENTAL</Badge>
                </div>
                <p className={`text-2xl font-extrabold ${scoreInfo.color}`}>{scoreInfo.label}</p>
                <p className="text-teal-600 text-sm mt-1">{scoreInfo.description}</p>
              </div>
            </div>
            <Link to="/score" className="btn-primary text-sm flex-shrink-0" id="worker-view-score">
              View Score Details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Supabase config notice */}
          {!profile && (
            <Alert type="warning" title="Demo Mode">
              Showing demo data. Connect Supabase and run the database migrations to see real data from your account.
              <Link to="/settings" className="ml-2 font-semibold underline">Setup Guide</Link>
            </Alert>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Completed Jobs"
              value={completedJobs.toString()}
              icon={<CheckCircle className="w-5 h-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              label="Total Earnings"
              value={formatCurrency(earnings)}
              icon={<Wallet className="w-5 h-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              label="Average Rating"
              value={rating.toFixed(1) + ' ★'}
              icon={<Star className="w-5 h-5" />}
            />
            <StatCard
              label="Profile Completion"
              value={(profile?.profile_completion ?? 75) + '%'}
              icon={<TrendingUp className="w-5 h-5" />}
            />
          </div>

          {/* Charts + Bookings */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Earnings chart */}
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-teal-900">Earnings Overview</h2>
                <Link to="/dashboard/worker/earnings" className="text-xs text-teal-600 hover:underline flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={DEMO_EARNINGS}>
                  <defs>
                    <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0fdfa" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#4d7c6e' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#4d7c6e' }} tickFormatter={(v: any) => `₹${(Number(v)/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: any) => [formatCurrency(Number(v) || 0), 'Earnings']} />
                  <Area type="monotone" dataKey="earnings" stroke="#0d9488" fill="url(#earningsGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick actions */}
            <div className="card p-6">
              <h2 className="font-semibold text-teal-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: <Calendar className="w-4 h-4" />, label: 'Update Availability', to: '/dashboard/worker/availability' },
                  { icon: <Briefcase className="w-4 h-4" />, label: 'Browse Job Board', to: '/jobs' },
                  { icon: <Award className="w-4 h-4" />, label: 'View Score Report', to: '/score' },
                  { icon: <Bell className="w-4 h-4" />, label: 'Notifications', to: '/notifications' },
                  { icon: <CheckCircle className="w-4 h-4" />, label: 'Verification Centre', to: '/verification' },
                ].map(item => (
                  <Link key={item.to} to={item.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 text-teal-700 text-sm font-medium transition-colors">
                    <span className="text-teal-500">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-teal-50">
              <h2 className="font-semibold text-teal-900">Recent Bookings</h2>
              <Link to="/dashboard/worker/bookings" className="text-xs text-teal-600 hover:underline flex items-center gap-1" id="worker-all-bookings">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-teal-50">
              {DEMO_BOOKINGS.map(booking => {
                const statusConfig = getBookingStatusConfig(booking.status)
                return (
                  <div key={booking.id} className="px-6 py-4 flex items-center gap-4 hover:bg-teal-50/30 transition-colors">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      booking.status === 'completed' ? 'bg-mint-400' :
                      booking.status === 'accepted' ? 'bg-teal-400' :
                      'bg-yellow-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-teal-900 text-sm truncate">{booking.service}</p>
                      <p className="text-xs text-teal-500">{booking.customer} · {booking.date} at {booking.time}</p>
                    </div>
                    <span className={`badge ${statusConfig.badgeClass} flex-shrink-0`}>{statusConfig.label}</span>
                    <span className="text-sm font-semibold text-teal-700 flex-shrink-0">{formatCurrency(booking.amount)}</span>
                    <Link to={`/dashboard/worker/bookings/${booking.id}`} className="text-teal-400 hover:text-teal-600 flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Job Opportunities */}
          <div className="card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-teal-50">
              <h2 className="font-semibold text-teal-900">New Job Opportunities</h2>
              <Link to="/jobs" className="text-xs text-teal-600 hover:underline flex items-center gap-1" id="worker-all-jobs">
                Browse all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-teal-50">
              {DEMO_JOBS.map(job => (
                <div key={job.id} className="px-6 py-4 flex items-center gap-4 hover:bg-teal-50/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-teal-900 text-sm">{job.title}</p>
                    <p className="text-xs text-teal-500">{job.city} · {job.posted} · {job.applicants} applicants</p>
                  </div>
                  <span className="text-sm font-semibold text-teal-700 flex-shrink-0">{job.budget}</span>
                  <Link to={`/jobs/${job.id}`} className="btn-secondary text-xs py-1.5 px-3 flex-shrink-0" id={`apply-job-${job.id}`}>
                    Apply
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
