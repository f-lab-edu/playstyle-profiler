'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

/**
 * ThemeProvider 컴포넌트 (클라이언트 컴포넌트)
 * next-themes의 ThemeProvider를 래핑합니다.
 * 
 * 이 컴포넌트는 전체 앱에 테마 기능을 제공하며,
 * 루트 레이아웃에서 사용됩니다.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
