import { Layout } from "../components/layout"
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaGoogle } from "react-icons/fa"
import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check for referral code in URL
    const urlReferralCode = router.query.ref as string
    if (urlReferralCode) {
      setReferralCode(urlReferralCode)
    }
  }, [router.query])

  useEffect(() => {
    // Check for error in URL
    const urlError = router.query.error as string
    if (urlError === 'NoReferralCode') {
      setError('Please enter a referral code')
    } else if (urlError === 'InvalidReferralCode') {
      setError('Invalid referral code')
    } else if (urlError === 'SignUpFailed') {
      setError('Failed to create account. Please try again.')
    }
  }, [router.query])

  useEffect(() => {
    // Clean up stored referral code when component unmounts
    return () => {
      localStorage.removeItem('referralCode')
    }
  }, [])

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, referralCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      // Sign in after successful signup
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    }
  }

  const handleGoogleSignUp = async () => {
    if (!referralCode) {
      setError("Please enter a referral code")
      return
    }

    try {
      // Pass referral code directly in state parameter
      await signIn("google", { 
        callbackUrl: "/dashboard",
        state: `referral:${referralCode}`
      })
    } catch (error) {
      console.error("Google sign-in error:", error)
      setError("Failed to sign in with Google")
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Sign Up for ChipClub</h1>
            <p className="text-sm text-gray-400">Join the exclusive poker community</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleEmailSignUp} className="flex flex-col gap-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Input
                label="Referral Code"
                placeholder="Enter your referral code"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                required
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" color="primary">
                Sign Up with Email
              </Button>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Or</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <Button
                startContent={<FaGoogle />}
                color="secondary"
                variant="flat"
                onClick={handleGoogleSignUp}
              >
                Sign up with Google
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

