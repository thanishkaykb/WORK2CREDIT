import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { Alert, Badge } from '../../components/ui/index'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency, getBookingStatusConfig, getTransactionStatusConfig } from '../../lib/utils'
import { CheckCircle, X, Clock, AlertCircle, MessageSquare, ArrowRight, Calendar, User } from 'lucide-react'
import toast from 'react-hot-toast'

const DEMO_BOOKINGS = [
  {
    id: '1', customer: 'Ananya Sharma', service: 'Electrical Wiring',
    date: '2026-10-16', time: '10:00 AM', duration: '3 hrs',
    amount: 1500, status: 'pending', address: '45, Andheri West, Mumbai',
    description: 'Need wiring done for 2 rooms in my new flat. Includes plug points and switches.',
    paymentMethod: 'upi',
  },
  {
    id: '2', customer: 'Rahul Mehta', service: 'Fan Installation',
    date: '2026-10-17', time: '2:00 PM', duration: '1 hr',
    amount: 350, status: 'accepted', address: '12, Bandra, Mumbai',
    description: 'Install 2 ceiling fans.',
    paymentMethod: 'cash',
  },
  {
    id: '3', customer: 'Priya Kapoor', service: 'Electrical Repair',
    date: '2026-10-14', time: '11:00 AM', duration: '2 hrs',
    amount: 800, status: 'completed', address: '78, Powai, Mumbai',
    description: 'MCB keeps tripping. Need diagnosis and fix.',
    paymentMethod: 'card',
  },
]

export function WorkerBookingsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'upcoming' | 'completed'>('all')
  const [selectedBooking, setSelectedBooking] = useState<typeof DEMO_BOOKINGS[0] | null>(null)

  const filtered = activeTab === 'all' ? DEMO_BOOKINGS :
    activeTab === 'pending' ? DEMO_BOOKINGS.filter(b => b.status === 'pending') :
    activeTab === 'upcoming' ? DEMO_BOOKINGS.filter(b => ['accepted', 'in_progress'].includes(b.status)) :
    DEMO_BOOKINGS.filter(b => ['completed', 'cancelled'].includes(b.status))

  const handleAccept = (bookingId: string) => {
    toast.success('Booking accepted! Customer has been notified.')
    // In production: update booking status in Supabase, send notification
  }

  const handleDecline = (bookingId: string) => {
    toast('Booking declined.', { icon: '❌' })
    // In production: update booking status, notify customer, log in audit_logs
  }

  const handleMarkComplete = (bookingId: string) => {
    toast.success('Booking marked as completed! Customer will be asked to confirm.')
  }

  return (
    <div className="flex min-h-screen bg-cream-100">
      <Sidebar type="worker" />
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-4xl mx-auto p-5 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-teal-900">My Bookings</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-teal-50 p-1 rounded-xl mb-6 w-fit">
            {(['all', 'pending', 'upcoming', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-white text-teal-900 shadow-sm' : 'text-teal-600 hover:text-teal-800'
                }`}
                id={`bookings-tab-${tab}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'pending' && DEMO_BOOKINGS.filter(b => b.status === 'pending').length > 0 && (
                  <span className="ml-1.5 bg-teal-600 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                    {DEMO_BOOKINGS.filter(b => b.status === 'pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Booking list */}
            <div className="space-y-4">
              {filtered.map(booking => {
                const statusConfig = getBookingStatusConfig(booking.status)
                return (
                  <div
                    key={booking.id}
                    className={`card p-5 cursor-pointer transition-all ${selectedBooking?.id === booking.id ? 'border-teal-400 shadow-card-hover' : 'hover:border-teal-200'}`}
                    onClick={() => setSelectedBooking(booking)}
                    id={`booking-card-${booking.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-teal-900 text-sm">{booking.service}</h3>
                        <p className="text-xs text-teal-500 mt-0.5">{booking.customer}</p>
                      </div>
                      <span className={`badge ${statusConfig.badgeClass}`}>{statusConfig.label}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-teal-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{booking.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{booking.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-teal-700">{formatCurrency(booking.amount)}</span>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={e => { e.stopPropagation(); handleAccept(booking.id) }}
                              className="btn-mint text-xs py-1.5 px-3"
                              id={`accept-${booking.id}`}
                            >
                              <CheckCircle className="w-3 h-3" /> Accept
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); handleDecline(booking.id) }}
                              className="btn-danger text-xs py-1.5 px-3"
                              id={`decline-${booking.id}`}
                            >
                              <X className="w-3 h-3" /> Decline
                            </button>
                          </>
                        )}
                        {booking.status === 'accepted' && (
                          <button
                            onClick={e => { e.stopPropagation(); handleMarkComplete(booking.id) }}
                            className="btn-primary text-xs py-1.5 px-3"
                            id={`complete-${booking.id}`}
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {filtered.length === 0 && (
                <div className="card p-8 text-center">
                  <Calendar className="w-10 h-10 text-teal-300 mx-auto mb-3" />
                  <p className="text-teal-600 font-medium">No bookings here yet</p>
                  <p className="text-teal-400 text-sm mt-1">New requests will appear when customers book your services.</p>
                </div>
              )}
            </div>

            {/* Booking detail */}
            {selectedBooking ? (
              <div className="card p-6 h-fit sticky top-24">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-semibold text-teal-900">{selectedBooking.service}</h2>
                  <span className={`badge ${getBookingStatusConfig(selectedBooking.status).badgeClass}`}>
                    {getBookingStatusConfig(selectedBooking.status).label}
                  </span>
                </div>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex items-center gap-2 text-teal-600">
                    <User className="w-4 h-4 text-teal-400" />
                    <span>{selectedBooking.customer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-teal-600">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>{selectedBooking.date} at {selectedBooking.time} ({selectedBooking.duration})</span>
                  </div>
                  <div className="flex items-start gap-2 text-teal-600">
                    <AlertCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{selectedBooking.address}</span>
                  </div>
                </div>

                <div className="bg-teal-50 rounded-xl p-4 mb-5">
                  <p className="text-xs font-medium text-teal-700 mb-1">Job Description</p>
                  <p className="text-sm text-teal-800 leading-relaxed">{selectedBooking.description}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-beige-50 rounded-xl mb-5">
                  <div>
                    <p className="text-xs text-teal-500">Agreed Amount</p>
                    <p className="text-2xl font-bold text-teal-900">{formatCurrency(selectedBooking.amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-teal-500">Payment Method</p>
                    <p className="text-sm font-medium text-teal-700 uppercase">{selectedBooking.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/messages?booking=${selectedBooking.id}`} className="btn-secondary text-sm flex-1 justify-center" id="booking-message-btn">
                    <MessageSquare className="w-4 h-4" />
                    Message Customer
                  </Link>
                  <Link to={`/disputes?booking=${selectedBooking.id}`} className="btn-ghost text-sm px-3" id="booking-dispute-btn">
                    <AlertCircle className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card p-8 text-center h-fit">
                <p className="text-teal-400 text-sm">Select a booking to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
