import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import {
  AlertTriangle, ShieldCheck, MessageSquare, Clock,
  CheckCircle, FileText, PlusCircle, Paperclip
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Dispute {
  id: string
  bookingRef: string
  title: string
  party: string
  amount: number
  status: 'under_review' | 'resolved' | 'escalated'
  createdAt: string
  description: string
  resolution?: string
}

const DEMO_DISPUTES: Dispute[] = [
  {
    id: 'DSP-1042',
    bookingRef: '#BK-7721',
    title: 'Disputed Material Cost for Pipe Replacement',
    party: 'Customer: Sunil Verma',
    amount: 1450,
    status: 'under_review',
    createdAt: 'Oct 11, 2026',
    description: 'Customer claims replacement brass valve was billed at ₹1,450 instead of the pre-agreed estimate of ₹1,100.',
  },
  {
    id: 'DSP-0988',
    bookingRef: '#BK-6510',
    title: 'Incomplete AC Duct Insulation Work',
    party: 'Worker: Rajesh Kumar',
    amount: 2200,
    status: 'resolved',
    createdAt: 'Sep 28, 2026',
    description: 'Work was re-inspected and partial refund of ₹400 was mutually agreed. Remainder released to worker.',
    resolution: 'Refund of ₹400 approved. ₹1,800 released to worker. Score impact cleared.'
  }
]

export function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(DEMO_DISPUTES)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    const newDispute: Dispute = {
      id: `DSP-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingRef: bookingRef || '#BK-CUSTOM',
      title,
      party: 'Counterparty under notification',
      amount: Number(amount) || 0,
      status: 'under_review',
      createdAt: 'Just now',
      description
    }

    setDisputes([newDispute, ...disputes])
    setShowCreateModal(false)
    setBookingRef('')
    setTitle('')
    setAmount('')
    setDescription('')
    toast.success('Dispute submitted. A neutral mediator will review within 24 hours.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-950 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" /> Resolution & Disputes Center
            </h1>
            <p className="text-sm text-teal-600">Fair mediation protection for both customers and service professionals</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2 text-xs py-2.5 px-4"
          >
            <PlusCircle className="w-4 h-4" /> File New Dispute
          </button>
        </div>

        {/* Mediation Process Card */}
        <div className="card p-6 bg-white border border-teal-100 mb-8">
          <h2 className="text-sm font-bold text-teal-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-mint-600" /> How Work2Credit Dispute Mediation Protects You
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-teal-700">
            <div className="bg-cream-50 p-3 rounded-xl border border-teal-100">
              <span className="font-bold text-teal-900 block mb-1">1. Funds Placed on Hold</span>
              Escrow funds or disputed transaction records are safely frozen pending resolution.
            </div>
            <div className="bg-cream-50 p-3 rounded-xl border border-teal-100">
              <span className="font-bold text-teal-900 block mb-1">2. Evidence Submission</span>
              Both parties submit receipts, job photos, chat records, and itemized billings.
            </div>
            <div className="bg-cream-50 p-3 rounded-xl border border-teal-100">
              <span className="font-bold text-teal-900 block mb-1">3. Impartial Resolution</span>
              Mediation decision is reached within 48 hours without unjustified penalties on credit scores.
            </div>
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {disputes.map(d => (
            <div key={d.id} className="card p-5 bg-white border border-teal-100 hover:border-teal-200 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-teal-950">{d.title}</span>
                  <span className="text-xs text-teal-500">({d.bookingRef})</span>
                </div>
                <div>
                  {d.status === 'under_review' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Under Review
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint-100 text-mint-800 text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Resolved
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-teal-700 mb-3">{d.description}</p>

              {d.resolution && (
                <div className="bg-mint-50/70 border border-mint-200 rounded-xl p-3 text-xs text-mint-900 mb-3">
                  <strong>Mediator Resolution:</strong> {d.resolution}
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] text-teal-400 border-t border-teal-50 pt-3">
                <span>Disputed Amount: <strong>₹{d.amount.toLocaleString('en-IN')}</strong></span>
                <span>Filed: {d.createdAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-teal-100">
              <h2 className="text-lg font-bold text-teal-950 mb-4">File a Dispute</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-teal-800 block mb-1">Booking Reference #</label>
                  <input
                    type="text"
                    placeholder="e.g. #BK-8902"
                    value={bookingRef}
                    onChange={e => setBookingRef(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-teal-800 block mb-1">Dispute Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unfinished repair work or extra unagreed charges"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-teal-800 block mb-1">Disputed Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-teal-800 block mb-1">Detailed Explanation</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what occurred, what was agreed upon, and what outcome you are requesting..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-medium text-teal-700 hover:bg-teal-50 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Submit Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
