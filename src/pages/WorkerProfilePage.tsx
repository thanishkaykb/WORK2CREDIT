import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { StarRating, Avatar, Badge } from '../components/ui/index'
import { Button } from '../components/ui/Button'
import { getScoreLabel, formatCurrency } from '../lib/utils'
import { useAuth } from '../contexts/AuthContext'
import { localDatabase } from '../lib/localDatabase'
import {
  CheckCircle, MapPin, Clock, Star, Award, Phone, Share2, MessageSquare,
  Calendar, Briefcase, Shield
} from 'lucide-react'

// Demo worker data fallback
const DEMO_WORKER = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh@demo.com',
  phone: '+91 98765 43210',
  city: 'Mumbai, Maharashtra',
  bio: 'I am a certified electrician with 8+ years of hands-on experience in residential and commercial electrical work. I specialize in wiring, fan/AC installation, circuit breaker repair, and emergency electrical services. Available 6 days a week with same-day service for urgent issues.',
  avatar_url: null,
  years_experience: 8,
  languages: ['Hindi', 'English', 'Marathi'],
  rating: 4.9,
  total_reviews: 89,
  total_completed_jobs: 127,
  work2credit_score: 847,
  identity_verified: 'verified',
  is_active: true,
  skills: [
    { id: 's1', title: 'Electrical Wiring', category: 'electrical', price: null, hourly_rate: 500, pricing_model: 'hourly', description: 'Full wiring for new construction or renovation. I provide materials or work with yours.', is_verified: true },
    { id: 's2', title: 'Fan & AC Installation', category: 'electrical', price: 350, hourly_rate: null, pricing_model: 'fixed', description: 'Installation of ceiling fans, ACs, and exhaust fans. Includes testing.', is_verified: true },
    { id: 's3', title: 'Electrical Repair', category: 'electrical', price: null, hourly_rate: 400, pricing_model: 'hourly', description: 'Diagnosis and repair of electrical faults, tripping MCBs, and wiring issues.', is_verified: false },
  ],
  portfolio: [
    { id: 'p1', title: 'Commercial Wiring Project', image_url: null },
    { id: 'p2', title: 'Residential Rewiring',       image_url: null },
    { id: 'p3', title: 'Solar Panel Installation',   image_url: null },
  ],
  reviews: [
    { id: 'r1', reviewer: 'Ananya S.', rating: 5, comment: 'Excellent work! Fixed our electrical issue within an hour. Very professional and clean.', date: '2026-10-10', verified: true },
    { id: 'r2', reviewer: 'Rahul M.',  rating: 5, comment: 'Highly recommend. Rewired our office efficiently. Transparent pricing.', date: '2026-09-28', verified: true },
    { id: 'r3', reviewer: 'Priya K.',  rating: 4, comment: 'Good work on the fan installation. Arrived on time.', date: '2026-09-15', verified: true },
  ],
}

