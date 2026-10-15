import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LoadingSpinner } from '../ui/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  requireWorker?: boolean
}

export function ProtectedRoute({ children, requireAdmin, requireWorker }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isInitialized, isAdmin, isWorker } = useAuth()
  const location = useLocation()

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (requireWorker && !isWorker) {
    return <Navigate to="/dashboard/customer" replace />
  }

  return <>{children}</>
}
