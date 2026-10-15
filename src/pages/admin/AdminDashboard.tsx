import React, { useState } from 'react'
import { Sidebar } from '../../components/layout/Sidebar'
import { StatCard } from '../../components/ui/index'
import {
  Shield, Users, Award, AlertTriangle, CheckCircle,
  XCircle, Sliders, BarChart3, Clock, DollarSign
} from 'lucide-react'
import { formatCurrency } from '../../lib/utils'
import toast from 'react-hot-toast'

interface PendingVerification {
  id: string
  name: string
  role: string
  docType: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

const PENDING_VERIFICATIONS: PendingVerification[] = [
  {
    id: 'v1',
    name: 'Suresh Yadav',
    role: 'Plumber',
    docType: 'ITI Plumbing Trade Certificate & Aadhaar',
    submittedAt: '3 hours ago',
    status: 'pending'
  },
  {
    id: 'v2',
    name: 'Priya Sharma',
    role: 'Tutor',
    docType: 'B.Ed Degree & Police Verification',
    submittedAt: '6 hours ago',
    status: 'pending'
  },
  {
    id: 'v3',
    name: 'Ravi Nair',
    role: 'Carpenter',
    docType: 'Govt Skill India ID Card',
    submittedAt: '1 day ago',
    status: 'pending'
  }
]

export function AdminDashboard() {
  const [verifications, setVerifications] = useState<PendingVerification[]>(PENDING_VERIFICATIONS)
  const [reliabilityWeight, setReliabilityWeight] = useState(30)
  const [incomeWeight, setIncomeWeight] = useState(25)
  const [satisfactionWeight, setSatisfactionWeight] = useState(20)
  const [longevityWeight, setLongevityWeight] = useState(15)
  const [verificationWeight, setVerificationWeight] = useState(10)

  const handleApprove = (id: string, name: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v))
    toast.success(`Approved verification for ${name}. +50 points added to score!`)
  }

  const handleReject = (id: string, name: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' } : v))
    toast.error(`Rejected verification for ${name}. Notification sent.`)
  }

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault()
    const total = reliabilityWeight + incomeWeight + satisfactionWeight + longevityWeight + verificationWeight
    if (total !== 100) {
      toast.error(`Weights must total 100%! Current sum: ${total}%`)
      return
    }
    toast.success('Work2Credit scoring engine parameters updated across platform!')
  }

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden">
      <Sidebar type="admin" />

      <main className="flex-1 flex flex-col overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-6xl w-full mx-auto p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-teal-950 flex items-center gap-2">
              <Shield className="w-6 h-6 text-teal-600" /> Platform Admin Oversight
            </h1>
            <p className="text-sm text-teal-600">Supervise verifications, dispute resolutions, and scoring algorithms</p>
          </div>

          {/* Stats Overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Active Workers"
              value="1,420"
              icon={<Users className="w-5 h-5 text-teal-600" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              label="Total Transactions"
              value="18,940"
              icon={<BarChart3 className="w-5 h-5 text-mint-600" />}
              trend={{ value: 18, isPositive: true }}
            />
            <StatCard
              label="Gross Platform Volume"
              value={formatCurrency(4820000)}
              icon={<DollarSign className="w-5 h-5 text-teal-700" />}
            />
            <StatCard
              label="Avg Platform Score"
              value="742 / 1000"
              icon={<Award className="w-5 h-5 text-amber-500" />}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Pending Verifications Queue */}
            <div className="lg:col-span-2 card p-6 bg-white border border-teal-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-teal-950 text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" /> Pending Worker Verifications
                </h2>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  {verifications.filter(v => v.status === 'pending').length} Action Required
                </span>
              </div>

              <div className="space-y-3">
                {verifications.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-teal-100 bg-cream-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-teal-950">{item.name}</span>
                        <span className="text-[11px] bg-teal-100 text-teal-700 px-2 py-0.2 rounded font-medium">
                          {item.role}
                        </span>
                      </div>
                      <p className="text-xs text-teal-600 mt-1">{item.docType}</p>
                      <span className="text-[10px] text-teal-400">Submitted {item.submittedAt}</span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {item.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleReject(item.id, item.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center gap-1 border border-red-200"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                          <button
                            onClick={() => handleApprove(item.id, item.name)}
                            className="btn-primary text-xs py-2 px-3 flex items-center gap-1"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          item.status === 'approved' ? 'bg-mint-100 text-mint-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status === 'approved' ? 'Approved' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Weights Calibration */}
            <div className="card p-6 bg-white border border-teal-100">
              <h2 className="font-bold text-teal-950 text-base mb-1 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600" /> Score Weights Tuning
              </h2>
              <p className="text-xs text-teal-500 mb-4">Live parameters for the 0–1000 credit score calculator</p>

              <form onSubmit={handleSaveWeights} className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium text-teal-800 mb-1">
                    <span>Reliability & Completion</span>
                    <span className="font-bold">{reliabilityWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={reliabilityWeight}
                    onChange={e => setReliabilityWeight(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-teal-800 mb-1">
                    <span>Verified Income Consistency</span>
                    <span className="font-bold">{incomeWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={incomeWeight}
                    onChange={e => setIncomeWeight(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-teal-800 mb-1">
                    <span>Customer Ratings</span>
                    <span className="font-bold">{satisfactionWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={satisfactionWeight}
                    onChange={e => setSatisfactionWeight(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-teal-800 mb-1">
                    <span>Platform Longevity</span>
                    <span className="font-bold">{longevityWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={longevityWeight}
                    onChange={e => setLongevityWeight(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-teal-800 mb-1">
                    <span>ID & Skill Verification</span>
                    <span className="font-bold">{verificationWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={verificationWeight}
                    onChange={e => setVerificationWeight(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="btn-primary text-xs w-full py-2">
                    Update Model Weights
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
