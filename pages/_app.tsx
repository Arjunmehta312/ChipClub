import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { useTheme } from 'next-themes'
import '../styles/globals.css'

const theme = {
  colors: {
    background: '#ffffff',
    foreground: '#11181C',
    primary: {
      foreground: '#ffffff',
      DEFAULT: '#006FEE',
    },
  },
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}
