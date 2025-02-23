import { Layout } from "../components/layout"
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaGoogle } from "react-icons/fa"

export default function SignUp() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Sign Up for ChipClub</h1>
            <p className="text-sm text-gray-400">Join the exclusive poker community</p>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-4">
              <Input label="Referral Code" placeholder="Enter your referral code" type="text" />
              <Input label="Email" placeholder="Enter your email" type="email" />
              <Input label="Password" placeholder="Create a password" type="password" />
              <Button color="primary">Sign Up</Button>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Or</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <Button startContent={<FaGoogle />} color="secondary" variant="flat">
                Sign up with Google
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

