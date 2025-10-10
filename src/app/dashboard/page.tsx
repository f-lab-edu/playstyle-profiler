'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, Users, Clock, TrendingUp, RefreshCw, Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { IDashboardStats } from '@/lib/stats'
import { PLAYSTYLE_PROFILES } from '@/data/profiles'

/**
 * 대시보드 페이지
 * 
 * 전체 통계를 시각화하여 보여주는 페이지입니다.
 * Phase 8: 위젯형 대시보드
 */
export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<IDashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 통계 데이터 가져오기
  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/dashboard')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('통계를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}분 ${secs}초`
  }

  // 상대 시간 표시
  const getRelativeTime = (timestamp: string) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return '방금 전'
    if (diffMins < 60) return `${diffMins}분 전`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}시간 전`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}일 전`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">통계를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>오류 발생</CardTitle>
            <CardDescription>{error || '데이터를 불러올 수 없습니다.'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={fetchStats} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            새로고침
          </Button>
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

        {/* 최근 활동 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                최근 활동
              </CardTitle>
              <CardDescription>
                실시간으로 완료된 테스트 결과
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentResults.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  최근 활동이 없습니다
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.recentResults.map((result, index) => {
                    const profile = PLAYSTYLE_PROFILES[result.mbtiType as keyof typeof PLAYSTYLE_PROFILES]
                    
                    return (
                      <motion.div
                        key={`${result.mbtiType}-${result.timestamp}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge>{result.mbtiType}</Badge>
                          <div>
                            <p className="text-sm font-medium">
                              {profile?.title || '알 수 없음'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {result.completionTime 
                                ? formatTime(result.completionTime)
                                : '시간 정보 없음'}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {getRelativeTime(result.timestamp)}
                        </span>
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
          <Button
            size="lg"
            onClick={() => router.push('/quiz')}
            className="gap-2"
          >
            테스트 시작하기
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

