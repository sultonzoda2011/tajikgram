export const metadata = {
  title: 'TajikChat – Чат и социальная платформа для Таджикистана',
  description:
    'TajikChat – общайтесь в реальном времени: групповые и приватные чаты, друзья, обмен файлами и многое другое.',
  keywords:
    'TajikChat, чат Таджикистан, социальная платформа, обмен сообщениями, друзья, групповой чат, приватный чат, файлы',
  authors: [{ name: 'TajikChat Team', url: 'https://yourwebsite.com' }],
  creator: 'TajikChat Team',
  publisher: 'TajikChat',
  themeColor: 'var(--color-primary)', // Используем цвет из Tailwind CSS-переменных
  colorScheme: 'light dark', // Поддержка светлой и тёмной темы
  openGraph: {
    title: 'TajikChat – Чат и социальная платформа',
    description:
      'Общайтесь с друзьями и заводите новые знакомства в TajikChat – чаты, файлы, друзья и многое другое!',
    url: 'https://yourwebsite.com',
    siteName: 'TajikChat',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TajikChat Logo',
      },
    ],
    locale: 'tg_TJ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TajikChat – Чат и социальная платформа',
    description: 'Общайтесь с друзьями и заводите новые знакомства в TajikChat!',
    images: ['https://yourwebsite.com/og-image.png'],
    creator: '@TajikChat',
  },
}

import Providers from '@/providers/providers'
import '../styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
