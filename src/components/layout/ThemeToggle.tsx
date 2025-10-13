'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
ThemeToggle
/**
 * ThemeToggle 컴포넌트 (클라이언트 컴포넌트)
 * 다크모드와 라이트모드를 전환하는 버튼입니다.
 * 
 * next-themes를 사용하여 테마를 관리합니다.
 * mounted 상태를 체크하여 하이드레이션 미스매치를 방지합니다.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 컴포넌트가 마운트된 후에만 렌더링 (하이드레이션 미스매치 방지)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // 서버 사이드 렌더링 시 플레이스홀더 반환
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <span className="sr-only">테마 로딩중...</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
      aria-label="테마 전환"
    >
      {theme === 'dark' ? (
  <Image 
    src="/images/sun-moon.svg" 
    alt="다크모드"
    width={40}
    height={20}
  />
) : (
  <Image 
    src="/images/icons8-태양.svg" 
    alt="라이트모드"
    width={40}
    height={20}
  />
)}
    </Button>
  )
}
