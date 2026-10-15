import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { useAuth } from '../contexts/AuthContext'
import { Avatar } from '../components/ui/index'
import {
  User, Mail, Phone, MapPin, Briefcase, Award,
  Camera, Check, ExternalLink, Plus, Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

export function ProfilePage() {
  const { profile, updateProfile } = useAuth()

  const [fullName, setFullName] = useState(profile?.full_name || 'Rajesh Kumar')
  const [email, setEmail] = useState(profile?.email || 'worker@demo.com')
  const [phone, setPhone] = useState(profile?.phone || '+91 98765 43210')
  const [city, setCity] = useState(profile?.city || 'Mumbai')
  const [bio, setBio] = useState(profile?.bio || 'Certified Master Electrician with 10+ years experience in residential, commercial, and solar wiring projects.')
  const [serviceRadius, setServiceRadius] = useState(25)
  const [languages, setLanguages] = useState(['English', 'Hindi', 'Marathi'])
  const [skills, setSkills] = useState(['Electrical Wiring', 'Appliance Repair', 'Solar Inverter Installation', 'MCB & Earthing'])

  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (profile) {
      await updateProfile({
        full_name: fullName,
        phone,
        city,
        bio,
      })
    }
    toast.success('Profile updated and saved to database!')
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-950 flex items-center gap-2">
              <User className="w-6 h-6 text-teal-600" /> My Profile
            </h1>
            <p className="text-sm text-teal-600">Update your public profile and skill catalog</p>
          </div>

          <Link
            to={`/profile/${profile?.id || '1'}`}
            className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 self-start sm:self-auto bg-white"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Public Profile
          </Link>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar & Header */}
          <div className="card p-6 bg-white border border-teal-100 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar name={fullName} size="xl" ring />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-md"
                title="Change Avatar"
                onClick={() => toast.success('Select an image from your device')}
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-teal-950">{fullName}</h2>
              <p className="text-xs text-teal-500 capitalize">{profile?.role || 'Worker & Customer'} Account</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-mint-50 text-mint-700 text-xs font-semibold">
                  <Award className="w-3.5 h-3.5 text-mint-600" /> Score: {profile?.work2credit_score || 847}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-teal-600" /> 127 Jobs Completed
                </span>
              </div>
            </div>
          </div>

          {/* Basic Details */}
          <div className="card p-6 bg-white border border-teal-100">
            <h3 className="text-base font-bold text-teal-950 mb-4">Personal & Contact Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-teal-800 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-teal-800 block mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full text-xs px-3 py-2 border border-teal-100 bg-cream-50 text-teal-500 rounded-xl outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-teal-800 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-teal-800 block mb-1">Operating City</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-teal-800 block mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Multi-skills Catalog */}
          <div className="card p-6 bg-white border border-teal-100">
            <h3 className="text-base font-bold text-teal-950 mb-1">Skills & Services Listed</h3>
            <p className="text-xs text-teal-500 mb-4">List all your services under this single profile account.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map(s => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-teal-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add another skill (e.g. CCTV Camera Setup)..."
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-teal-200 rounded-xl focus:ring-1 focus:ring-teal-600 outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn-secondary text-xs px-4 py-2 bg-teal-50 text-teal-700 border-teal-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="submit" className="btn-primary text-sm px-6 py-2.5">
              Save Profile
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
