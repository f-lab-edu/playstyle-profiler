/**
 * 통계 조회 API
 * 
 * GET /api/stats
 * 전체 MBTI 유형별 통계를 조회합니다
 */

import { NextResponse } from 'next/server'
import { getStats } from '@/lib/stats'

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await getStats()
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

// 캐싱 비활성화 (항상 최신 통계 반환)
export const dynamic = 'force-dynamic'

