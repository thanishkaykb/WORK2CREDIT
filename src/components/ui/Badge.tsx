import React from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'teal' | 'mint' | 'beige' | 'red' | 'yellow' | 'blue' | 'gray' | 'purple'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  teal:   'bg-teal-100 text-teal-700',
  mint:   'bg-mint-100 text-mint-700',
  beige:  'bg-beige-100 text-beige-700',
  red:    'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  blue:   'bg-blue-100 text-blue-700',
  gray:   'bg-gray-100 text-gray-600',
  purple: 'bg-purple-100 text-purple-700',
}

export function Badge({ children, variant = 'teal', size = 'md', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
