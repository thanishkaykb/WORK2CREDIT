import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Bell, Check, Clock, Calendar, Award, DollarSign, AlertCircle, Trash2 } from 'lucide-react'

interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  type: 'booking' | 'score' | 'payment' | 'system'
  read: boolean
  link?: string
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Work2Credit Score Increased! 🚀',
    message: 'Your score increased by +18 points following successful completion of your recent booking with 5-star customer feedback.',
    time: '2 hours ago',
    type: 'score',
    read: false,
    link: '/score'
  },
  {
    id: 'n2',
    title: 'New Booking Request',
    message: 'Ananya Sharma requested "Ceiling Fan Installation & Wiring" for tomorrow at 2:30 PM.',
    time: '4 hours ago',
    type: 'booking',
    read: false,
    link: '/dashboard/worker/bookings'
  },
  {
    id: 'n3',
    title: 'Cash Payment Confirmed',
    message: 'Customer Rajesh Gupta confirmed cash payment of ₹850 for job #BK-8291. Added to verified earnings.',
    time: '1 day ago',
    type: 'payment',
    read: true,
    link: '/dashboard/worker/earnings'
  },
  {
    id: 'n4',
    title: 'Skill Certification Verified 🛡️',
    message: 'Your National Skill Qualification Framework (NSQF) Electrician Certificate was verified by admin.',
    time: '2 days ago',
    type: 'system',
    read: true,
    link: '/verification'
  },
  {
    id: 'n5',
    title: 'New Job Matching Your Skill',
    message: 'A homeowner in Bandra West posted an Urgent Electrical Maintenance job (₹1,200 budget).',
    time: '3 days ago',
    type: 'booking',
    read: true,
    link: '/jobs'
  }
]

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = useState<'all' | 'unread' | 'booking' | 'score' | 'payment'>('all')

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'booking') return n.type === 'booking'
    if (filter === 'score') return n.type === 'score'
    if (filter === 'payment') return n.type === 'payment'
    return true
  })

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'score': return <Award className="w-5 h-5 text-amber-500" />
      case 'booking': return <Calendar className="w-5 h-5 text-teal-600" />
      case 'payment': return <DollarSign className="w-5 h-5 text-mint-600" />
      default: return <Bell className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-950 flex items-center gap-2">
              <Bell className="w-6 h-6 text-teal-600" /> Notification Center
            </h1>
            <p className="text-sm text-teal-600">Stay updated on bookings, verified payments, and score updates</p>
          </div>

          <button
            onClick={markAllAsRead}
            className="text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-teal-100">
          {[
            { id: 'all', label: 'All Notifications' },
            { id: 'unread', label: 'Unread' },
            { id: 'score', label: 'Score Updates' },
            { id: 'booking', label: 'Bookings' },
            { id: 'payment', label: 'Payments' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === tab.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-white text-teal-700 hover:bg-teal-50 border border-teal-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card p-12 text-center bg-white border border-teal-100">
              <Bell className="w-10 h-10 text-teal-300 mx-auto mb-3" />
              <p className="font-semibold text-teal-900">No notifications in this filter</p>
              <p className="text-xs text-teal-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`card p-4 bg-white transition-all hover:border-teal-300 relative group flex items-start gap-4 ${
                  !item.read ? 'border-l-4 border-l-teal-600 bg-teal-50/20' : 'border border-teal-100'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-teal-950 truncate">{item.title}</h3>
                    <span className="text-[11px] text-teal-400 flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-teal-700 leading-relaxed mb-2">{item.message}</p>

                  {item.link && (
                    <Link
                      to={item.link}
                      className="inline-flex text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline"
                    >
                      View details →
                    </Link>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearNotification(item.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-teal-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
