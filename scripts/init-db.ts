const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Clean up existing data (only in development)
    if (process.env.NODE_ENV === 'development') {
      await prisma.gamePlayer.deleteMany()
      await prisma.game.deleteMany()
      await prisma.account.deleteMany()
      await prisma.session.deleteMany()
      await prisma.user.deleteMany()
    }

    // Create initial admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@chipclub.com',
        name: 'Admin',
        referralCode: 'ADMIN01',
        reputation: 100,
        gamesPlayed: 0,
      },
    })

    console.log('Database initialized successfully')
    console.log('Admin user created:', adminUser)

  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main() 