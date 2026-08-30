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
  title: '개강버ㅋ킹웹사이트 — 가상 교수님 응징 게임',
  description:
    '교수님 이름과 외모를 입력하면 가상 소환! HP를 0으로 만들면 하을 학기가 종강됩니다. 대학생 스트레스 해소용 B급 클릭 게임.',
  openGraph: {
    title: '가상 교수님 응징 게임 👊',
    description: '교수님을 소환해서 종강하세요! 클릭하는 만큼 HP가 떨어집니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '가상 교수님 응징 게임 👊',
    description: '교수님을 소환해서 종강하세요!',
  },
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
  colorScheme: 'dark',
  themeColor: '#1e0a08',
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
