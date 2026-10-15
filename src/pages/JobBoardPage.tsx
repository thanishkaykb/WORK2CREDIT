import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Badge, Alert } from '../components/ui/index'
import { Search, MapPin, Calendar, Clock, DollarSign, Plus, ChevronDown, Filter } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { formatCurrency } from '../lib/utils'

const DEMO_JOBS = [
  {
    id: '1', title: 'AC Wiring in new flat', category: 'electrical', city: 'Mumbai',
    budget_min: 2000, budget_max: 4000, preferred_date: '2026-10-20',
    description: 'Need complete AC wiring done for a 2BHK flat in Andheri. Materials to be provided by worker.',
    customer: 'Ananya S.', posted: '2 hours ago', applicants: 3, status: 'open',
  },
  {
    id: '2', title: 'Generator installation and wiring', category: 'electrical', city: 'Mumbai',
    budget_min: 5000, budget_max: 8000, preferred_date: '2026-10-22',
    description: 'Install a 5KW generator and connect it to the building\'s power system. 2-storey residential building.',
    customer: 'Rahul M.', posted: '5 hours ago', applicants: 7, status: 'open',
  },
  {
    id: '3', title: 'Pipe leak repair - kitchen and bathroom', category: 'plumbing', city: 'Pune',
    budget_min: 800, budget_max: 1500, preferred_date: '2026-10-19',
    description: 'Multiple pipe leaks in kitchen and bathroom. Urgently needed.',
    customer: 'Priya K.', posted: '1 day ago', applicants: 5, status: 'open',
  },
  {
    id: '4', title: 'Online tutor for Class 10 Math', category: 'tutoring', city: 'Online',
    budget_min: 300, budget_max: 500, preferred_date: null,
    description: 'Looking for an experienced Math tutor for Class 10 CBSE board preparation. 1 hour/day, 5 days/week.',
    customer: 'Sunita D.', posted: '2 days ago', applicants: 12, status: 'open',
  },
  {
    id: '5', title: 'Deep cleaning for 3BHK', category: 'cleaning', city: 'Bangalore',
    budget_min: 2500, budget_max: 3500, preferred_date: '2026-10-25',
    description: 'Full deep cleaning required for move-in ready 3BHK. Include kitchen, bathrooms, and all rooms.',
    customer: 'Kiran P.', posted: '3 days ago', applicants: 9, status: 'open',
  },
]

const CATEGORY_ICONS: Record<string, string> = {
  electrical: '⚡', plumbing: '🔧', cleaning: '🧹', tutoring: '📚',
  carpentry: '🪚', mechanical: '⚙️', design: '🎨', coding: '💻',
}

function JobCard({ job }: { job: typeof DEMO_JOBS[0] }) {
  return (
    <div className="card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-xl flex-shrink-0">
          {CATEGORY_ICONS[job.category] || '💼'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-teal-900 mb-1 leading-tight">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-teal-500">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.city}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.posted}</span>
            <span>{job.applicants} applicants</span>
          </div>
        </div>
        <Badge variant="teal" size="sm">{job.category}</Badge>
      </div>

      <p className="text-sm text-teal-600 leading-relaxed mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-teal-50">
        <div>
          <p className="text-xs text-teal-500">Budget</p>
          <p className="text-sm font-bold text-teal-800">
            {formatCurrency(job.budget_min)} – {formatCurrency(job.budget_max)}
          </p>
        </div>
        {job.preferred_date && (
          <div className="text-right">
            <p className="text-xs text-teal-500">Preferred Date</p>
            <p className="text-xs font-medium text-teal-700">{job.preferred_date}</p>
          </div>
        )}
        <Link to={`/jobs/${job.id}`} className="btn-primary text-sm py-2" id={`apply-job-${job.id}`}>
          View & Apply
        </Link>
      </div>
    </div>
  )
}

export function JobBoardPage() {
  const { isAuthenticated, isWorker } = useAuth()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = DEMO_JOBS.filter(job => {
    if (categoryFilter && job.category !== categoryFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return job.title.toLowerCase().includes(q) ||
             job.description.toLowerCase().includes(q) ||
             job.category.toLowerCase().includes(q) ||
             job.city.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Job Board</h1>
            <p className="text-teal-500 text-sm">Find work that matches your skills</p>
          </div>
          {isAuthenticated && (
            <Link to="/dashboard/customer/jobs" className="btn-primary text-sm" id="post-job-btn">
              <Plus className="w-4 h-4" />
              Post a Job
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-teal-100 p-3 flex gap-2 mb-5">
          <div className="flex-1 flex items-center gap-2 px-2">
            <Search className="w-4 h-4 text-teal-400 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs by skill, title, or location..."
              className="flex-1 py-2 text-sm outline-none bg-transparent text-teal-900 placeholder-teal-400"
              id="job-search"
            />
          </div>
          <select
            className="input text-sm w-auto py-2 flex-shrink-0"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            id="job-category-filter"
          >
            <option value="">All Categories</option>
            {Object.entries(CATEGORY_ICONS).map(([cat, icon]) => (
              <option key={cat} value={cat}>{icon} {cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        {!isAuthenticated && (
          <Alert type="info" className="mb-5">
            <Link to="/register" className="font-semibold underline">Register as a worker</Link> to apply for jobs and submit quotations.
          </Alert>
        )}

        <p className="text-sm text-teal-500 mb-4">
          <strong className="text-teal-800">{filtered.length}</strong> open jobs available
        </p>

        <div className="space-y-4">
          {filtered.map(job => <JobCard key={job.id} job={job} />)}
          {filtered.length === 0 && (
            <div className="card p-10 text-center">
              <p className="text-teal-600 font-medium">No jobs match your search</p>
              <button onClick={() => { setSearch(''); setCategoryFilter('') }} className="btn-secondary text-sm mt-3">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
