import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { useAuth } from '../contexts/AuthContext'
import {
  Settings, Bell, Lock, Shield, CreditCard, User,
  Smartphone, Globe, Check, Eye
} from 'lucide-react'
import toast from 'react-hot-toast'

export function SettingsPage() {
  const { profile } = useAuth()
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [bookingNotifs, setBookingNotifs] = useState(true)
  const [scoreAlerts, setScoreAlerts] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)

  const [upiId, setUpiId] = useState('rajeshkumar@okaxis')
  const [bankAcc, setBankAcc] = useState('**********3921')
  const [ifsc, setIfsc] = useState('HDFC0001243')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Settings updated successfully!')
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-teal-950 flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal-600" /> Account Settings
          </h1>
          <p className="text-sm text-teal-600">Manage security, notifications, payouts, and score privacy preferences</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* 1. Notifications */}
          <div className="card p-6 bg-white border border-teal-100">
            <h2 className="text-base font-bold text-teal-950 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal-600" /> Notification Preferences
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-teal-900">Job & Booking Notifications</p>
                  <p className="text-xs text-teal-500">Get instant alerts when a client books or requests a quotation.</p>
                </div>
                <input
                  type="checkbox"
                  checked={bookingNotifs}
                  onChange={e => setBookingNotifs(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-teal-900">Work2Credit Score Updates</p>
                  <p className="text-xs text-teal-500">Notifications when your credit and reliability score increases.</p>
                </div>
                <input
                  type="checkbox"
                  checked={scoreAlerts}
                  onChange={e => setScoreAlerts(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-teal-900">SMS / WhatsApp Alerts</p>
                  <p className="text-xs text-teal-500">Receive urgent job dispatch updates directly via SMS.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={e => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>
            </div>
          </div>

          {/* 2. Privacy & Score Sharing */}
          <div className="card p-6 bg-white border border-teal-100">
            <h2 className="text-base font-bold text-teal-950 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-mint-600" /> Financial Privacy & Score Sharing
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-teal-900">Public Marketplace Profile</p>
                  <p className="text-xs text-teal-500">Allow customers in your city to find and book your services.</p>
                </div>
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={e => setPublicProfile(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>

              <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100 text-xs text-teal-800">
                <p className="font-semibold mb-1">🔐 Portable Financial Report Access Token</p>
                <p className="text-teal-600 mb-2">You can generate time-limited read-only links to share your verified earning report with banks or landlords.</p>
                <button
                  type="button"
                  onClick={() => toast.success('One-time share token generated! Copied to clipboard.')}
                  className="btn-secondary text-xs px-3 py-1.5 bg-white border-teal-200"
                >
                  Generate Shareable Link (Valid 48h)
                </button>
              </div>
            </div>
          </div>

          {/* 3. Payout Settings */}
          <div className="card p-6 bg-white border border-teal-100">
            <h2 className="text-base font-bold text-teal-950 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-600" /> Payout & Bank Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-teal-800 block mb-1">Primary UPI ID (Instant Payouts)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-teal-800 block mb-1">Bank IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={e => setIfsc(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-teal-800 block mb-1">Bank Account Number</label>
                <input
                  type="text"
                  value={bankAcc}
                  onChange={e => setBankAcc(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="submit" className="btn-primary text-sm px-6 py-2.5">
              Save All Changes
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
