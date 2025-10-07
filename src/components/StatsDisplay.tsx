/**
 * 통계 표시 컴포넌트
 * 
 * 전체 MBTI 유형별 통계를 시각적으로 표시합니다
 */

'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { IStats } from '@/lib/stats'
import type { MBTIType } from '@/types'

export function StatsDisplay() {
  const [stats, setStats] = useState<IStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/stats')
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>통계 로딩 중...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>통계를 불러올 수 없습니다</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!stats || stats.totalSubmissions === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>아직 통계가 없습니다</CardTitle>
          <CardDescription>첫 번째 참여자가 되어주세요!</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // MBTI 유형을 카운트 순으로 정렬
  const sortedTypes = Object.entries(stats.mbtiCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([type]) => type as MBTIType)

  return (
    <Card>
      <CardHeader>
        <CardTitle>전체 통계</CardTitle>
        <CardDescription>
          총 <strong>{stats.totalSubmissions.toLocaleString()}</strong>명이 참여했습니다
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedTypes.map((type) => {
          const count = stats.mbtiCounts[type] || 0
          const percentage = stats.percentages[type] || 0

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{type}</span>
                <span className="text-muted-foreground">
                  {count.toLocaleString()}명 ({percentage}%)
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

