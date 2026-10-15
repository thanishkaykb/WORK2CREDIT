import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { StarRating } from '../components/ui/index'
import { SERVICE_CATEGORIES } from '../lib/utils'
import { Search, MapPin, ArrowRight, CheckCircle, Shield, TrendingUp, Zap, Star, Award, Users, Briefcase, ChevronDown } from 'lucide-react'

const DEMO_PROFESSIONALS = [
  { id: '1', name: 'Rajesh Kumar',  category: 'Electrical Work',  rating: 4.9, jobs: 127, city: 'Mumbai',    avatar: '⚡', verified: true,  score: 847, price: '₹500/hr' },
  { id: '2', name: 'Priya Sharma',  category: 'Tutoring',          rating: 4.8, jobs: 89,  city: 'Bangalore', avatar: '📚', verified: true,  score: 782, price: '₹400/hr' },
  { id: '3', name: 'Amit Patel',    category: 'Plumbing',          rating: 4.7, jobs: 203, city: 'Ahmedabad', avatar: '🔧', verified: true,  score: 911, price: '₹450/hr' },
  { id: '4', name: 'Sunita Devi',   category: 'Cleaning',          rating: 4.9, jobs: 156, city: 'Delhi',     avatar: '🧹', verified: true,  score: 863, price: '₹350/hr' },
  { id: '5', name: 'Ravi Nair',     category: 'Carpentry',         rating: 4.6, jobs: 74,  city: 'Chennai',   avatar: '🪚', verified: false, score: 621, price: '₹600/hr' },
  { id: '6', name: 'Meena Joshi',   category: 'Design',            rating: 4.8, jobs: 52,  city: 'Pune',      avatar: '🎨', verified: true,  score: 744, price: '₹800/hr' },
]

const TESTIMONIALS = [
  {
    name: 'Ananya Krishnan',
    role: 'Homeowner, Hyderabad',
    text: 'Found a brilliant electrician through Work2Credit in 20 minutes. The Work2Credit Score gave me real confidence — you can actually see the verified job history.',
    rating: 5,
    avatar: 'AK',
  },
  {
    name: 'Suresh Yadav',
    role: 'Freelance Plumber, Jaipur',
    text: 'I\'ve been doing plumbing for 12 years but banks never took me seriously. Work2Credit finally shows my actual work record. Already got a loan conversation going!',
    rating: 5,
    avatar: 'SY',
  },
  {
    name: 'Fatima Shaikh',
    role: 'Home Tutor, Lucknow',
    text: 'As a tutor working independently, I had no proof of income. Work2Credit tracks my sessions, earnings, and reviews. My Work2Credit Score is 760 now.',
    rating: 5,
    avatar: 'FS',
  },
]

const FAQS = [
  {
    q: 'What is the Work2Credit Score?',
    a: 'The Work2Credit Score is an experimental platform-specific score (0–1000) that reflects your professional reliability, verified earnings, customer ratings, and booking history on the platform. It is NOT an official CIBIL score or bureau score, and does not guarantee loan approvals.',
  },
  {
    q: 'Can I both hire and offer services on one account?',
    a: 'Yes! Work2Credit allows you to act as both a customer and a service provider under a single account. You can add multiple skills and categories without creating separate accounts.',
  },
  {
    q: 'How are cash payments handled?',
    a: 'For cash payments, both the customer and worker confirm the transaction independently on the platform. Only mutually confirmed cash transactions contribute to your verified earnings. Unconfirmed declarations are clearly marked.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Yes. Your data is protected by Supabase Row Level Security, meaning only you can access your private records. Identity documents are never shown publicly. Sensitive financial information requires your explicit consent to share.',
  },
  {
    q: 'How do I verify my skills and identity?',
    a: 'You can upload certificates, qualifications, and ID documents through the Verification Centre. Our team reviews submissions and awards verified badges, which improve your Work2Credit Score.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'Work2Credit supports UPI, debit and credit cards (via Razorpay and Stripe), and cash recording. Online payments are processed securely through the payment gateway — we never store card numbers.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-teal-100 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-teal-50/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-teal-900 pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-teal-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-teal-600 leading-relaxed border-t border-teal-50 pt-3">
          {a}
        </div>
      )}
    </div>
  )
}

