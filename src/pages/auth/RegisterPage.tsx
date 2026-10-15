import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '../../lib/supabase'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/index'
import { useAuth } from '../../contexts/AuthContext'
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

const registerSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm_password: z.string(),
  city: z.string().min(2, 'Enter your city'),
  role: z.enum(['customer', 'worker', 'both']),
  agreed: z.boolean().refine(val => val === true, { message: 'You must accept the terms' }),
}).refine(data => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

type RegisterForm = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const { registerWithEmail } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'both' },
  })

  const role = watch('role')

  const onSubmit = async (data: RegisterForm) => {
    setAuthError(null)

    try {
      const result = await registerWithEmail({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        phone: data.phone,
        city: data.city,
        role: data.role,
      })

      if (!result.success) {
        setAuthError(result.error || 'Failed to create account. Please try again.')
        return
      }

      // Try background Supabase signup if server is active
      try {
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name,
              phone: data.phone,
              city: data.city,
              role: data.role,
            },
          },
        })
      } catch {
        // Safe to ignore in offline or local mode
      }

      toast.success('Account created successfully! Welcome to Work2Credit.')
      navigate(data.role === 'worker' || data.role === 'both' ? '/dashboard/worker' : '/dashboard/customer')
    } catch (err: any) {
      setAuthError(err.message || 'An unexpected error occurred during account creation.')
    }
  }

  if (successMessage) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center p-6">
        <div className="card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-mint-50 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-mint-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-teal-900 mb-3">Check your email</h2>
          <p className="text-teal-600 text-sm mb-6">{successMessage}</p>
          <Link to="/login" className="btn-primary w-full justify-center" id="register-go-to-login">Go to Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-100 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-teal-900 to-teal-700 flex-col justify-between p-12 relative overflow-hidden">
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold">W2</span>
          </div>
          <div>
            <p className="text-white font-bold text-xl">Work2Credit</p>
            <p className="text-teal-300 text-xs">Your Skills. Your Future.</p>
          </div>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Start building your financial future</h2>
          <p className="text-teal-200 mb-8 text-sm leading-relaxed">
            Join 10,000+ skilled workers who have built verified professional profiles and are accessing financial services based on their real work history.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 'Free', label: 'Forever free to join' },
              { value: '1 Profile', label: 'Multiple skills' },
              { value: 'Verified', label: 'Work history' },
              { value: 'Share', label: 'Financial report' },
            ].map(item => (
              <div key={item.label} className="bg-teal-700/40 rounded-xl p-3">
                <p className="text-mint-300 font-bold">{item.value}</p>
                <p className="text-teal-200 text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-teal-400 text-xs relative z-10">
          © {new Date().getFullYear()} Work2Credit. All rights reserved.
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-start justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-lg py-4">
          <div className="lg:hidden mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-mint-500 flex items-center justify-center">
                <span className="text-white font-bold">W2</span>
              </div>
              <span className="text-xl font-bold text-teal-900">Work2Credit</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-teal-900 mb-1">Create your account</h1>
          <p className="text-teal-500 text-sm mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 font-semibold hover:underline" id="register-login-link">
              Sign in
            </Link>
          </p>

          {authError && <Alert type="error" className="mb-6">{authError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Rajesh Kumar"
              required
              leftIcon={<User className="w-4 h-4" />}
              error={errors.full_name?.message}
              id="register-name"
              {...register('full_name')}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                required
                leftIcon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                id="register-email"
                {...register('email')}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 9876543210"
                required
                leftIcon={<Phone className="w-4 h-4" />}
                error={errors.phone?.message}
                id="register-phone"
                {...register('phone')}
              />
            </div>

            <Input
              label="City"
              type="text"
              placeholder="Mumbai, Delhi, Bangalore..."
              required
              leftIcon={<MapPin className="w-4 h-4" />}
              error={errors.city?.message}
              id="register-city"
              {...register('city')}
            />

            {/* Account type */}
            <div>
              <label className="label">Account Purpose <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { value: 'customer', label: 'Hire Services', desc: 'Find & book workers', icon: '🔍' },
                  { value: 'worker',   label: 'Offer Services', desc: 'Get bookings & earn', icon: '🔨' },
                  { value: 'both',     label: 'Both',           desc: 'Hire & offer services', icon: '⚡' },
                ] as const).map(option => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      role === option.value
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-teal-100 hover:border-teal-200'
                    }`}
                    id={`role-${option.value}`}
                  >
                    <input type="radio" value={option.value} {...register('role')} className="sr-only" />
                    <span className="text-xl">{option.icon}</span>
                    <span className="text-xs font-semibold text-teal-900">{option.label}</span>
                    <span className="text-xs text-teal-500 text-center leading-tight">{option.desc}</span>
                    {role === option.value && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 8 characters"
                required
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-teal-400 hover:text-teal-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                error={errors.password?.message}
                id="register-password"
                {...register('password')}
              />
              <Input
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat password"
                required
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-teal-400 hover:text-teal-600">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                error={errors.confirm_password?.message}
                id="register-confirm-password"
                {...register('confirm_password')}
              />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  {...register('agreed')}
                  id="register-terms"
                />
                <span className="text-sm text-teal-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-teal-700 font-semibold hover:underline" target="_blank">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-teal-700 font-semibold hover:underline" target="_blank">Privacy Policy</Link>.
                  I understand that my work data may be used to calculate a Work2Credit Score.
                </span>
              </label>
              {errors.agreed && (
                <p className="text-xs text-red-600 mt-1">{errors.agreed.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
              size="lg"
              id="register-submit-btn"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
