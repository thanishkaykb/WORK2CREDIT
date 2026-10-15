import React from 'react'
import { cn } from '../../lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <svg
        className={cn('animate-spin text-teal-600', sizes[size])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {label && <p className="text-sm text-teal-600 font-medium">{label}</p>}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-100 gap-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">W</span>
        </div>
        <span className="text-xl font-bold text-teal-900">Work2Credit</span>
      </div>
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  )
}
