import { Layout } from "@/components/layout"
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react"
import { useRouter } from "next/router"

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  const errorMessages: { [key: string]: string } = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to access this resource.",
    Verification: "The verification link may have expired or already been used.",
    Default: "An error occurred during authentication.",
  }

  const message = error ? errorMessages[error as string] || errorMessages.Default : errorMessages.Default

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Authentication Error</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <p className="text-red-500">{message}</p>
            <Button color="primary" onClick={() => router.push("/login")}>
              Back to Login
            </Button>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
} 