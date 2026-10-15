import React, { useState } from 'react'
import { Sidebar } from '../../components/layout/Sidebar'
import { StatCard } from '../../components/ui/index'
import {
  Wallet, DollarSign, TrendingUp, Download, ArrowUpRight,
  CheckCircle, Clock, ShieldCheck, Filter, FileText
} from 'lucide-react'
import { formatCurrency } from '../../lib/utils'
import toast from 'react-hot-toast'

interface Transaction {
  id: string
  bookingRef: string
  customer: string
  service: string
  amount: number
  method: 'online' | 'cash_verified' | 'escrow'
  status: 'completed' | 'processing' | 'pending_confirmation'
  date: string
}

const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    bookingRef: '#BK-8902',
    customer: 'Ananya Sharma',
    service: 'Ceiling Fan Installation',
    amount: 850,
    method: 'cash_verified',
    status: 'completed',
    date: 'Oct 13, 2026'
  },
  {
    id: 'tx-2',
    bookingRef: '#BK-8841',
    customer: 'Vikram Mehta',
    service: 'Solar Inverter Connection',
    amount: 1400,
    method: 'online',
    status: 'completed',
    date: 'Oct 11, 2026'
  },
  {
    id: 'tx-3',
    bookingRef: '#BK-8819',
    customer: 'Sunil Gupta',
    service: 'MCB Replacement',
    amount: 600,
    method: 'online',
    status: 'completed',
    date: 'Oct 08, 2026'
  },
  {
    id: 'tx-4',
    bookingRef: '#BK-8790',
    customer: 'Pooja Reddy',
    service: 'Kitchen Appliance Wiring',
    amount: 1200,
    method: 'escrow',
    status: 'processing',
    date: 'Oct 05, 2026'
  }
]

export function WorkerEarningsPage() {
  const [filter, setFilter] = useState<'all' | 'online' | 'cash'>('all')

  const filteredTx = TRANSACTIONS.filter(t => {
    if (filter === 'online') return t.method === 'online' || t.method === 'escrow'
    if (filter === 'cash') return t.method === 'cash_verified'
    return true
  })

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden">
      <Sidebar type="worker" />

      <main className="flex-1 flex flex-col overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-6xl w-full mx-auto p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-teal-950">Earnings & Financial Ledger</h1>
              <p className="text-sm text-teal-600">Track verified platform earnings, payouts, and cash ledger records</p>
            </div>

            <button
              onClick={() => toast.success('Financial ledger exported as PDF!')}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 self-start sm:self-auto bg-white border-teal-200"
            >
              <Download className="w-4 h-4" /> Export Statement (PDF)
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Lifetime Earnings"
              value={formatCurrency(184500)}
              icon={<Wallet className="w-5 h-5" />}
              trend={{ value: 14, isPositive: true }}
            />
            <StatCard
              label="This Month"
              value={formatCurrency(24800)}
              icon={<TrendingUp className="w-5 h-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              label="Verified Cash Volume"
              value={formatCurrency(68200)}
              icon={<ShieldCheck className="w-5 h-5 text-mint-600" />}
            />
            <StatCard
              label="Pending Payouts"
              value={formatCurrency(3250)}
              icon={<Clock className="w-5 h-5 text-amber-500" />}
            />
          </div>

          {/* Cash & Credit notice */}
          <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-mint-400" /> 100% of Verified Cash Counts Toward Your Credit Score
              </h3>
              <p className="text-xs text-teal-200">
                Whenever you record cash received and the customer confirms, it is officially stamped into your Work2Credit Verified Income Profile.
              </p>
            </div>
            <button
              onClick={() => toast.success('Direct Payout scheduled for midnight')}
              className="btn-primary bg-mint-400 hover:bg-mint-300 text-teal-950 text-xs py-2.5 px-4 font-bold flex-shrink-0"
            >
              Instant Payout to UPI
            </button>
          </div>

          {/* Transactions List */}
          <div className="card p-6 bg-white border border-teal-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <h2 className="font-bold text-teal-950 text-base">Transaction History</h2>
              <div className="flex items-center gap-2">
                {(['all', 'online', 'cash'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`text-xs px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                      filter === tab
                        ? 'bg-teal-700 text-white'
                        : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                    }`}
                  >
                    {tab === 'all' ? 'All Transactions' : tab === 'online' ? 'Online / Escrow' : 'Verified Cash'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-teal-100 text-teal-500 font-semibold uppercase">
                    <th className="pb-3">Reference</th>
                    <th className="pb-3">Customer & Service</th>
                    <th className="pb-3">Payment Method</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-50">
                  {filteredTx.map(tx => (
                    <tr key={tx.id} className="hover:bg-teal-50/30 transition-colors">
                      <td className="py-3.5 font-semibold text-teal-900">{tx.bookingRef}</td>
                      <td className="py-3.5">
                        <p className="font-medium text-teal-950">{tx.customer}</p>
                        <p className="text-[11px] text-teal-500">{tx.service}</p>
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                          tx.method === 'cash_verified'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : tx.method === 'escrow'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-mint-50 text-mint-800 border border-mint-200'
                        }`}>
                          {tx.method === 'cash_verified' ? 'Cash (Verified)' : tx.method === 'escrow' ? 'Escrow Hold' : 'Online UPI'}
                        </span>
                      </td>
                      <td className="py-3.5 text-teal-600">{tx.date}</td>
                      <td className="py-3.5 text-right font-bold text-teal-950 text-sm">
                        +{formatCurrency(tx.amount)}
                      </td>
                      <td className="py-3.5 text-right">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.status === 'completed'
                            ? 'bg-mint-100 text-mint-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status === 'completed' ? 'Settled' : 'Processing'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
