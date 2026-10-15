import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { ArrowLeft, Home, Search } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full">
          <div className="w-20 h-20 rounded-3xl bg-teal-100/60 text-teal-800 text-3xl font-extrabold flex items-center justify-center mx-auto mb-6 shadow-sm">
            404
          </div>
          <h1 className="text-2xl font-bold text-teal-950 mb-2">Page Not Found</h1>
          <p className="text-sm text-teal-600 mb-8 leading-relaxed">
            The page you are looking for doesn't exist or has moved. Browse our verified marketplace or return home.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary text-xs py-2.5 px-4 flex items-center justify-center gap-1.5">
              <Home className="w-4 h-4" /> Go to Homepage
            </Link>
            <Link to="/marketplace" className="btn-secondary text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 bg-white border-teal-200">
              <Search className="w-4 h-4" /> Find Services
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
