import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import {
  Award, Shield, TrendingUp, Users, CheckCircle, ArrowRight,
  Briefcase, Star, FileCheck, DollarSign, Lock, AlertCircle, HelpCircle
} from 'lucide-react'

export function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Register & Create Your Profile',
      desc: 'Join as a worker, customer, or both. List all your skills under a single account without having to manage multiple fragmented profiles.',
      icon: <Users className="w-6 h-6 text-teal-600" />
    },
    {
      step: '02',
      title: 'Verify Skills & Identity',
      desc: 'Upload government ID, trade certifications, and portfolio work. Verified badges instantly increase client trust and boost your starting score.',
      icon: <FileCheck className="w-6 h-6 text-mint-600" />
    },
    {
      step: '03',
      title: 'Deliver Work & Record Transactions',
      desc: 'Accept direct bookings or apply to posted jobs. Payments via UPI, cards, and mutually verified cash transactions are immutably logged.',
      icon: <DollarSign className="w-6 h-6 text-teal-600" />
    },
    {
      step: '04',
      title: 'Build Your Work2Credit Score',
      desc: 'Every completed job, timely delivery, and positive rating increases your Work2Credit Score (0–1000), turning everyday work into proof of creditworthiness.',
      icon: <Award className="w-6 h-6 text-mint-600" />
    },
  ]

  const scoreComponents = [
    {
      name: 'Reliability & Completion Rate',
      weight: '30%',
      desc: 'Punctuality, low cancellation rate, and fulfilling agreed milestones on time.',
      icon: <CheckCircle className="w-5 h-5 text-teal-600" />,
      color: 'bg-teal-50 border-teal-200'
    },
    {
      name: 'Verified Earnings Consistency',
      weight: '25%',
      desc: 'Total verified income volume and month-on-month earning stability.',
      icon: <TrendingUp className="w-5 h-5 text-mint-600" />,
      color: 'bg-mint-50 border-mint-200'
    },
    {
      name: 'Customer Satisfaction',
      weight: '20%',
      desc: 'Verified review ratings, repeat bookings, and client endorsements.',
      icon: <Star className="w-5 h-5 text-amber-500" />,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      name: 'Platform Longevity & Activity',
      weight: '15%',
      desc: 'Sustained active tenure on Work2Credit, monthly transactions, and responsive communication.',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      name: 'Identity & Skill Verification',
      weight: '10%',
      desc: 'Government ID verification, trade credentials, background checks, and certifications.',
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.15),transparent_50%)]" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-mint-300 text-xs font-semibold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" /> The Philosophy Behind Work2Credit
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Turning Daily Hustle Into <span className="text-mint-400">Verifiable Financial Power</span>
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              Traditional credit bureaus ignore millions of self-employed pros and gig workers.
              Work2Credit bridges this gap by turning completed jobs and verified transactions into a portable credit profile.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/register" className="btn-primary bg-mint-500 hover:bg-mint-400 text-teal-950 font-semibold px-8 py-3.5 text-base shadow-lg">
                Create Free Account
              </Link>
              <Link to="/marketplace" className="btn-secondary bg-white/10 hover:bg-white/20 text-white border-white/20 px-8 py-3.5 text-base">
                Explore Marketplace
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Steps Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-teal-950 mb-4">How Work2Credit Works</h2>
            <p className="text-teal-600 max-w-xl mx-auto">
              Four simple steps that empower you to earn today and unlock financial opportunities tomorrow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, idx) => (
              <div key={idx} className="card p-6 bg-white relative hover:shadow-card-hover transition-all">
                <span className="text-3xl font-black text-teal-200 block mb-4">{s.step}</span>
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-teal-900 mb-2">{s.title}</h3>
                <p className="text-sm text-teal-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring Engine Breakdown */}
        <section className="py-20 bg-teal-900/5 border-y border-teal-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Algorithmic Transparency</span>
              <h2 className="text-3xl font-bold text-teal-950 mt-2 mb-4">The Work2Credit Score Formula</h2>
              <p className="text-teal-600 max-w-2xl mx-auto">
                Unlike opaque credit scoring algorithms, Work2Credit's scoring weights are 100% transparent.
                Every action you take on the platform directly correlates to score improvement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scoreComponents.map((comp, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border ${comp.color} transition-all`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      {comp.icon}
                    </div>
                    <span className="text-2xl font-black text-teal-900">{comp.weight}</span>
                  </div>
                  <h3 className="font-bold text-teal-950 text-base mb-2">{comp.name}</h3>
                  <p className="text-sm text-teal-700 leading-relaxed">{comp.desc}</p>
                </div>
              ))}

              <div className="p-6 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-800 to-teal-900 text-white flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2">Total Score: 0 – 1000</h3>
                  <p className="text-sm text-teal-200 leading-relaxed">
                    Score bands:
                    <br />• 800+: Platinum (Elite reliability)
                    <br />• 700–799: Gold (High trustworthiness)
                    <br />• 600–699: Silver (Growing track record)
                    <br />• Below 600: Building reputation
                  </p>
                </div>
                <Link to="/score" className="mt-4 inline-flex items-center gap-2 text-mint-400 font-semibold text-sm hover:underline">
                  View Score Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Confirmation Cash System */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-teal-100 shadow-sm flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-4">
                <Lock className="w-3.5 h-3.5" /> Anti-Fraud Guarantee
              </div>
              <h2 className="text-3xl font-bold text-teal-950 mb-4">How Cash Transactions Are Verified</h2>
              <p className="text-teal-700 leading-relaxed mb-6">
                Most gig marketplaces ignore cash or force expensive gateway commissions. Work2Credit recognizes that cash is reality in many service sectors.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <p className="text-sm text-teal-800">Worker or customer records the completed cash transaction amount after job delivery.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                  <p className="text-sm text-teal-800">The counterparty receives an instant notification with an OTP or one-click verification prompt.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-mint-100 text-mint-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                  <p className="text-sm text-teal-800">Once both parties confirm, the transaction is locked and incorporated into your verified income record!</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96 bg-teal-50 rounded-2xl p-6 border border-teal-100">
              <h3 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-teal-600" /> Important Regulatory Notice
              </h3>
              <p className="text-xs text-teal-600 leading-relaxed">
                Work2Credit Score is a proprietary reputation and platform performance metric. It is not a CIBIL, Experian, Equifax, or CRIF High Mark credit bureau score, and Work2Credit does not directly issue loans or guarantee credit approvals.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
