export const metadata: Metadata = {
  title: 'ChatGram',
  description: 'Современная социальная платформа с чатами и друзьями',
  keywords: ['chat', 'social', 'friends', 'messenger', 'общение'],
  authors: [{ name: 'ChatGram Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  openGraph: {
    title: 'ChatGram',
    description: 'Современная социальная платформа с чатами и друзьями',
    url: 'https://chatgram.com',
    siteName: 'ChatGram',
    locale: 'ru_RU',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

import Providers from '@/providers/providers'
import '../../styles/globals.css'
import { Metadata } from 'next'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased flex">
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
