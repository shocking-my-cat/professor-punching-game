import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Black_Han_Sans, Noto_Serif_KR } from 'next/font/google'
import './globals.css'

const blackHanSans = Black_Han_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-han',
})

const notoSerifKr = Noto_Serif_KR({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
})

export const metadata: Metadata = {
  title: '가상 교수님 응징 게임',
  description: '스트레스 해소용 B급 클릭 게임 - 교수님을 소환해서 종강하세요!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${blackHanSans.variable} ${notoSerifKr.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
