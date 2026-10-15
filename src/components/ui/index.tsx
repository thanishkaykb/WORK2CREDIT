import React from 'react'
import { cn, getInitials } from '../../lib/utils'
export { Badge } from './Badge'
export { Button } from './Button'
export { LoadingSpinner } from './LoadingSpinner'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  ring?: boolean
}

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-xl',
}

export function Avatar({ src, name, size = 'md', className, ring }: AvatarProps) {
  const initials = getInitials(name)

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden',
      'bg-gradient-to-br from-teal-400 to-mint-500 text-white font-semibold',
      sizes[size],
      ring && 'ring-2 ring-teal-300 ring-offset-2',
      className
    )}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

export function StarRating({ rating, maxStars = 5, size = 'md', showValue, className }: StarRatingProps) {
  const starSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            starSizes[size],
            i < Math.floor(rating) ? 'text-amber-400' : 
            i < rating ? 'text-amber-300' : 'text-gray-200'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {showValue && (
        <span className="text-sm font-medium text-teal-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'card p-5',
        hover && 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: { value: number; isPositive: boolean }
  className?: string
  valueClassName?: string
}

export function StatCard({ label, value, icon, trend, className, valueClassName }: StatCardProps) {
  return (
    <Card className={cn('stat-card', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-teal-500 uppercase tracking-wide mb-1">{label}</p>
          <p className={cn('text-2xl font-bold text-teal-900', valueClassName)}>{value}</p>
          {trend && (
            <p className={cn('text-xs font-medium mt-1', trend.isPositive ? 'text-mint-600' : 'text-red-500')}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% this month
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-teal-800 mb-2">{title}</h3>
      {description && <p className="text-sm text-teal-500 max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  )
}

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  className?: string
}

const alertStyles = {
  info:    'bg-teal-50 border-teal-200 text-teal-800',
  success: 'bg-mint-50 border-mint-200 text-mint-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error:   'bg-red-50 border-red-200 text-red-800',
}

export function Alert({ type = 'info', title, children, className }: AlertProps) {
  return (
    <div className={cn('rounded-xl border p-4', alertStyles[type], className)}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      <div className="text-sm">{children}</div>
    </div>
  )
}
