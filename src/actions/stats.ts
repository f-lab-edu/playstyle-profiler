/**
 * 통계 관련 Server Actions
 * 
 * Server Actions는 서버에서만 실행되는 함수로,
 * 클라이언트에서 직접 호출할 수 있습니다.
 */

'use server'

import { revalidatePath } from 'next/cache'
import { getDashboardStats } from '@/lib/stats'
import type { IDashboardStats } from '@/lib/stats'

/**
 * 대시보드 통계 조회
 * 
 * 이 함수는 서버에서만 실행되며,
 * 클라이언트에서 직접 호출할 수 있습니다.
 * 
 * @returns 대시보드 통계 데이터
 */
export async function fetchDashboardStats(): Promise<IDashboardStats> {
  try {
    const stats = await getDashboardStats()
    return stats
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('통계를 불러오는데 실패했습니다.')
  }
}

/**
 * 대시보드 페이지 재검증
 * 
 * Next.js 캐시를 무효화하고 최신 데이터를 가져옵니다.
 * 새로고침 버튼에서 사용됩니다.
 * 
 * @returns 최신 통계 데이터
 */
export async function refreshDashboardStats(): Promise<IDashboardStats> {
  // Next.js 캐시 무효화
  revalidatePath('/dashboard')
  
  // 최신 데이터 가져오기
  return await fetchDashboardStats()
}

