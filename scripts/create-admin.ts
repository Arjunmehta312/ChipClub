import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('admin123', 12)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@chipclub.com',
      password: hashedPassword,
      name: 'Admin',
      referralCode: 'ADMIN123', // This will be your first referral code
    },
  })

  console.log('Admin user created:', admin)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 