import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/index'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const { loginWithEmail, loginAsDemo } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setAuthError(null)

    // Check if user entered demo credentials
    const emailLower = data.email.toLowerCase().trim()
    if (emailLower === 'worker@demo.com') {
      loginAsDemo('worker')
      toast.success('Welcome back, Rajesh! (Worker Demo)')
      navigate('/dashboard/worker')
      return
    }
    if (emailLower === 'customer@demo.com') {
      loginAsDemo('customer')
      toast.success('Welcome back, Ananya! (Customer Demo)')
      navigate('/dashboard/customer')
      return
    }
    if (emailLower === 'admin@demo.com') {
      loginAsDemo('admin')
      toast.success('Welcome, Platform Administrator!')
      navigate('/admin')
      return
    }

    try {
      const res = await loginWithEmail(data.email, data.password)

      if (!res.success) {
        setAuthError(res.error || 'Incorrect email or password.')
        return
      }

      if (res.profile) {
        toast.success(`Welcome back, ${res.profile.full_name}!`)
        if (res.profile.is_admin) {
          navigate('/admin')
        } else if (res.profile.role === 'worker' || res.profile.role === 'both') {
          navigate('/dashboard/worker')
        } else {
          navigate('/dashboard/customer')
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-900 to-teal-700 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjxwYXRoIGQ9Ik0zNiAzNHY2aDZWMzRoLTZ6bTAtMTB2Nmg2VjI0aC02em0xMCAxMHY2aDZWMzRoLTZ6bTAtMTB2Nmg2VjI0aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <Link to="/" className="flex items-center gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold">W2</span>
          </div>
          <div>
            <p className="text-white font-bold text-xl">Work2Credit</p>
            <p className="text-teal-300 text-xs">Your Skills. Your Future.</p>
          </div>
        </Link>

        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome back</h2>
          <p className="text-teal-200 mb-8">Sign in to access your dashboard, bookings, and Work2Credit Score.</p>
          <div className="space-y-4">
            {[
              'Sign in with your email address anytime',
              'View your Work2Credit Score dashboard',
              'Manage bookings and availability',
              'Track verified earnings and transactions',
              'Share your financial activity report',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-mint-400 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-teal-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-teal-400 text-xs relative">
          © {new Date().getFullYear()} Work2Credit. Secure Database Authentication.
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-mint-500 flex items-center justify-center">
                <span className="text-white font-bold">W2</span>
              </div>
              <span className="text-xl font-bold text-teal-900">Work2Credit</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-teal-900 mb-2">Sign in to your account</h1>
          <p className="text-teal-500 text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline" id="login-register-link">
              Create one free
            </Link>
          </p>

          {authError && (
            <Alert type="error" className="mb-6">{authError}</Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              id="login-email"
              {...register('email')}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              autoComplete="current-password"
              required
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-teal-400 hover:text-teal-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              error={errors.password?.message}
              id="login-password"
              {...register('password')}
            />

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline" id="login-forgot-link">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
              size="lg"
              id="login-submit-btn"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gradient-to-br from-teal-50 to-mint-50/50 rounded-2xl border border-teal-100">
            <p className="text-xs text-teal-800 font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Instant Demo Logins (1-Click)
            </p>
            <p className="text-xs text-teal-600 mb-3">Explore the full platform immediately with pre-loaded profiles:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('worker')
                  toast.success('Logged in as Rajesh Kumar (Worker)')
                  navigate('/dashboard/worker')
                }}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm text-center"
              >
                👷 Worker
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('customer')
                  toast.success('Logged in as Ananya Sharma (Customer)')
                  navigate('/dashboard/customer')
                }}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-white border border-teal-300 text-teal-800 hover:bg-teal-50 transition-colors shadow-sm text-center"
              >
                🛍️ Customer
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemo('admin')
                  toast.success('Logged in as Platform Admin')
                  navigate('/admin')
                }}
                className="px-2.5 py-2 text-xs font-semibold rounded-lg bg-teal-900 text-white hover:bg-teal-800 transition-colors shadow-sm text-center"
              >
                ⚡ Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
