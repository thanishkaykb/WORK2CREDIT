import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '../../lib/supabase'
import { localDatabase } from '../../lib/localDatabase'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/index'
import { Mail, ArrowLeft, KeyRound } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
})

type ForgotForm = z.infer<typeof schema>

export function ForgotPasswordPage() {
  const [sentEmail, setSentEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ForgotForm) => {
    setError(null)
    const emailNorm = data.email.trim().toLowerCase()

    // 1. Check localDatabase
    const localUser = localDatabase.findUserByEmail(emailNorm)

    // 2. Also try Supabase if configured
    try {
      await supabase.auth.resetPasswordForEmail(emailNorm, {
        redirectTo: `${window.location.origin}/reset-password?email=${encodeURIComponent(emailNorm)}`,
      })
    } catch {
      // offline fallback
    }

    if (localUser) {
      setSentEmail(emailNorm)
    } else {
      // If neither local nor supabase, still show sent message for security, or error if prefered
      setSentEmail(emailNorm)
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>

        <div className="card p-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
            <Mail className="w-6 h-6 text-teal-600" />
          </div>

          {sentEmail ? (
            <div>
              <h1 className="text-xl font-bold text-teal-900 mb-2">Password Reset Ready</h1>
              <p className="text-teal-600 text-sm mb-6 leading-relaxed">
                If an account exists for <span className="font-semibold text-teal-900">{sentEmail}</span>, you can set a new password immediately.
              </p>
              <div className="space-y-3">
                <Link
                  to={`/reset-password?email=${encodeURIComponent(sentEmail)}`}
                  className="btn-primary w-full justify-center flex items-center gap-2"
                  id="forgot-proceed-reset"
                >
                  <KeyRound className="w-4 h-4" />
                  Reset Password Now
                </Link>
                <Link to="/login" className="btn-secondary w-full justify-center" id="forgot-back-to-login">
                  Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-bold text-teal-900 mb-2">Forgot your password?</h1>
              <p className="text-teal-500 text-sm mb-6">
                Enter your registered email address and we'll help you reset your password.
              </p>

              {error && <Alert type="error" className="mb-5">{error}</Alert>}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  required
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  id="forgot-email"
                  {...register('email')}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                  id="forgot-submit-btn"
                >
                  Send Reset Link
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Reset password page
const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirm: z.string(),
}).refine((d: any) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] })

type ResetForm = z.infer<typeof resetSchema>

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const emailParam = searchParams.get('email') || ''
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  })

  const onSubmit = async (data: ResetForm) => {
    setError(null)
    let updated = false

    if (emailParam) {
      updated = localDatabase.resetPassword(emailParam, data.password)
    }

    try {
      const { error: sbError } = await supabase.auth.updateUser({ password: data.password })
      if (!sbError) updated = true
    } catch {
      // safe fallback
    }

    if (updated || !emailParam) {
      setSuccess(true)
    } else {
      setError('Could not locate user account to update password.')
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-6">
      <div className="card p-8 max-w-md w-full">
        <h1 className="text-xl font-bold text-teal-900 mb-2">Set new password</h1>
        <p className="text-teal-500 text-sm mb-6">
          {emailParam ? `Choose a strong new password for ${emailParam}.` : 'Choose a strong password for your account.'}
        </p>

        {success ? (
          <div>
            <Alert type="success" className="mb-5">Password updated successfully! You can now log in with your email.</Alert>
            <Link to="/login" className="btn-primary w-full justify-center" id="reset-go-to-login">Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <Alert type="error">{error}</Alert>}
            <Input label="New Password" type="password" required error={errors.password?.message} id="reset-password" {...register('password')} />
            <Input label="Confirm Password" type="password" required error={errors.confirm?.message} id="reset-confirm" {...register('confirm')} />
            <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting} id="reset-submit-btn">
              Update Password
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
