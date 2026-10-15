import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { StatCard, EmptyState, Alert } from '../../components/ui/index'
import { Badge } from '../../components/ui/Badge'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency, formatDate, getBookingStatusConfig } from '../../lib/utils'
import { Search, Calendar, Star, ArrowRight, Plus, MapPin, Clock, CheckCircle, CreditCard } from 'lucide-react'

const DEMO_BOOKINGS = [
  { id: '1', worker: 'Rajesh Kumar', service: 'Electrical Repair',   date: '2026-10-16', time: '10:00 AM', amount: 1500, status: 'accepted',  rating: null },
  { id: '2', worker: 'Amit Patel',   service: 'Pipe Leak Fix',        date: '2026-10-14', time: '11:00 AM', amount: 900,  status: 'completed', rating: null },
  { id: '3', worker: 'Sunita Devi',  service: 'Deep Cleaning',        date: '2026-10-10', time: '9:00 AM',  amount: 2500, status: 'completed', rating: 5 },
  { id: '4', worker: 'Ravi Nair',    service: 'Furniture Assembly',   date: '2026-10-08', time: '3:00 PM',  amount: 1200, status: 'cancelled', rating: null },
]

const DEMO_QUOTATIONS = [
  { id: '1', job: 'Fix AC wiring in my office', worker: 'Rajesh Kumar', amount: 3500, submitted: '1h ago' },
  { id: '2', job: 'Fix AC wiring in my office', worker: 'Dev Sharma',   amount: 4000, submitted: '3h ago' },
]

export function CustomerDashboard() {
  const { profile } = useAuth()

  return (
    <div className="flex min-h-screen bg-cream-100">
      <Sidebar type="customer" />
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto p-5 lg:p-8 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-teal-900">
                Hello, {profile?.full_name?.split(' ')[0] || 'there'} 👋
              </h1>
              <p className="text-teal-500 text-sm mt-1">What service do you need today?</p>
            </div>
            <div className="flex gap-3">
              <Link to="/marketplace" className="btn-primary text-sm" id="customer-find-service">
                <Search className="w-4 h-4" />
                Find a Service
              </Link>
              <Link to="/dashboard/customer/jobs" className="btn-secondary text-sm" id="customer-post-job">
                <Plus className="w-4 h-4" />
                Post a Job
              </Link>
            </div>
          </div>

          {/* Quick search */}
          <div className="card p-5">
            <p className="text-sm font-semibold text-teal-800 mb-3">Quick Search</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 bg-cream-100 rounded-xl px-4 py-3">
                <Search className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search for a service..."
                  className="flex-1 bg-transparent text-sm text-teal-900 placeholder-teal-400 outline-none"
                  id="customer-quick-search"
                />
              </div>
              <div className="flex items-center gap-2 bg-cream-100 rounded-xl px-4 py-3">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-sm text-teal-600">{profile?.city || 'Your City'}</span>
              </div>
              <Link to="/marketplace" className="btn-primary text-sm px-6">Search</Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Electrical', 'Plumbing', 'Cleaning', 'Carpentry', 'Tutoring'].map(cat => (
                <Link key={cat} to={`/marketplace?category=${cat.toLowerCase()}`} className="badge-teal text-xs px-3 py-1 rounded-full hover:bg-teal-200 transition-colors" id={`quick-cat-${cat.toLowerCase()}`}>
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Bookings"   value="12"  icon={<Calendar className="w-5 h-5" />} />
            <StatCard label="Completed"         value="9"   icon={<CheckCircle className="w-5 h-5" />} />
            <StatCard label="Total Spent"       value={formatCurrency(24500)} icon={<CreditCard className="w-5 h-5" />} />
            <StatCard label="Reviews Given"     value="7"   icon={<Star className="w-5 h-5" />} />
          </div>

          {/* Upcoming Bookings */}
          <div className="card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-teal-50">
              <h2 className="font-semibold text-teal-900">My Bookings</h2>
              <Link to="/dashboard/customer/bookings" className="text-xs text-teal-600 hover:underline flex items-center gap-1" id="customer-all-bookings">
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
                      booking.status === 'cancelled' ? 'bg-gray-300' :
                      'bg-yellow-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-teal-900 text-sm truncate">{booking.service}</p>
                      <p className="text-xs text-teal-500">{booking.worker} · {booking.date} at {booking.time}</p>
                    </div>
                    <span className={`badge ${statusConfig.badgeClass} flex-shrink-0`}>{statusConfig.label}</span>
                    <span className="text-sm font-semibold text-teal-700 flex-shrink-0">{formatCurrency(booking.amount)}</span>
                    {booking.status === 'completed' && !booking.rating && (
                      <Link to={`/dashboard/customer/bookings/${booking.id}/review`} className="btn-secondary text-xs py-1.5 px-3 flex-shrink-0" id={`review-booking-${booking.id}`}>
                        Rate
                      </Link>
                    )}
                    {booking.status === 'completed' && booking.rating && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-teal-600">{booking.rating}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quotations received */}
          {DEMO_QUOTATIONS.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between px-6 py-4 border-b border-teal-50">
                <h2 className="font-semibold text-teal-900">Quotations Received</h2>
                <Badge variant="yellow">{DEMO_QUOTATIONS.length} new</Badge>
              </div>
              <div className="divide-y divide-teal-50">
                {DEMO_QUOTATIONS.map(q => (
                  <div key={q.id} className="px-6 py-4 flex items-center gap-4 hover:bg-teal-50/30">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-teal-900 text-sm truncate">{q.job}</p>
                      <p className="text-xs text-teal-500">By {q.worker} · {q.submitted}</p>
                    </div>
                    <span className="text-sm font-semibold text-teal-700 flex-shrink-0">{formatCurrency(q.amount)}</span>
                    <Link to={`/dashboard/customer/jobs/1`} className="btn-primary text-xs py-1.5 px-3 flex-shrink-0" id={`view-quote-${q.id}`}>
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews awaiting */}
          <div className="card p-6">
            <h2 className="font-semibold text-teal-900 mb-4">Pending Reviews</h2>
            <div className="space-y-3">
              {DEMO_BOOKINGS.filter(b => b.status === 'completed' && !b.rating).map(booking => (
                <div key={booking.id} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-teal-900 text-sm">{booking.service}</p>
                    <p className="text-xs text-teal-500">{booking.worker} · {booking.date}</p>
                  </div>
                  <Link to={`/dashboard/customer/bookings/${booking.id}/review`} className="btn-secondary text-xs py-1.5 px-3 flex-shrink-0" id={`leave-review-${booking.id}`}>
                    Leave Review
                  </Link>
                </div>
              ))}
              {DEMO_BOOKINGS.filter(b => b.status === 'completed' && !b.rating).length === 0 && (
                <EmptyState icon={<Star className="w-6 h-6" />} title="All caught up!" description="No pending reviews." />
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
