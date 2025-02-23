import { Layout } from "../components/layout"
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      setError("An error occurred")
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Login to ChipClub</h1>
            <p className="text-sm text-gray-400">Welcome back to the community</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" color="primary">
                Login
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
                onClick={() => signIn("google")}
              >
                Sign in with Google
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
} 