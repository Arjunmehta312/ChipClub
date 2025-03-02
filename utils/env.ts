export const validateEnv = () => {
  const requiredEnvs = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'DATABASE_URL',
  ]

  const missingEnvs = requiredEnvs.filter(env => !process.env[env])

  if (missingEnvs.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvs.join(', ')}`)
  }

  // Validate URLs
  try {
    new URL(process.env.NEXTAUTH_URL!)
    new URL(process.env.DATABASE_URL!)
  } catch (error) {
    throw new Error('Invalid URL in environment variables')
  }

  return {
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    stripeKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    redisUrl: process.env.REDIS_URL,
  }
}
