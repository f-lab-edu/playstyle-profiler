'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
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
