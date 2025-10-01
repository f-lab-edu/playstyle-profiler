import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '게임 플레이스타일 MBTI 테스트',
  description: '당신의 게임 플레이스타일을 MBTI로 분석해보세요!',
  openGraph: {
    title: '게임 플레이스타일 MBTI 테스트',
    description: '당신의 게임 플레이스타일을 MBTI로 분석해보세요!',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
