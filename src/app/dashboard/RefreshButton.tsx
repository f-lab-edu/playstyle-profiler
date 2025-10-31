/**
 * 새로고침 버튼 (Client Component)
 * 
 * Server Action을 호출하여 대시보드 데이터를 새로고침합니다.
 * useTransition을 사용하여 로딩 상태를 관리합니다.
 */

'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { refreshDashboardStats } from '@/actions/stats'

export function RefreshButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleRefresh = () => {
    startTransition(async () => {
      // Server Action 호출하여 캐시 무효화
      await refreshDashboardStats()
      // 페이지 새로고침 (Next.js가 최신 데이터로 재렌더링)
      router.refresh()
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isPending}
      className="gap-2"
    >
      <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
      {isPending ? '새로고침 중...' : '새로고침'}
    </Button>
  )
}

