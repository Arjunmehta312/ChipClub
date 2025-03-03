import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Layout } from "../components/layout"
import { Button, Card, CardBody } from "@nextui-org/react"
import { FaGithub } from "react-icons/fa"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleJoinClick = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/signup')
    }
  }

  const handleFindGamesClick = () => {
    if (session) {
      router.push('/games')
    } else {
      router.push('/login')
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to ChipClub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The exclusive community for poker enthusiasts
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              color="primary"
              onPress={handleJoinClick}
            >
              {session ? 'Go to Dashboard' : 'Join with Referral'}
            </Button>
            <Button
              size="lg"
              variant="bordered"
              onPress={handleFindGamesClick}
            >
              {session ? 'Find Games' : 'Sign In'}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardBody>
              <h3 className="text-xl font-semibold mb-2">Exclusive Community</h3>
              <p>Join our invite-only network of verified players</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="text-xl font-semibold mb-2">Host Games</h3>
              <p>Create and manage your own poker games</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <h3 className="text-xl font-semibold mb-2">Build Reputation</h3>
              <p>Earn reputation points and track your progress</p>
            </CardBody>
          </Card>
        </div>

        <div className="fixed bottom-4 left-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span>Developed by Arjun</span>
            <a
              href="https://github.com/Arjunmehta312"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

