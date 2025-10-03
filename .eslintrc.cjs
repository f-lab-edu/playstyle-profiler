/**
 * ESLint 설정 파일
 * 
 * 왜 .cjs 확장자를 사용하나요?
 * - CommonJS 형식 명시적 지정
 * - Next.js와 호환성 보장
 * - import 대신 require 사용
 */

module.exports = {
  // 상위 디렉토리의 ESLint 설정 무시
  root: true,
  
  // TypeScript 파서 사용
  parser: '@typescript-eslint/parser',
  
  // 파서 옵션
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  // Next.js 환경 설정
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  
  // 확장할 설정들
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals', // Next.js 기본 규칙
  ],
  
  // 플러그인
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  
  // 커스텀 규칙
  rules: {
    // TypeScript 규칙
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    
    // React 규칙
    'react/react-in-jsx-scope': 'off', // Next.js에서는 불필요
    'react/prop-types': 'off', // TypeScript 사용 시 불필요
    'react/display-name': 'off', // forwardRef 사용 시 경고 제거
    
    // 일반 규칙
    'prefer-const': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    
    // 한국어 주석 허용
    'spaced-comment': ['error', 'always', { 
      markers: ['*', '!', '/']
    }],
  },
  
  // React 버전 자동 감지
  settings: {
    react: {
      version: 'detect',
    },
  },
  
  // 무시할 파일/폴더
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    'build/',
    '*.config.js',
    '*.config.mjs',
  ],
}

