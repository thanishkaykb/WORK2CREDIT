import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date, fmt = 'dd MMM yyyy'): string {
  return format(new Date(date), fmt)
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'dd MMM yyyy, h:mm a')
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen - 3) + '...'
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function generateBookingRef(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return 'W2C-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export function getScoreLabel(score: number | null): {
  label: string
  color: string
  bgColor: string
  description: string
} {
  if (score === null) return {
    label: 'Not Yet Rated',
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    description: 'Complete more jobs to earn your score',
  }
  if (score >= 800) return {
    label: 'Excellent',
    color: 'text-mint-600',
    bgColor: 'bg-mint-50',
    description: 'Outstanding work history and reliability',
  }
  if (score >= 650) return {
    label: 'Good',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Strong professional track record',
  }
  if (score >= 500) return {
    label: 'Fair',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Growing professional profile',
  }
  if (score >= 300) return {
    label: 'Building',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Early-stage profile, keep completing jobs',
  }
  return {
    label: 'New',
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    description: 'Just getting started',
  }
}

export function getBookingStatusConfig(status: string): {
  label: string
  badgeClass: string
} {
  const configs: Record<string, { label: string; badgeClass: string }> = {
    pending:    { label: 'Pending',     badgeClass: 'badge-yellow' },
    accepted:   { label: 'Accepted',    badgeClass: 'badge-teal' },
    declined:   { label: 'Declined',    badgeClass: 'badge-red' },
    in_progress:{ label: 'In Progress', badgeClass: 'badge-blue' },
    completed:  { label: 'Completed',   badgeClass: 'badge-mint' },
    cancelled:  { label: 'Cancelled',   badgeClass: 'badge-gray' },
    disputed:   { label: 'Disputed',    badgeClass: 'badge-red' },
  }
  return configs[status] || { label: status, badgeClass: 'badge-gray' }
}

export function getTransactionStatusConfig(status: string): {
  label: string
  badgeClass: string
} {
  const configs: Record<string, { label: string; badgeClass: string }> = {
    pending:                { label: 'Pending',               badgeClass: 'badge-yellow' },
    paid:                   { label: 'Paid',                  badgeClass: 'badge-mint' },
    failed:                 { label: 'Failed',                badgeClass: 'badge-red' },
    refunded:               { label: 'Refunded',              badgeClass: 'badge-blue' },
    disputed:               { label: 'Disputed',              badgeClass: 'badge-red' },
    awaiting_confirmation:  { label: 'Awaiting Confirmation', badgeClass: 'badge-yellow' },
  }
  return configs[status] || { label: status, badgeClass: 'badge-gray' }
}

export function calculatePlatformFee(amount: number, feePercent = 10): {
  fee: number
  payout: number
} {
  const fee = Math.round(amount * feePercent / 100)
  return { fee, payout: amount - fee }
}

export const SERVICE_CATEGORIES = [
  { id: 'electrical',    name: 'Electrical Work',   icon: '⚡', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'plumbing',      name: 'Plumbing',           icon: '🔧', color: 'bg-blue-100 text-blue-700' },
  { id: 'mechanical',    name: 'Mechanical Repair',  icon: '⚙️', color: 'bg-gray-100 text-gray-700' },
  { id: 'carpentry',     name: 'Carpentry',          icon: '🪚', color: 'bg-amber-100 text-amber-700' },
  { id: 'cleaning',      name: 'Cleaning',           icon: '🧹', color: 'bg-teal-100 text-teal-700' },
  { id: 'tutoring',      name: 'Tutoring',           icon: '📚', color: 'bg-purple-100 text-purple-700' },
  { id: 'design',        name: 'Design',             icon: '🎨', color: 'bg-pink-100 text-pink-700' },
  { id: 'coding',        name: 'Coding & Tech',      icon: '💻', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'delivery',      name: 'Delivery',           icon: '📦', color: 'bg-orange-100 text-orange-700' },
  { id: 'home',          name: 'Home Maintenance',   icon: '🏠', color: 'bg-mint-100 text-mint-700' },
  { id: 'beauty',        name: 'Beauty & Wellness',  icon: '💆', color: 'bg-rose-100 text-rose-700' },
  { id: 'photography',   name: 'Photography',        icon: '📷', color: 'bg-sky-100 text-sky-700' },
] as const

export type ServiceCategoryId = typeof SERVICE_CATEGORIES[number]['id']