export function LandingPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/marketplace?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero-bg py-20 md:py-28 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-mint-200/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-6">
              <Zap className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">India's first gig worker credit platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-teal-900 leading-tight mb-6 text-balance">
              One Profile.{' '}
              <span className="gradient-text">Multiple Skills.</span>{' '}
              More Opportunities.
            </h1>
            <p className="text-lg md:text-xl text-teal-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Find jobs, manage bookings, receive payments, and build a verified professional and financial history — all in one place. Your work history is your credit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" className="btn-primary text-base px-8 py-3" id="hero-get-started">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/marketplace" className="btn-secondary text-base px-8 py-3" id="hero-explore">
                Explore Services
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card-lg border border-teal-100 p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search services, skills..."
                  className="flex-1 py-2 text-sm outline-none text-teal-900 placeholder-teal-400 bg-transparent"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  id="hero-search-query"
                />
              </div>
              <div className="flex items-center gap-2 px-3 border-t sm:border-t-0 sm:border-l border-teal-100">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="City or area"
                  className="flex-1 py-2 text-sm outline-none text-teal-900 placeholder-teal-400 bg-transparent"
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  id="hero-search-location"
                />
              </div>
              <button type="submit" className="btn-primary rounded-xl px-6 py-2.5" id="hero-search-btn">
                Search
              </button>
            </div>
          </form>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: '10,000+', label: 'Skilled Workers' },
              { value: '50,000+', label: 'Jobs Completed' },
              { value: '₹2Cr+', label: 'Verified Earnings' },
              { value: '4.8★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/80 rounded-xl p-4 text-center shadow-sm">
                <p className="text-xl font-bold text-teal-700">{stat.value}</p>
                <p className="text-xs text-teal-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">Popular Services</h2>
            <p className="section-subheading">Browse across 12+ professional categories</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {SERVICE_CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/marketplace?category=${cat.id}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-teal-100 hover:border-teal-300 hover:shadow-card-hover bg-white hover:-translate-y-0.5 transition-all duration-200 text-center"
                id={`category-${cat.id}`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-medium text-teal-700 leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">How Work2Credit Works</h2>
            <p className="section-subheading">From registration to financial profile in four steps</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* For Workers */}
            <div>
              <h3 className="text-lg font-semibold text-teal-800 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-teal-600" />
                For Workers & Freelancers
              </h3>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Create Your Profile', desc: 'Register once and add all your skills — electrical, plumbing, tutoring, and more — under one account.' },
                  { step: '02', title: 'Accept Bookings', desc: 'Receive booking requests, confirm availability, and manage jobs through your dashboard.' },
                  { step: '03', title: 'Complete Work & Get Paid', desc: 'Finish the job, receive payment via UPI, card, or cash, and get a verified record on the platform.' },
                  { step: '04', title: 'Build Your Score', desc: 'Your Work2Credit Score grows with every verified job, earning, and great review — opening doors to financial services.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-teal-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* For Customers */}
            <div>
              <h3 className="text-lg font-semibold text-teal-800 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                For Customers
              </h3>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Search & Discover', desc: 'Browse verified professionals by service, location, rating, and Work2Credit Score.' },
                  { step: '02', title: 'Book Instantly or Post a Job', desc: 'Choose a professional and book directly, or post a custom job and receive quotations.' },
                  { step: '03', title: 'Pay Securely', desc: 'Pay via UPI, card, or cash. All transactions are recorded and securely stored.' },
                  { step: '04', title: 'Leave a Review', desc: 'Rate your experience and help build the community. Your review is tied to a real booking.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-mint-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-teal-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work2Credit Score Intro */}
      <section className="py-16 bg-gradient-to-br from-teal-900 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNlYzNGgtNnptMC0xMHY2aDZWMjRoLTZ6bTEwIDEwdjZoNlYzNGgtNnptMC0xMHY2aDZWMjRoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-700/50 rounded-full px-4 py-1.5 mb-5">
                <Award className="w-4 h-4 text-mint-300" />
                <span className="text-sm text-mint-200 font-medium">Work2Credit Score</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                Your Work History Is Your Credit Profile
              </h2>
              <p className="text-teal-200 mb-6 leading-relaxed">
                The Work2Credit Score (0–1000) is a transparent, explainable measure of your professional reliability — built from real, verified platform activity. Every job you complete, every great review you earn, and every payment you receive contributes to your score.
              </p>
              <p className="text-teal-300 text-sm mb-8 border border-teal-700 rounded-xl p-4 bg-teal-800/40">
                ⚠️ <strong>Important disclaimer:</strong> Work2Credit Score is an experimental, platform-specific score. It is not an official CIBIL score, credit bureau score, or guarantee of loan approval. It is supporting information for financial institutions.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Verified Work Completion', weight: '25%' },
                  { label: 'Earnings Consistency', weight: '20%' },
                  { label: 'Customer Ratings', weight: '20%' },
                  { label: 'Payment Reliability', weight: '15%' },
                  { label: 'Verified Skills', weight: '10%' },
                  { label: 'Repeat Customers', weight: '10%' },
                ].map(item => (
                  <div key={item.label} className="bg-teal-700/40 rounded-xl p-3">
                    <p className="text-mint-300 font-bold text-lg">{item.weight}</p>
                    <p className="text-teal-200 text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
              <Link to="/score" className="btn-mint inline-flex" id="score-learn-more">
                See Score Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                {/* Score ring visualization */}
                <div className="w-64 h-64 rounded-full bg-teal-700/30 border-4 border-teal-600 flex items-center justify-center relative">
                  <div className="text-center">
                    <p className="text-6xl font-extrabold text-white">847</p>
                    <p className="text-mint-300 font-semibold text-lg">Excellent</p>
                    <p className="text-teal-300 text-xs mt-1">Sample Score</p>
                  </div>
                  <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-mint-400 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                {/* Score breakdown cards */}
                <div className="absolute -left-16 top-8 bg-white rounded-xl p-3 shadow-lg text-xs">
                  <p className="text-teal-500 font-medium">Verified Jobs</p>
                  <p className="text-teal-900 font-bold text-lg">127</p>
                </div>
                <div className="absolute -right-16 bottom-8 bg-white rounded-xl p-3 shadow-lg text-xs">
                  <p className="text-teal-500 font-medium">Avg Rating</p>
                  <p className="text-teal-900 font-bold text-lg">4.9 ★</p>
                </div>
                <div className="absolute left-0 -bottom-8 bg-white rounded-xl p-3 shadow-lg text-xs">
                  <p className="text-teal-500 font-medium">Earnings</p>
                  <p className="text-teal-900 font-bold text-lg">₹3.2L</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">Featured Professionals</h2>
            <p className="section-subheading">Verified workers with proven track records — all demo data for illustration</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEMO_PROFESSIONALS.map(pro => (
              <Link
                key={pro.id}
                to={`/marketplace/worker/${pro.id}`}
                className="card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
                id={`worker-card-${pro.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-100 to-mint-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {pro.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-teal-900 group-hover:text-teal-600 transition-colors">{pro.name}</h3>
                      {pro.verified && (
                        <CheckCircle className="w-4 h-4 text-mint-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-teal-500">{pro.category}</p>
                    <p className="text-xs text-teal-400 mt-0.5">📍 {pro.city}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <StarRating rating={pro.rating} size="sm" showValue />
                  <span className="text-xs text-teal-500">{pro.jobs} jobs</span>
                </div>
                <div className="mt-3 flex items-center justify-between pt-3 border-t border-teal-50">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-xs text-teal-600 font-medium">Score: <strong className="text-teal-800">{pro.score}</strong></span>
                  </div>
                  <span className="text-sm font-semibold text-teal-700">{pro.price}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/marketplace" className="btn-secondary" id="view-all-workers">
              View All Professionals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Why Work2Credit?</h2>
            <p className="section-subheading">Built for the 450+ million gig workers in India</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: 'Verified Profiles', desc: 'Identity verification, skill certificates, and booking history create a trustworthy professional record.' },
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Alternative Credit Profile', desc: 'Build a financial identity from your work — not just bank statements. Share it with lenders when you need.' },
              { icon: <Users className="w-6 h-6" />, title: 'Multi-Skill Freedom', desc: 'List all your skills under one profile. No need for multiple accounts across different platforms.' },
              { icon: <Star className="w-6 h-6" />, title: 'Real Customer Reviews', desc: 'Only verified bookings can receive reviews. No fake ratings — only genuine feedback from real customers.' },
              { icon: <Zap className="w-6 h-6" />, title: 'Instant Booking', desc: 'Customers find and book you directly. Manage everything from your dashboard — no calls needed.' },
              { icon: <Award className="w-6 h-6" />, title: 'Transparent Score', desc: 'Every point in your Work2Credit Score is explained. You know exactly what to improve and why.' },
            ].map(benefit => (
              <div key={benefit.title} className="card p-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-teal-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-teal-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-heading">What People Say</h2>
            <p className="section-subheading">
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium mr-2">DEMO</span>
              Fictional testimonials for illustration purposes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card p-6">
                <StarRating rating={t.rating} size="sm" className="mb-4" />
                <p className="text-sm text-teal-700 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-mint-400 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-teal-900">{t.name}</p>
                    <p className="text-xs text-teal-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-heading">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(faq => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Building Your Financial Future Today</h2>
          <p className="text-teal-100 mb-8">Join thousands of skilled professionals already building verified work histories on Work2Credit.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-mint text-base px-8 py-3" id="cta-register">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/marketplace" className="bg-white/20 text-white border border-white/30 hover:bg-white/30 inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-colors" id="cta-explore">
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
