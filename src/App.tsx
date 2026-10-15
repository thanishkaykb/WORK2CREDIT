import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Public Pages
import { LandingPage } from './pages/LandingPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { JobBoardPage } from './pages/JobBoardPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { WorkerProfilePage } from './pages/WorkerProfilePage'
import { ScoreDashboard } from './pages/ScoreDashboard'
import { NotFoundPage } from './pages/NotFoundPage'

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage, ResetPasswordPage } from './pages/auth/ForgotPasswordPage'

// Shared Protected Pages
import { NotificationsPage } from './pages/NotificationsPage'
import { MessagesPage } from './pages/MessagesPage'
import { VerificationPage } from './pages/VerificationPage'
import { DisputesPage } from './pages/DisputesPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { BookingCreatePage } from './pages/booking/BookingCreatePage'

// Worker Pages
import { WorkerDashboard } from './pages/dashboard/WorkerDashboard'
import { WorkerBookingsPage } from './pages/dashboard/WorkerBookingsPage'
import { WorkerServicesPage } from './pages/dashboard/WorkerServicesPage'
import { WorkerEarningsPage } from './pages/dashboard/WorkerEarningsPage'

// Customer Pages
import { CustomerDashboard } from './pages/dashboard/CustomerDashboard'
import { CustomerBookingsPage } from './pages/dashboard/CustomerBookingsPage'
import { CustomerJobsPage } from './pages/dashboard/CustomerJobsPage'

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard'

function DashboardRedirect() {
  const { profile, isAdmin, isWorker } = useAuth()
  if (isAdmin) return <Navigate to="/admin" replace />
  if (isWorker) return <Navigate to="/dashboard/worker" replace />
  return <Navigate to="/dashboard/customer" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#134e4a',
              color: '#ffffff',
              fontSize: '13px',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/jobs" element={<JobBoardPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/profile/:id" element={<WorkerProfilePage />} />
          <Route path="/score" element={<ScoreDashboard />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Booking Flows */}
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookingCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:workerId"
            element={
              <ProtectedRoute>
                <BookingCreatePage />
              </ProtectedRoute>
            }
          />

          {/* Generic Dashboard Redirect */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* Common Account & Communication Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verification"
            element={
              <ProtectedRoute>
                <VerificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/disputes"
            element={
              <ProtectedRoute>
                <DisputesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Worker Dashboard Routes */}
          <Route
            path="/dashboard/worker"
            element={
              <ProtectedRoute requireWorker>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/bookings"
            element={
              <ProtectedRoute requireWorker>
                <WorkerBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/services"
            element={
              <ProtectedRoute requireWorker>
                <WorkerServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/earnings"
            element={
              <ProtectedRoute requireWorker>
                <WorkerEarningsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/transactions"
            element={
              <ProtectedRoute requireWorker>
                <WorkerEarningsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/reviews"
            element={
              <ProtectedRoute requireWorker>
                <WorkerProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/availability"
            element={
              <ProtectedRoute requireWorker>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/worker/portfolio"
            element={
              <ProtectedRoute requireWorker>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Customer Dashboard Routes */}
          <Route
            path="/dashboard/customer"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/customer/bookings"
            element={
              <ProtectedRoute>
                <CustomerBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/customer/jobs"
            element={
              <ProtectedRoute>
                <CustomerJobsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/customer/saved"
            element={
              <ProtectedRoute>
                <MarketplacePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/customer/transactions"
            element={
              <ProtectedRoute>
                <CustomerBookingsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Oversight Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
