import React, { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { Input, Textarea, Select } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/index'
import { formatCurrency, generateBookingRef } from '../../lib/utils'
import { useAuth } from '../../contexts/AuthContext'
import { Calendar, MapPin, CreditCard, CheckCircle, Info } from 'lucide-react'
import toast from 'react-hot-toast'

const DEMO_WORKER = {
  id: '1', name: 'Rajesh Kumar', category: 'electrical',
  skills: [
    { id: 's1', title: 'Electrical Wiring',    hourly_rate: 500, pricing_model: 'hourly' },
    { id: 's2', title: 'Fan & AC Installation', price: 350, pricing_model: 'fixed' },
    { id: 's3', title: 'Electrical Repair',     hourly_rate: 400, pricing_model: 'hourly' },
  ],
}

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM',  '3:00 PM',  '4:00 PM',  '5:00 PM',
]

const PAYMENT_METHODS = [
  { value: 'upi',       label: '📱 UPI (Razorpay)' },
  { value: 'card',      label: '💳 Debit/Credit Card (Stripe)' },
  { value: 'cash',      label: '💵 Cash (recorded on platform)' },
]

type Step = 1 | 2 | 3 | 4

export function BookingCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, profile } = useAuth()
  const workerId = searchParams.get('worker') || DEMO_WORKER.id

  const [step, setStep] = useState<Step>(1)
  const [selectedSkill, setSelectedSkill] = useState(DEMO_WORKER.skills[0])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [estimatedHours, setEstimatedHours] = useState(1)
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="card p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-teal-900 mb-3">Sign in to book a service</h2>
            <p className="text-teal-500 text-sm mb-6">You need an account to make a booking.</p>
            <div className="flex gap-3 justify-center">
              <Link to="/login" className="btn-secondary">Sign In</Link>
              <Link to="/register" className="btn-primary">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const agreedPrice = selectedSkill.pricing_model === 'fixed'
    ? (selectedSkill as any).price
    : (selectedSkill as any).hourly_rate * estimatedHours

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const ref = generateBookingRef()
    setBookingRef(ref)

    // In production:
    // 1. Create booking record in Supabase bookings table
    // 2. Check for conflicting slots (availability_slots)
    // 3. Create transaction record
    // 4. If online payment: create Razorpay/Stripe order
    // 5. Send notification to worker via notifications table
    // 6. Send email (if configured)

    await new Promise(r => setTimeout(r, 1500)) // simulate API call
    setStep(4)
    setIsSubmitting(false)
    toast.success('Booking created! Worker has been notified.')
  }

  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Schedule' },
    { num: 3, label: 'Payment' },
    { num: 4, label: 'Confirm' },
  ]

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Navbar />
      <div className="max-w-2xl mx-auto w-full px-4 py-8 flex-1">

        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s.num ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-400'
                }`}>
                  {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-xs text-teal-500 mt-1">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s.num ? 'bg-teal-500' : 'bg-teal-100'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="card p-6">
          {/* Step 1: Service selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-2">Choose a Service</h2>
              <p className="text-teal-500 text-sm mb-6">Booking with: <strong>{DEMO_WORKER.name}</strong></p>

              <div className="space-y-3 mb-6">
                {DEMO_WORKER.skills.map(skill => (
                  <label key={skill.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSkill.id === skill.id ? 'border-teal-500 bg-teal-50' : 'border-teal-100 hover:border-teal-200'
                  }`} id={`skill-option-${skill.id}`}>
                    <input
                      type="radio"
                      name="skill"
                      className="sr-only"
                      checked={selectedSkill.id === skill.id}
                      onChange={() => setSelectedSkill(skill)}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-teal-900">{skill.title}</p>
                      <p className="text-xs text-teal-500 capitalize">{skill.pricing_model} pricing</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-teal-700">
                        {skill.pricing_model === 'fixed'
                          ? formatCurrency((skill as any).price)
                          : formatCurrency((skill as any).hourly_rate) + '/hr'
                        }
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {selectedSkill.pricing_model === 'hourly' && (
                <div className="mb-6">
                  <label className="label">Estimated Hours</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setEstimatedHours(Math.max(1, estimatedHours - 0.5))} className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 hover:bg-teal-100 transition-colors font-bold">−</button>
                    <span className="text-xl font-bold text-teal-900 w-12 text-center">{estimatedHours}</span>
                    <button onClick={() => setEstimatedHours(estimatedHours + 0.5)} className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 hover:bg-teal-100 transition-colors font-bold">+</button>
                    <span className="text-teal-500 text-sm">hours</span>
                  </div>
                </div>
              )}

              <div className="bg-teal-50 rounded-xl p-4 mb-6 flex items-center justify-between">
                <span className="text-teal-700 font-medium">Estimated Total</span>
                <span className="text-2xl font-extrabold text-teal-900">{formatCurrency(agreedPrice)}</span>
              </div>

              <Button variant="primary" className="w-full" size="lg" onClick={() => setStep(2)} id="step1-next">
                Continue to Schedule
              </Button>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-6">Choose Date & Time</h2>

              <Input
                label="Preferred Date"
                type="date"
                required
                leftIcon={<Calendar className="w-4 h-4" />}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                wrapperClassName="mb-4"
                id="booking-date"
              />

              <div className="mb-4">
                <label className="label">Preferred Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-2 text-xs font-medium rounded-xl border transition-all ${
                        selectedTime === slot
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-teal-100 hover:border-teal-300 text-teal-600'
                      }`}
                      id={`time-${slot.replace(' ', '-')}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="Job Address"
                placeholder="Full address where the work needs to be done..."
                required
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                wrapperClassName="mb-4"
                id="booking-address"
              />

              <Textarea
                label="Describe Your Requirements"
                placeholder="Explain what needs to be done in detail..."
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                wrapperClassName="mb-6"
                id="booking-description"
              />

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)} className="flex-1" id="step2-back">Back</Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime || !address}
                  id="step2-next"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-6">Payment Method</h2>

              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map(pm => (
                  <label key={pm.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === pm.value ? 'border-teal-500 bg-teal-50' : 'border-teal-100 hover:border-teal-200'
                  }`} id={`payment-${pm.value}`}>
                    <input
                      type="radio"
                      name="payment"
                      className="sr-only"
                      checked={paymentMethod === pm.value}
                      onChange={() => setPaymentMethod(pm.value)}
                    />
                    <span className="font-medium text-teal-800">{pm.label}</span>
                  </label>
                ))}
              </div>

              {(paymentMethod === 'upi' || paymentMethod === 'card') && (
                <Alert type="info" className="mb-4">
                  <strong>Demo Mode:</strong> Payment gateway integration requires Razorpay/Stripe API keys. Configure them in .env to enable real payments. In production, you will be redirected to the secure payment checkout.
                </Alert>
              )}

              {paymentMethod === 'cash' && (
                <Alert type="warning" className="mb-4">
                  Cash payments require confirmation from both you and the worker after the job is completed. Unconfirmed cash payments are not counted as verified income.
                </Alert>
              )}

              {/* Order summary */}
              <div className="bg-beige-50 rounded-xl p-5 mb-6 space-y-2">
                <h3 className="font-semibold text-teal-900 mb-3">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-teal-600">{selectedSkill.title}</span>
                  <span className="font-medium text-teal-800">{formatCurrency(agreedPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-teal-600">Platform fee (10%)</span>
                  <span className="font-medium text-teal-800">{formatCurrency(Math.round(agreedPrice * 0.1))}</span>
                </div>
                <div className="border-t border-beige-200 pt-2 flex justify-between font-bold">
                  <span className="text-teal-900">Total</span>
                  <span className="text-teal-900">{formatCurrency(agreedPrice + Math.round(agreedPrice * 0.1))}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(2)} className="flex-1" id="step3-back">Back</Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  isLoading={isSubmitting}
                  onClick={handleSubmit}
                  id="step3-confirm"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-mint-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-9 h-9 text-mint-500" />
              </div>
              <h2 className="text-xl font-bold text-teal-900 mb-2">Booking Confirmed!</h2>
              <p className="text-teal-500 text-sm mb-2">Your booking reference:</p>
              <code className="text-lg font-bold text-teal-700 bg-teal-50 px-4 py-2 rounded-xl block mb-6">{bookingRef}</code>

              <div className="text-left bg-teal-50 rounded-xl p-5 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-teal-600">Worker</span>
                  <span className="font-medium text-teal-900">{DEMO_WORKER.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-600">Service</span>
                  <span className="font-medium text-teal-900">{selectedSkill.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-600">Date & Time</span>
                  <span className="font-medium text-teal-900">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-600">Amount</span>
                  <span className="font-bold text-teal-900">{formatCurrency(agreedPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-600">Payment</span>
                  <span className="font-medium text-teal-900 capitalize">{paymentMethod}</span>
                </div>
              </div>

              <Alert type="info" className="text-left mb-6">
                The worker will accept or decline within 24 hours. You'll receive a notification when they respond.
              </Alert>

              <div className="flex gap-3">
                <Link to="/dashboard/customer/bookings" className="btn-secondary flex-1 justify-center" id="booking-view-bookings">View My Bookings</Link>
                <Link to="/marketplace" className="btn-primary flex-1 justify-center" id="booking-find-more">Find More Services</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