export function WorkerProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { profile: myProfile } = useAuth()

  // Find profile from local database or logged-in user
  const loadedProfile = id && id !== '1'
    ? (localDatabase.findProfileById(id) || localDatabase.findProfileByEmail(id))
    : (myProfile && (myProfile.role === 'worker' || myProfile.role === 'both') ? myProfile : null)

  const worker = loadedProfile ? {
    id: loadedProfile.id,
    name: loadedProfile.full_name,
    email: loadedProfile.email,
    phone: loadedProfile.phone || '+91 98765 43210',
    city: loadedProfile.city ? `${loadedProfile.city}, India` : 'Mumbai, India',
    bio: loadedProfile.bio || 'Verified Work2Credit professional service specialist with a tracked credit and reliability history.',
    avatar_url: loadedProfile.avatar_url,
    years_experience: loadedProfile.years_experience || 5,
    languages: loadedProfile.languages || ['Hindi', 'English'],
    rating: loadedProfile.average_rating || 5.0,
    total_reviews: loadedProfile.total_reviews || 0,
    total_completed_jobs: loadedProfile.total_completed_jobs || 0,
    work2credit_score: loadedProfile.work2credit_score || 725,
    identity_verified: loadedProfile.identity_verified || 'verified',
    is_active: loadedProfile.is_active ?? true,
    skills: DEMO_WORKER.skills,
    portfolio: DEMO_WORKER.portfolio,
    reviews: DEMO_WORKER.reviews,
  } : DEMO_WORKER

  const scoreInfo = getScoreLabel(worker.work2credit_score)

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: Profile info */}
          <div className="lg:col-span-1 space-y-5">
            {/* Profile card */}
            <div className="card p-6 text-center">
              <Avatar name={worker.name} src={worker.avatar_url} size="xl" ring className="mx-auto mb-4" />
              <div className="flex items-center justify-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-teal-900">{worker.name}</h1>
                {worker.identity_verified === 'verified' && (
                  <CheckCircle className="w-5 h-5 text-mint-500" />
                )}
              </div>
              <p className="text-sm text-teal-500 flex items-center justify-center gap-1 mb-3">
                <MapPin className="w-3.5 h-3.5" /> {worker.city}
              </p>
              <StarRating rating={worker.rating} showValue className="justify-center mb-1" />
              <p className="text-xs text-teal-500 mb-4">{worker.total_reviews} verified reviews</p>

              <div className="flex gap-2 justify-center flex-wrap mb-4">
                {worker.identity_verified === 'verified' && (
                  <Badge variant="mint">✓ Identity Verified</Badge>
                )}
                {worker.is_active && <Badge variant="teal">● Available</Badge>}
              </div>

              <Link to={`/booking/create?worker=${worker.id}`} className="btn-primary w-full justify-center mb-2" id="book-now-btn">
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
              <Link to={`/messages?worker=${worker.id}`} className="btn-secondary w-full justify-center text-sm" id="message-btn">
                <MessageSquare className="w-4 h-4" />
                Message
              </Link>
            </div>

            {/* Work2Credit Score */}
            <div className={`card p-5 ${scoreInfo.bgColor}`}>
              <div className="flex items-center gap-2 mb-3">
                <Award className={`w-4 h-4 ${scoreInfo.color}`} />
                <span className={`text-sm font-semibold ${scoreInfo.color}`}>Work2Credit Score</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className={`text-4xl font-extrabold ${scoreInfo.color}`}>{worker.work2credit_score}</span>
                <span className={`text-sm mb-1 ${scoreInfo.color}`}>{scoreInfo.label}</span>
              </div>
              <div className="w-full bg-teal-100 rounded-full h-2 mb-2">
                <div className="h-2 bg-teal-500 rounded-full" style={{ width: `${worker.work2credit_score / 10}%` }} />
              </div>
              <p className="text-xs text-teal-600">{scoreInfo.description}</p>
              <p className="text-xs text-teal-400 mt-2 border-t border-teal-100 pt-2">Not an official CIBIL score</p>
            </div>

            {/* Stats */}
            <div className="card p-5">
              <h3 className="font-semibold text-teal-900 mb-4">Professional Stats</h3>
              <div className="space-y-3">
                {[
                  { icon: <Briefcase className="w-4 h-4" />, label: 'Completed Jobs', value: worker.total_completed_jobs },
                  { icon: <Clock className="w-4 h-4" />, label: 'Experience', value: `${worker.years_experience} years` },
                  { icon: <Star className="w-4 h-4" />, label: 'Total Reviews', value: worker.total_reviews },
                  { icon: <Shield className="w-4 h-4" />, label: 'Languages', value: worker.languages.join(', ') },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-teal-400">{item.icon}</span>
                    <span className="text-sm text-teal-600 flex-1">{item.label}</span>
                    <span className="text-sm font-semibold text-teal-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Services, Portfolio, Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="card p-6">
              <h2 className="font-semibold text-teal-900 mb-3">About</h2>
              <p className="text-sm text-teal-700 leading-relaxed">{worker.bio}</p>
            </div>

            {/* Services */}
            <div className="card p-6">
              <h2 className="font-semibold text-teal-900 mb-4">Services Offered</h2>
              <div className="space-y-4">
                {worker.skills.map(skill => (
                  <div key={skill.id} className="flex items-start gap-4 p-4 rounded-xl border border-teal-100 hover:border-teal-300 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-teal-900 text-sm">{skill.title}</h3>
                        {skill.is_verified && <CheckCircle className="w-3.5 h-3.5 text-mint-500" />}
                      </div>
                      <p className="text-xs text-teal-500 leading-relaxed">{skill.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-teal-700">
                        {skill.pricing_model === 'fixed'
                          ? formatCurrency(skill.price!)
                          : formatCurrency(skill.hourly_rate!) + '/hr'
                        }
                      </p>
                      <p className="text-xs text-teal-400 capitalize">{skill.pricing_model}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="card p-6">
              <h2 className="font-semibold text-teal-900 mb-4">Portfolio</h2>
              <div className="grid grid-cols-3 gap-3">
                {worker.portfolio.map(item => (
                  <div key={item.id} className="aspect-square bg-gradient-to-br from-teal-100 to-mint-100 rounded-xl flex items-center justify-center">
                    <div className="text-center p-2">
                      <span className="text-2xl">📷</span>
                      <p className="text-xs text-teal-600 mt-1 leading-tight">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-teal-900">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <StarRating rating={worker.rating} size="sm" showValue />
                  <span className="text-xs text-teal-500">({worker.total_reviews})</span>
                </div>
              </div>
              <div className="space-y-4">
                {worker.reviews.map(review => (
                  <div key={review.id} className="pb-4 border-b border-teal-50 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar name={review.reviewer} size="xs" />
                        <div>
                          <p className="text-sm font-medium text-teal-900">{review.reviewer}</p>
                          <p className="text-xs text-teal-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarRating rating={review.rating} size="sm" />
                        {review.verified && (
                          <Badge variant="mint" size="sm">✓ Verified</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-teal-600 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
