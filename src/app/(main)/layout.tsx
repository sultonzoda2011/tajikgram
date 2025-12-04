import { Metadata } from 'next'
import Providers from '@/providers/providers'
import '../../styles/globals.css'
import Sidebar from '@/ui/layout/sidebar/sidebar'

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
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="antialiased flex">
        <Providers>
          <Sidebar />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
