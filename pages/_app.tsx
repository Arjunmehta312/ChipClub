import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { validateEnv } from '@/utils/env'
import { NextUIProvider } from '@nextui-org/react'
import { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import '../styles/globals.css'

if (process.env.NODE_ENV === 'production') {
  validateEnv()
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    // Clear any stored referral codes on app load
    localStorage.removeItem('referralCode')
  }, [])

  return (
    <SessionProvider session={session}>
      <NextThemesProvider defaultTheme="light" attribute="class">
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  )
}
