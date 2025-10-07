import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

/**
 * Header 컴포넌트 (서버 컴포넌트)
 * 로고와 다크모드 토글 버튼을 포함합니다.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* 로고 영역 */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl transition-colors hover:text-primary"
        >
          <span className="text-2xl">🎮</span>
          <span className="hidden sm:inline">Playstyle Profiler</span>
          <span className="sm:hidden">PSP</span>
        </Link>

        {/* 우측 액션 영역 */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
