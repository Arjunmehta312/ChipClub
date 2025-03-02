import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

export default function PreLogin() {
  const [referralCode, setReferralCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Show error message from URL if present
    const errorMessage = router.query.error
    if (errorMessage) {
      switch (errorMessage) {
        case 'InvalidSession':
          setError('Session expired. Please try again.')
          break
        case 'NoReferralCode':
          setError('Referral code is required.')
          break
        case 'InvalidReferral':
          setError('Invalid referral code.')
          break
        case 'SignUpFailed':
          setError('Sign up failed. Please try again.')
          break
        default:
          setError('An error occurred. Please try again.')
      }
    }
  }, [router.query.error])

  const handleGoogleSignIn = async () => {
    if (!referralCode) {
      setError('Please enter a referral code')
      return
    }

    // Verify referral code exists
    const response = await fetch('/api/auth/verify-referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referralCode })
    })

    if (!response.ok) {
      setError('Invalid referral code')
      return
    }

    // Store referral code in cookie
    Cookies.set('referralCode', referralCode, { path: '/' })

    // Proceed with Google sign in
    signIn('google', {
      callbackUrl: '/api/auth/google-callback'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to ChipClub
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your referral code to continue
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="referralCode" className="sr-only">
              Referral Code
            </label>
            <input
              id="referralCode"
              name="referralCode"
              type="text"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <div>
            <button
              onClick={handleGoogleSignIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 