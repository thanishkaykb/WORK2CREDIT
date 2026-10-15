import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import {
  ShieldCheck, Upload, CheckCircle2, Clock, AlertTriangle,
  FileText, Award, Building, CreditCard, ChevronRight, Lock
} from 'lucide-react'
import toast from 'react-hot-toast'

export function VerificationPage() {
  const [govIdStatus, setGovIdStatus] = useState<'approved' | 'pending' | 'unverified'>('approved')
  const [skillCertStatus, setSkillCertStatus] = useState<'approved' | 'pending' | 'unverified'>('pending')
  const [bankStatus, setBankStatus] = useState<'approved' | 'pending' | 'unverified'>('approved')
  const [bgStatus, setBgStatus] = useState<'approved' | 'pending' | 'unverified'>('unverified')

  const handleUploadCert = (e: React.FormEvent) => {
    e.preventDefault()
    setSkillCertStatus('pending')
    toast.success('Certificate submitted for verification! Review takes 12–24 hours.')
  }

  const handleUploadBg = (e: React.FormEvent) => {
    e.preventDefault()
    setBgStatus('pending')
    toast.success('Background check initiated via DigiLocker partner.')
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-500/20 text-mint-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-mint-400" /> Trust & Verification Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Build Trust, Unlock Higher Bookings</h1>
            <p className="text-sm text-teal-200 leading-relaxed">
              Verified workers receive a verified blue badge, rank higher in search results, and get up to +100 bonus points on their Work2Credit Score.
            </p>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 1. Government ID */}
          <div className="card p-6 bg-white border border-teal-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                  <FileText className="w-5 h-5" />
                </div>
                {govIdStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint-100 text-mint-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" /> Pending Review
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-teal-950 mb-1">Government Identity Verification</h2>
              <p className="text-xs text-teal-600 mb-4">
                Aadhaar / Passport / Voter ID verified via secure OCR match against government records.
              </p>
              <div className="bg-cream-50 p-3 rounded-xl border border-teal-100 text-xs text-teal-700">
                <p><strong>Document:</strong> Aadhaar Card (Masked: **** **** 4812)</p>
                <p><strong>Verified on:</strong> 14 Jan 2025</p>
              </div>
            </div>
            <p className="text-[11px] text-teal-400 mt-4 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Identity data is encrypted and never shared publicly.
            </p>
          </div>

          {/* 2. Trade & Skill Certification */}
          <div className="card p-6 bg-white border border-teal-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                  <Award className="w-5 h-5" />
                </div>
                {skillCertStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint-100 text-mint-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : skillCertStatus === 'pending' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" /> Under Review
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">
                    Not Submitted
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-teal-950 mb-1">Trade & Skill Qualifications</h2>
              <p className="text-xs text-teal-600 mb-4">
                Upload diplomas, ITI certificates, NSQF credentials, or trade apprentice diplomas.
              </p>

              {skillCertStatus === 'pending' ? (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <p className="font-semibold mb-1">ITI Electrician Certificate (Uploaded)</p>
                  <p>Our verification team is cross-checking with the National Skill Registry.</p>
                </div>
              ) : (
                <form onSubmit={handleUploadCert} className="space-y-3">
                  <input
                    type="file"
                    className="block w-full text-xs text-teal-700 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                  <button type="submit" className="btn-primary text-xs w-full py-2">
                    Submit Certificate for Review
                  </button>
                </form>
              )}
            </div>
            <p className="text-[11px] text-teal-400 mt-4">Adds +50 points to your Skill Verification score.</p>
          </div>

          {/* 3. Bank Account & UPI */}
          <div className="card p-6 bg-white border border-teal-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint-100 text-mint-800 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active Payout
                </span>
              </div>
              <h2 className="text-base font-bold text-teal-950 mb-1">Bank Account & UPI Payout</h2>
              <p className="text-xs text-teal-600 mb-4">
                Required for receiving automatic digital payouts from card and escrow payments.
              </p>
              <div className="bg-cream-50 p-3 rounded-xl border border-teal-100 text-xs text-teal-700 space-y-1">
                <p><strong>Bank:</strong> HDFC Bank Ltd.</p>
                <p><strong>Account:</strong> **********3921</p>
                <p><strong>UPI ID:</strong> rajeshkumar@okaxis</p>
              </div>
            </div>
            <button className="mt-4 text-xs font-semibold text-teal-700 hover:text-teal-900 text-left">
              Update payout details →
            </button>
          </div>

          {/* 4. Background & Police Clearance */}
          <div className="card p-6 bg-white border border-teal-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                  <Building className="w-5 h-5" />
                </div>
                {bgStatus === 'approved' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint-100 text-mint-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cleared
                  </span>
                ) : bgStatus === 'pending' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" /> In Progress
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold">
                    Optional
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-teal-950 mb-1">Criminal & Background Verification</h2>
              <p className="text-xs text-teal-600 mb-4">
                Boost your client trust to the maximum. Essential for in-home high-value bookings.
              </p>
              {bgStatus === 'pending' ? (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-800">
                  DigiLocker verification in progress.
                </div>
              ) : (
                <button
                  onClick={handleUploadBg}
                  className="btn-secondary text-xs w-full py-2 bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100"
                >
                  Verify via DigiLocker (Free)
                </button>
              )}
            </div>
            <p className="text-[11px] text-teal-400 mt-4">Unlocks the "Police Verified" badge on your profile.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
