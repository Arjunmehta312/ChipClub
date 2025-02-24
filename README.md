# ChipClub - Exclusive Poker Community Platform

## 🎮 Overview
ChipClub is an invite-only platform for organizing and managing private poker games. Built with Next.js, TypeScript, and PostgreSQL, it provides a secure environment for verified poker enthusiasts to host and join games.

## 🌟 Key Features

### Authentication & Security
- Invite-only membership system with referral codes
- Email/password and Google OAuth authentication
- JWT-based session management
- Protected routes for authenticated users

### Game Management
- Host new poker games with customizable settings
- Browse and join existing games
- Real-time game room chat
- Player ratings and reputation system
- Secure payment processing for buy-ins

### User Experience
- Responsive design using NextUI components
- Real-time updates using WebSocket
- Filtering and search capabilities for games
- User profiles with game history and ratings

## 🛠 Tech Stack

### Frontend
- Next.js 15.1.7
- React 19
- TypeScript
- NextUI Components
- TailwindCSS
- Framer Motion

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth.js
- WebSocket (ws)

### Security & Payments
- JWT Authentication
- Stripe Integration
- bcrypt for password hashing

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chipclub.git
cd chipclub
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables (.env):
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/chipclub"
NEXTAUTH_SECRET="your-nextauth-secret"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```
4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```
5. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure
```
chipclub/
├── components/    # Reusable UI components
├── pages/         # Next.js pages and API routes
│   ├── api/       # Backend API endpoints
│   ├── auth/      # Authentication pages
│   ├── game-room/ # Game room features
│   └── ...        
├── lib/           # Utility functions and configurations
├── prisma/        # Database schema and migrations
└── styles/        # Global styles and Tailwind config
```

## 🔒 Security Features

- Invite-only registration system
- Secure session management
- Protected API routes
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- Secure WebSocket connections

## 💳 Payment Integration

- Secure buy-in processing through Stripe
- Transaction history tracking
- Automated refund system for cancelled games
- Payment dispute handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request