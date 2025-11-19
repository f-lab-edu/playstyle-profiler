'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, Clock, Trophy } from 'lucide-react'
import Link from 'next/link'
import { RefreshButton } from './RefreshButton'
import { PLAYSTYLE_PROFILES } from '@/data/profiles'
import type { IDashboardStats } from '@/lib/stats'

interface IDashboardClientProps {
  stats: IDashboardStats
}

export function DashboardClient({ stats }: IDashboardClientProps) {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}분 ${secs}초`
  }

  // MBTI 유형별 정렬 (많은 순)
  const sortedMBTI = Object.entries(stats.mbtiCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 16)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold">📊 대시보드</h1>
          <p className="text-lg text-muted-foreground">
            플레이스타일 분석 전체 통계
          </p>
          {/* Client Component로 분리된 새로고침 버튼 */}
          <RefreshButton />
        </motion.div>

        {/* 요약 통계 카드 (상단) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  전체 참여자
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {stats.totalSubmissions.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">명</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  평균 소요 시간
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {formatTime(stats.avgCompletionTime)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  최근 100명 기준
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  가장 많은 유형
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {stats.topMBTI || '-'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.topMBTI && stats.percentages[stats.topMBTI]
                    ? `${stats.percentages[stats.topMBTI]}%`
                    : '데이터 없음'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* MBTI 분포 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                MBTI 유형별 분포
              </CardTitle>
              <CardDescription>
                전체 {stats.totalSubmissions}명의 참여자 분포
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedMBTI.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  아직 데이터가 없습니다
                </p>
              ) : (
                <div className="space-y-3">
                  {sortedMBTI.map(([mbtiType, count], index) => {
                    const percentage = stats.percentages[mbtiType] || 0
                    const profile = PLAYSTYLE_PROFILES[mbtiType as keyof typeof PLAYSTYLE_PROFILES]
                    
                    return (
                      <motion.div
                        key={mbtiType}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              {mbtiType}
                            </Badge>
                            <span className="text-sm">
                              {profile?.title || '알 수 없음'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {count}명
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 테스트 시작 버튼 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pb-8"
        >
          <Button size="lg" asChild>
            <Link href="/quiz">테스트 시작하기</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

