/**
 * 대시보드 페이지 (Server Component)
 * 
 * Server Component로 구현하여 초기 로딩 시 서버에서 데이터를 가져옵니다.
 * API 엔드포인트 없이 직접 데이터베이스에 접근합니다.
 * 
 * 데이터 로직은 서버에서, 애니메이션은 클라이언트에서 처리하는 패턴입니다.
 * 
 * Phase 8: 위젯형 대시보드
 */

import { fetchDashboardStats } from '@/actions/stats'
import { DashboardClient } from './DashboardClient'

// 동적 렌더링 강제 (빌드 타임 정적 생성 비활성화)
// Upstash Redis 연결은 빌드 타임에 불가능하므로 런타임에만 렌더링
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // 서버에서 직접 데이터 조회 (API 불필요!)
  const stats = await fetchDashboardStats()

  // Client Component에 데이터 전달
  return <DashboardClient stats={stats} />
}
