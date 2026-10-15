import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { useAuth } from '../contexts/AuthContext'
import { StatCard, Alert, Badge } from '../components/ui/index'
import { getScoreLabel, formatCurrency, formatDate } from '../lib/utils'
import {
  Award, TrendingUp, CheckCircle, Star, Users, Shield, Calendar,
  ArrowRight, Info, Lock, Download, Share2, RefreshCw
} from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

const DEMO_SCORE_HISTORY = [
  { date: 'Apr', score: 520 },
  { date: 'May', score: 580 },
  { date: 'Jun', score: 610 },
  { date: 'Jul', score: 660 },
  { date: 'Aug', score: 700 },
  { date: 'Sep', score: 740 },
  { date: 'Oct', score: 720 },
]

const SCORE_COMPONENTS = [
  { name: 'Work Completion', weight: 25, score: 85, maxScore: 100, description: '127 verified jobs completed out of 134 booked', icon: '✅' },
  { name: 'Earnings Consistency', weight: 20, score: 78, maxScore: 100, description: 'Consistent monthly earnings for 7 months', icon: '💰' },
  { name: 'Customer Ratings', weight: 20, score: 96, maxScore: 100, description: '4.8 average from 89 verified reviews', icon: '⭐' },
  { name: 'Payment Reliability', weight: 15, score: 90, maxScore: 100, description: '98% on-time payment confirmations', icon: '💳' },
  { name: 'Verified Skills', weight: 10, score: 70, maxScore: 100, description: '2 of 3 skills have uploaded certificates', icon: '📜' },
  { name: 'Repeat Customers', weight: 10, score: 65, maxScore: 100, description: '23 customers have booked more than once', icon: '🔄' },
]

const RADAR_DATA = SCORE_COMPONENTS.map(c => ({
  subject: c.name.split(' ')[0],
  value: c.score,
  fullMark: 100,
}))

const IMPROVEMENT_TIPS = [
  { priority: 'high',   tip: 'Upload certificates for your Electrical Work skill to increase Verified Skills score by ~15 points.' },
  { priority: 'medium', tip: 'Add 2–3 portfolio images to attract more bookings and improve profile trust.' },
  { priority: 'medium', tip: 'Complete identity verification to unlock the Verified badge and boost lender confidence.' },
  { priority: 'low',    tip: 'Respond to booking requests within 1 hour to improve your acceptance rate.' },
]

function ScoreRing({ score }: { score: number }) {
  const scoreInfo = getScoreLabel(score)
  const pct = score / 1000
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference * (1 - pct)

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background ring */}
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#f0fdfa" strokeWidth="16" />
          {/* Score ring */}
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke={score >= 800 ? '#10b981' : score >= 650 ? '#0d9488' : score >= 500 ? '#f59e0b' : '#ef4444'}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          {/* Score text */}
          <text x="100" y="92" textAnchor="middle" className="fill-teal-900" style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'Inter' }}>
            {score}
          </text>
          <text x="100" y="115" textAnchor="middle" style={{ fontSize: '0.875rem', fill: '#0d9488', fontWeight: 600, fontFamily: 'Inter' }}>
            {scoreInfo.label}
          </text>
          <text x="100" y="132" textAnchor="middle" style={{ fontSize: '0.7rem', fill: '#4d7c6e', fontFamily: 'Inter' }}>
            out of 1000
          </text>
        </svg>
      </div>
      <p className="text-sm text-teal-600 text-center max-w-xs mt-2">{scoreInfo.description}</p>
    </div>
  )
}

