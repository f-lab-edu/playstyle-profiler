import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 * 
 * clsx: 조건부 클래스명을 처리 (falsy 값 제거, 객체/배열 처리)
 * twMerge: 충돌하는 Tailwind 클래스를 올바르게 병합
 * 
 * 예시:
 * cn('px-4', 'px-6') => 'px-6' (나중 것이 우선)
 * cn('text-red-500', false && 'text-blue-500') => 'text-red-500'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

