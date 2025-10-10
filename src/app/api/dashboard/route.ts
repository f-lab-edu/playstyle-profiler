/**
 * 대시보드 통계 API
 * 
 * GET /api/dashboard
 * 대시보드에 표시할 전체 통계를 조회합니다
 */

import { NextResponse } from 'next/server'
import { getDashboardStats } from '@/lib/stats'

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await getDashboardStats()
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

// 캐싱 비활성화 (항상 최신 통계 반환)
export const dynamic = 'force-dynamic'