export function ScoreDashboard() {
  const { isAuthenticated, profile } = useAuth()
  const [shareOpen, setShareOpen] = useState(false)

  const score = profile?.work2credit_score ?? 720
  const scoreInfo = getScoreLabel(score)

  // Calculate total score from components
  const calculatedScore = Math.round(
    SCORE_COMPONENTS.reduce((acc, comp) => acc + (comp.score * comp.weight / 100), 0) * 10
  )

  return (
    <div className="min-h-screen bg-cream-100">
      {isAuthenticated ? null : <Navbar />}

      <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isAuthenticated ? '' : 'pt-16'}`}>

        {/* Disclaimer banner */}
        <Alert type="warning" className="mb-8">
          <strong>Important Disclaimer:</strong> Work2Credit Score is an <strong>experimental, platform-specific score</strong> (0–1000). It is <strong>NOT</strong> an official CIBIL score, credit bureau score, or guarantee of loan approval or credit eligibility. It is informational supporting evidence only. Do not rely on this score for financial decisions.
        </Alert>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-teal-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-teal-600" />
              Work2Credit Score Dashboard
            </h1>
            <p className="text-teal-500 text-sm mt-1">
              Last updated: {formatDate(new Date().toISOString())} · Score recalculates after each verified job
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary text-sm" onClick={() => setShareOpen(!shareOpen)} id="score-share-btn">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
            <button className="btn-ghost text-sm" id="score-refresh-btn">
              <RefreshCw className="w-4 h-4" />
              Recalculate
            </button>
          </div>
        </div>

        {/* Share modal */}
        {shareOpen && (
          <div className="card p-6 mb-8 border-2 border-teal-200 bg-teal-50/50">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-teal-900">Share Your Financial Activity Report</h3>
                <p className="text-sm text-teal-600 mt-1">
                  Generate a secure, time-limited link to share your verified work history with lenders or employers.
                  Only approved information is shared — no private transaction details.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Expiry</label>
                <select className="input text-sm">
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </div>
              <div>
                <label className="label">Access Control</label>
                <select className="input text-sm">
                  <option>Anyone with the link</option>
                  <option>Email verification required</option>
                </select>
              </div>
            </div>
            <Alert type="info" className="mb-4">
              By generating this link, you explicitly consent to sharing your approved Work2Credit profile data. You can revoke access at any time from Settings.
            </Alert>
            <div className="flex gap-3">
              <button className="btn-primary text-sm" id="generate-report-link">
                <Download className="w-4 h-4" />
                Generate Secure Link
              </button>
              <button className="btn-ghost text-sm" onClick={() => setShareOpen(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Score + Stats */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 flex flex-col items-center justify-center">
            <ScoreRing score={score} />
            <div className="mt-4 flex gap-2">
              <Badge variant="teal">EXPERIMENTAL</Badge>
              <Badge variant="gray">NOT CIBIL</Badge>
            </div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            <StatCard label="Completed Jobs"     value="127"              icon={<CheckCircle className="w-5 h-5" />} trend={{ value: 8, isPositive: true }} />
            <StatCard label="Verified Earnings"  value={formatCurrency(284500)} icon={<TrendingUp className="w-5 h-5" />} />
            <StatCard label="Average Rating"     value="4.8 ★"            icon={<Star className="w-5 h-5" />} />
            <StatCard label="Repeat Customers"   value="23"               icon={<Users className="w-5 h-5" />} />
            <StatCard label="Completion Rate"    value="94.8%"            icon={<Calendar className="w-5 h-5" />} />
            <StatCard label="Verified Skills"    value="2 / 3"            icon={<Shield className="w-5 h-5" />} />
          </div>
        </div>

        {/* Score History */}
        <div className="card p-6 mb-8">
          <h2 className="font-semibold text-teal-900 mb-5">Score History</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={DEMO_SCORE_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0fdfa" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#4d7c6e' }} />
              <YAxis domain={[400, 1000]} tick={{ fontSize: 12, fill: '#4d7c6e' }} />
              <Tooltip formatter={(v: any) => [Number(v) || 0, 'Score']} />
              <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: '#0d9488' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Score Components */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Radar chart */}
          <div className="card p-6">
            <h2 className="font-semibold text-teal-900 mb-4">Score Profile Radar</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="#e0f2fe" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#4d7c6e' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar name="Score" dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown table */}
          <div className="card p-6">
            <h2 className="font-semibold text-teal-900 mb-4">Score Component Breakdown</h2>
            <div className="space-y-4">
              {SCORE_COMPONENTS.map(comp => (
                <div key={comp.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-teal-800 font-medium flex items-center gap-1.5">
                      <span>{comp.icon}</span>
                      {comp.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-teal-500">{comp.weight}% weight</span>
                      <span className="text-sm font-bold text-teal-700">{comp.score}/100</span>
                    </div>
                  </div>
                  <div className="w-full bg-teal-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${comp.score}%`,
                        backgroundColor: comp.score >= 80 ? '#10b981' : comp.score >= 60 ? '#0d9488' : '#f59e0b',
                      }}
                    />
                  </div>
                  <p className="text-xs text-teal-500 mt-0.5">{comp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="card p-6 mb-8">
          <h2 className="font-semibold text-teal-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            How to Improve Your Score
          </h2>
          <div className="space-y-3">
            {IMPROVEMENT_TIPS.map((tip, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                tip.priority === 'high' ? 'bg-red-50 border-red-100' :
                tip.priority === 'medium' ? 'bg-yellow-50 border-yellow-100' :
                'bg-teal-50 border-teal-100'
              }`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                  tip.priority === 'high' ? 'bg-red-400' :
                  tip.priority === 'medium' ? 'bg-yellow-400' : 'bg-teal-400'
                }`} />
                <p className="text-sm text-teal-800">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How score is calculated */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-teal-600" />
            <h2 className="font-semibold text-teal-900">How Your Score Is Calculated</h2>
          </div>
          <p className="text-sm text-teal-600 mb-4 leading-relaxed">
            Your Work2Credit Score is a <strong>transparent, explainable prototype score</strong> calculated entirely from your verified platform activity. It uses the following configurable weights:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {SCORE_COMPONENTS.map(c => (
              <div key={c.name} className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                <span>{c.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-teal-900">{c.name}</p>
                </div>
                <span className="text-sm font-bold text-teal-600">{c.weight}%</span>
              </div>
            ))}
          </div>
          <Alert type="warning">
            These weights are <strong>prototype defaults</strong>, not official scoring weights. They are transparent and configurable. Work2Credit Score is experimental and may change as the platform evolves.
          </Alert>
        </div>

      </div>

      {!isAuthenticated && <Footer />}
    </div>
  )
}
