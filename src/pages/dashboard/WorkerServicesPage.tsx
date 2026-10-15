import React, { useState } from 'react'
import { Sidebar } from '../../components/layout/Sidebar'
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, DollarSign, Clock, Tag } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatCurrency } from '../../lib/utils'

interface ServiceItem {
  id: string
  title: string
  category: string
  pricingModel: 'fixed' | 'hourly'
  rate: number
  description: string
  active: boolean
  completedCount: number
}

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Ceiling Fan Installation & Wiring Repair',
    category: 'Electrical Work',
    pricingModel: 'fixed',
    rate: 450,
    description: 'Complete inspection of ceiling wiring, bracket mounting, regulator testing, and full installation.',
    active: true,
    completedCount: 68
  },
  {
    id: 's2',
    title: 'Inverter & Solar Battery Connection',
    category: 'Electrical Work',
    pricingModel: 'fixed',
    rate: 1200,
    description: 'Professional setup of heavy inverter units, battery earthing, and load balancing across circuits.',
    active: true,
    completedCount: 34
  },
  {
    id: 's3',
    title: 'General Electrical Diagnostic Consultation',
    category: 'Electrical Work',
    pricingModel: 'hourly',
    rate: 500,
    description: 'On-site troubleshooting for short circuits, tripping MCBs, and power leakage.',
    active: true,
    completedCount: 25
  }
]

export function WorkerServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Electrical Work')
  const [pricingModel, setPricingModel] = useState<'fixed' | 'hourly'>('fixed')
  const [rate, setRate] = useState('')
  const [description, setDescription] = useState('')

  const handleToggleActive = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
    toast.success('Service visibility updated')
  }

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id))
    toast.success('Service removed from catalog')
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !rate) return

    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title,
      category,
      pricingModel,
      rate: Number(rate),
      description,
      active: true,
      completedCount: 0
    }

    setServices([...services, newService])
    setShowModal(false)
    setTitle('')
    setRate('')
    setDescription('')
    toast.success('New service successfully added!')
  }

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden">
      <Sidebar type="worker" />

      <main className="flex-1 flex flex-col overflow-y-auto pt-14 lg:pt-0">
        <div className="max-w-6xl w-full mx-auto p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-teal-950">My Services Catalog</h1>
              <p className="text-sm text-teal-600">List and manage services customers can book directly from your profile</p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Service
            </button>
          </div>

          {/* Services List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => (
              <div
                key={svc.id}
                className={`card p-5 bg-white border transition-all flex flex-col justify-between ${
                  svc.active ? 'border-teal-100 hover:border-teal-300' : 'border-gray-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
                      {svc.category}
                    </span>
                    <button
                      onClick={() => handleToggleActive(svc.id)}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        svc.active ? 'bg-mint-100 text-mint-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {svc.active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {svc.active ? 'Active' : 'Paused'}
                    </button>
                  </div>

                  <h3 className="font-bold text-teal-950 text-base mb-2">{svc.title}</h3>
                  <p className="text-xs text-teal-600 mb-4 line-clamp-2">{svc.description}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between border-t border-teal-50 pt-3 mb-3">
                    <div className="text-left">
                      <p className="text-[10px] text-teal-400 uppercase">Rate</p>
                      <p className="text-sm font-bold text-teal-900">
                        {formatCurrency(svc.rate)} {svc.pricingModel === 'hourly' && '/ hr'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-teal-400 uppercase">Bookings</p>
                      <p className="text-sm font-semibold text-teal-700">{svc.completedCount} delivered</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-teal-50 pt-2">
                    <button
                      onClick={() => handleDelete(svc.id)}
                      className="p-1.5 text-teal-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
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
                <h2 className="text-lg font-bold text-teal-950 mb-4">Add a Service to Your Profile</h2>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-1">Service Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RO Water Purifier Servicing"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                    />
                  </div>

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
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Tutoring">Tutoring</option>
                      <option value="Design">Design & Digital</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-teal-800 block mb-1">Pricing Model</label>
                      <select
                        value={pricingModel}
                        onChange={e => setPricingModel(e.target.value as any)}
                        className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                      >
                        <option value="fixed">Fixed Price</option>
                        <option value="hourly">Hourly Rate</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-teal-800 block mb-1">Price (₹)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 500"
                        value={rate}
                        onChange={e => setRate(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-teal-800 block mb-1">Description & Scope</label>
                    <textarea
                      rows={3}
                      placeholder="What is included in this service..."
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
                      Add Service
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
