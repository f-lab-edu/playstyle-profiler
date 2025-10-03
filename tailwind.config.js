/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class'로 설정하면 dark: 접두사로 다크모드 스타일 적용 가능
  darkMode: ['class'],
  
  // Tailwind가 스캔할 파일들 - 여기 있는 파일에서 사용된 클래스만 최종 CSS에 포함됨
  content: [
    './src/pages/**/*.{ts,tsx}',     // pages 디렉토리
    './src/components/**/*.{ts,tsx}', // components 디렉토리
    './src/app/**/*.{ts,tsx}',        // app 디렉토리 (Next.js 13+ App Router)
    './src/**/*.{ts,tsx}',            // src 하위 모든 파일
  ],
  
  prefix: '', // 클래스 접두사 (예: 'tw-' 설정 시 'tw-bg-blue-500')
  
  theme: {
    container: {
      center: true,  // 컨테이너 자동 중앙 정렬
      padding: '2rem', // 컨테이너 패딩
      screens: {
        '2xl': '1400px', // 최대 너비 설정
      },
    },
    extend: {
      // 여기서 커스텀 색상, 폰트, 애니메이션 등을 추가할 수 있어요
      colors: {
        // Shadcn UI가 사용하는 CSS 변수 기반 색상 시스템
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  
  // Tailwind 플러그인들
  plugins: [require('tailwindcss-animate')],
}

