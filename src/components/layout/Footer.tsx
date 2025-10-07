import Link from 'next/link'

/**
 * Footer 컴포넌트 (서버 컴포넌트)
 * 저작권 정보 및 추가 링크를 포함합니다.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* 로고 */}
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-xl">🎮</span>
            <span>Playstyle Profiler</span>
          </div>

          {/* 설명 */}
          <p className="text-sm text-muted-foreground max-w-md">
            게임 플레이스타일을 MBTI로 분석하여 
            당신만의 게임 성향을 발견해보세요.
          </p>

          {/* 링크 */}
          <div className="flex gap-6 text-sm">
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              테스트하기
            </Link>
            <Link 
              href="/about" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              소개
            </Link>
          </div>

          {/* 저작권 */}
          <div className="text-xs text-muted-foreground">
            <p>&copy; {currentYear} Playstyle Profiler. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
