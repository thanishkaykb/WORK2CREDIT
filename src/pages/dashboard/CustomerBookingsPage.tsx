import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'
import { Avatar, StarRating } from '../../components/ui/index'
import {
  Calendar, Clock, MapPin, CheckCircle, AlertCircle,
  MessageSquare, Star, ArrowRight, RotateCcw
} from 'lucide-react'
import { formatCurrency } from '../../lib/utils'
import toast from 'react-hot-toast'

interface CustomerBooking {
  id: string
  workerName: string
  workerSkill: string
  date: string
  time: string
  amount: number
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  rating?: number
}

const DEMO_CUSTOMER_BOOKINGS: CustomerBooking[] = [
  {
    id: 'BK-8902',
    workerName: 'Rajesh Kumar',
    workerSkill: 'Ceiling Fan Installation & Wiring',
    date: 'Tomorrow, 15 Oct',
    time: '2:30 PM',
    amount: 850,
    status: 'confirmed'
  },
  {
    id: 'BK-8841',
    workerName: 'Amit Patel',
    workerSkill: 'Bathroom Leakage & Pipe Replacement',
    date: '10 Oct 2026',
    time: '11:00 AM',
    amount: 1450,
    status: 'completed',
    rating: 5
  },
  {
    id: 'BK-8710',
    workerName: 'Sunita Devi',
    workerSkill: 'Deep Home Cleaning (3 BHK)',
    date: '28 Sep 2026',
    time: '9:00 AM',
    amount: 2200,
    status: 'completed',
    rating: 4
  }
]

export function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<CustomerBooking[]>(DEMO_CUSTOMER_BOOKINGS)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewBookingId) return

    setBookings(prev => prev.map(b => b.id === reviewBookingId ? { ...b, rating } : b))
    setReviewBookingId(null)
    setFeedback('')
    toast.success('Review submitted! This directly boosted the worker’s Work2Credit Score.')
  }

  const filtered = bookings.filter(b => {
    if (filter === 'active') return b.status === 'confirmed' || b.status === 'in_progress'
    if (filter === 'completed') return b.status === 'completed'
    return true
  })

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden">
      <Sidebar type="customer" />

      <main className="flex-1 flex flex-col overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-6xl w-full mx-auto p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-teal-950">My Service Bookings</h1>
              <p className="text-sm text-teal-600">Track active bookings, view invoices, and leave verified ratings</p>
            </div>

            <Link to="/marketplace" className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 self-start sm:self-auto">
              Find New Service
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-teal-100 pb-2">
            {(['all', 'active', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`text-xs px-3.5 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                  filter === tab
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-teal-700 hover:bg-teal-50 border border-teal-100'
                }`}
              >
                {tab === 'all' ? 'All Bookings' : tab === 'active' ? 'Active / Upcoming' : 'Completed'}
              </button>
            ))}
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filtered.map(booking => (
              <div key={booking.id} className="card p-5 bg-white border border-teal-100 hover:border-teal-200 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar name={booking.workerName} size="lg" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-teal-950 text-base">{booking.workerName}</span>
                        <span className="text-xs text-teal-400 font-mono">#{booking.id}</span>
                      </div>
                      <p className="text-xs font-semibold text-teal-700 mb-2">{booking.workerSkill}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-teal-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-teal-500" /> {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-500" /> {booking.time}
                        </span>
                        <span className="font-bold text-teal-900">
                          {formatCurrency(booking.amount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:self-center">
                    <div>
                      {booking.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-mint-100 text-mint-800 text-xs font-bold">
                          <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                        </span>
                      )}
                      {booking.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                          Delivered
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/messages"
                        className="btn-secondary text-xs py-2 px-3 flex items-center gap-1 bg-teal-50 text-teal-700 border-teal-200"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Message
                      </Link>

                      {booking.status === 'completed' && !booking.rating && (
                        <button
                          onClick={() => setReviewBookingId(booking.id)}
                          className="btn-primary text-xs py-2 px-3 flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5" /> Rate Worker
                        </button>
                      )}

                      {booking.rating && (
                        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
                          <StarRating rating={booking.rating} size="sm" />
                          <span className="text-xs font-bold text-amber-800 ml-1">Rated</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Modal */}
          {reviewBookingId && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-teal-100">
                <h2 className="text-lg font-bold text-teal-950 mb-2">Leave a Verified Review</h2>
                <p className="text-xs text-teal-600 mb-4">
                  Your feedback helps maintain trust and updates the pro's Work2Credit Score.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-2">Overall Satisfaction</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-transform ${star <= rating ? 'scale-110' : 'opacity-40'}`}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-1">Your Feedback</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Comment on punctuality, craftsmanship, and communication..."
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setReviewBookingId(null)}
                      className="px-4 py-2 text-xs font-medium text-teal-700 hover:bg-teal-50 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary text-xs py-2 px-4"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
