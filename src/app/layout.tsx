import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header, Footer, ThemeProvider } from '@/components/layout'

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
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Kakao JavaScript SDK */}
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h+f9W8mR4aOCx1MRJ+Dn9Qg3EQ0HkLLJHJRAc8r7r/LsV0pq5hx6YJlx+"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
