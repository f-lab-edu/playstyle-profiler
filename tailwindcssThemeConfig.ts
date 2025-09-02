import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 다크 테마 베이스
        'dark-bg': '#0a0d12',
        'dark-surface': '#121722',
        'dark-elevated': '#1a202c',
        
        // 카드 및 컴포넌트
        'card-bg': '#121722',
        'card-hover': '#1a202c',
        
        // 보더
        'border-color': '#242a36',
        'border-light': '#2a3140',
        'border-accent': '#3d4a5c',
        
        // 텍스트
        'text-primary': '#eaeaea',
        'text-secondary': '#a0a0a0',
        'text-muted': '#6b7280',
        
        // 게임 테마 색상
        'game-primary': '#4f46e5',
        'game-secondary': '#06b6d4',
        'game-accent': '#f59e0b',
        'game-success': '#10b981',
        'game-warning': '#f59e0b',
        'game-error': '#ef4444',
        
        // MBTI 유형별 색상 (16가지)
        'mbti-analyst': '#8b5cf6',      // 보라 (NT)
        'mbti-diplomat': '#06b6d4',     // 청록 (NF)
        'mbti-sentinel': '#10b981',     // 초록 (SJ)
        'mbti-explorer': '#f59e0b',     // 주황 (SP)
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(79, 70, 229, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)' },
        },
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      boxShadow: {
        'game-card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'game-card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-secondary': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
