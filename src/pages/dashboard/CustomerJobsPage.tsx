import React, { useState } from 'react'
import { Sidebar } from '../../components/layout/Sidebar'
import { Plus, Briefcase, MapPin, DollarSign, Clock, Users, CheckCircle } from 'lucide-react'
import { formatCurrency } from '../../lib/utils'
import toast from 'react-hot-toast'

interface CustomerJob {
  id: string
  title: string
  category: string
  location: string
  budget: number
  postedAt: string
  applicantsCount: number
  status: 'open' | 'in_progress' | 'closed'
}

const DEMO_JOBS: CustomerJob[] = [
  {
    id: 'JB-104',
    title: 'Full House Deep Cleaning & Kitchen Degreasing',
    category: 'Cleaning',
    location: 'Indiranagar, Bangalore',
    budget: 3500,
    postedAt: '2 days ago',
    applicantsCount: 6,
    status: 'open'
  },
  {
    id: 'JB-101',
    title: 'Fix Leaking Kitchen Sink Pipe & Replace Trap',
    category: 'Plumbing',
    location: 'Koramangala, Bangalore',
    budget: 800,
    postedAt: '1 week ago',
    applicantsCount: 4,
    status: 'closed'
  }
]

export function CustomerJobsPage() {
  const [jobs, setJobs] = useState<CustomerJob[]>(DEMO_JOBS)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Electrical Work')
  const [location, setLocation] = useState('Bangalore')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !budget) return

    const newJob: CustomerJob = {
      id: `JB-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      location,
      budget: Number(budget),
      postedAt: 'Just now',
      applicantsCount: 0,
      status: 'open'
    }

    setJobs([newJob, ...jobs])
    setShowModal(false)
    setTitle('')
    setBudget('')
    setDescription('')
    toast.success('Job posted successfully! Qualified workers in your area are being notified.')
  }

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden">
      <Sidebar type="customer" />

      <main className="flex-1 flex flex-col overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-6xl w-full mx-auto p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-teal-950">My Posted Jobs</h1>
              <p className="text-sm text-teal-600">Post custom tasks and receive quotes from certified professionals</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          </div>

          {/* Jobs list */}
          <div className="space-y-4">
            {jobs.map(job => (
              <div key={job.id} className="card p-6 bg-white border border-teal-100 hover:border-teal-200 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                        {job.category}
                      </span>
                      <span className="text-xs text-teal-400 font-mono">#{job.id}</span>
                      <span className="text-xs text-teal-400">• Posted {job.postedAt}</span>
                    </div>

                    <h3 className="font-bold text-teal-950 text-base mb-2">{job.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-teal-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-500" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-teal-900">
                        Budget: {formatCurrency(job.budget)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="bg-cream-50 px-3.5 py-2 rounded-xl border border-teal-100 text-center">
                      <p className="text-base font-bold text-teal-900">{job.applicantsCount}</p>
                      <p className="text-[10px] text-teal-500 uppercase tracking-wider">Proposals</p>
                    </div>

                    <button
                      onClick={() => toast.success(`Viewing ${job.applicantsCount} proposals for ${job.title}`)}
                      className="btn-primary text-xs py-2 px-4"
                    >
                      View Proposals
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-teal-100">
                <h2 className="text-lg font-bold text-teal-950 mb-4">Post a Custom Job Request</h2>
                <form onSubmit={handlePostJob} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-1">Job Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electrical Switchboard Upgrade & Earthing"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-teal-800 block mb-1">Category</label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                      >
                        <option value="Electrical Work">Electrical Work</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Painting">Painting</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Tutoring">Tutoring</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-teal-800 block mb-1">Estimated Budget (₹)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 2000"
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-1">Location / Locality</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HSR Layout, Sector 2"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-1">Detailed Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="Mention urgency, specific tools or materials needed..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-xs font-medium text-teal-700 hover:bg-teal-50 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary text-xs py-2 px-4"
                    >
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
