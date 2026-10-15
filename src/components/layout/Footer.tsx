import React from 'react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-teal-900 text-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-mint-400 flex items-center justify-center">
                <span className="text-white font-bold">W2</span>
              </div>
              <span className="text-lg font-bold text-white">Work2Credit</span>
            </div>
            <p className="text-sm text-teal-300 leading-relaxed mb-4">
              Building financial futures for gig workers, freelancers, and self-employed professionals across India.
            </p>
            <p className="text-xs text-teal-400">
              Work2Credit Score is an experimental platform score. It is not an official CIBIL or bureau score.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/marketplace" className="text-teal-300 hover:text-white transition-colors">Find Services</Link></li>
              <li><Link to="/jobs" className="text-teal-300 hover:text-white transition-colors">Find Work</Link></li>
              <li><Link to="/register" className="text-teal-300 hover:text-white transition-colors">Join as Worker</Link></li>
              <li><Link to="/how-it-works" className="text-teal-300 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/score" className="text-teal-300 hover:text-white transition-colors">Work2Credit Score</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/help" className="text-teal-300 hover:text-white transition-colors">Help Centre</Link></li>
              <li><Link to="/disputes" className="text-teal-300 hover:text-white transition-colors">Disputes</Link></li>
              <li><Link to="/verification" className="text-teal-300 hover:text-white transition-colors">Verification</Link></li>
              <li><a href="mailto:support@work2credit.in" className="text-teal-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy" className="text-teal-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-teal-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="text-teal-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-teal-400 text-center sm:text-left">
            © {new Date().getFullYear()} Work2Credit. All rights reserved. Made with ❤️ in India.
          </p>
          <p className="text-xs text-teal-500 text-center">
            🔒 Secured by Supabase · Payments via Razorpay & Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}
