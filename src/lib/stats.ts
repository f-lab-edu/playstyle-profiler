/**
 * Vercel KV를 사용한 통계 관리
 * 
 * 간단하고 빠른 Redis 기반 통계 저장소
 */

import { kv } from '@vercel/kv'
import type { MBTIType, IQuizResult } from '@/types'

/**
 * 퀴즈 결과를 제출하고 통계를 업데이트
 * 
 * @param result - 퀴즈 결과
 * @returns 현재 총 제출 수
 */
export async function submitResult(result: IQuizResult): Promise<number> {
  // MBTI 유형별 카운트 증가
  await kv.hincrby('mbti-counts', result.mbtiType, 1)
  
  // 총 제출 수 증가
  const totalSubmissions = await kv.incr('total-submissions')
  
  // 최근 결과 기록 (최대 100개 유지)
  await kv.lpush('recent-results', JSON.stringify({
    mbtiType: result.mbtiType,
    timestamp: new Date().toISOString(),
    scores: result.scores,
    completionTime: result.completionTime // 평균 계산용
  }))
  await kv.ltrim('recent-results', 0, 99) // 최신 100개만 유지
  
  // 완료 시간 통계 (평균 계산용, 최근 100개)
  await kv.lpush('completion-times', result.completionTime)
  await kv.ltrim('completion-times', 0, 99)
  
  return totalSubmissions
}

/**
 * 전체 통계 조회
 * 
 * @returns MBTI 유형별 카운트, 총 제출 수, 비율
 */
export async function getStats(): Promise<IStats> {
  const [mbtiCountsRaw, totalSubmissions] = await Promise.all([
    kv.hgetall('mbti-counts'),
    kv.get('total-submissions')
  ])
  
  const mbtiCounts = (mbtiCountsRaw as Record<MBTIType, number>) || {}
  const total = (totalSubmissions as number) || 0
  
  // 각 MBTI 유형의 비율 계산
  const percentages: Record<string, number> = {}
  for (const [type, count] of Object.entries(mbtiCounts)) {
    percentages[type] = total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0
  }
  
  return {
    mbtiCounts,
    totalSubmissions: total,
    percentages
  }
}

/**
 * 특정 MBTI 유형의 통계 조회
 * 
 * @param mbtiType - MBTI 유형
 * @returns 해당 유형의 카운트와 비율
 */
export async function getTypeStats(mbtiType: MBTIType): Promise<ITypeStats> {
  const [count, total] = await Promise.all([
    kv.hget('mbti-counts', mbtiType),
    kv.get('total-submissions')
  ])
  
  const typeCount = (count as number) || 0
  const totalSubmissions = (total as number) || 0
  const percentage = totalSubmissions > 0 
    ? Math.round((typeCount / totalSubmissions) * 100 * 10) / 10 
    : 0
  
  return {
    mbtiType,
    count: typeCount,
    percentage,
    totalSubmissions
  }
}

/**
 * 최근 제출된 결과 조회
 * 
 * @param limit - 가져올 개수 (기본 10개)
 * @returns 최근 결과 배열
 */
export async function getRecentResults(limit: number = 10): Promise<IRecentResult[]> {
  const results = await kv.lrange('recent-results', 0, limit - 1)
  
  return (results as string[]).map(item => {
    try {
      return JSON.parse(item)
    } catch {
      return null
    }
  }).filter((item): item is IRecentResult => item !== null)
}

/**
 * 통계 초기화 (개발/테스트용)
 * 
 * ⚠️ 주의: 모든 통계 데이터가 삭제됩니다!
 */
export async function resetStats(): Promise<void> {
  await Promise.all([
    kv.del('mbti-counts'),
    kv.del('total-submissions'),
    kv.del('recent-results')
  ])
}

// ===== 타입 정의 =====

export interface IStats {
  mbtiCounts: Record<string, number>
  totalSubmissions: number
  percentages: Record<string, number>
}

export interface ITypeStats {
  mbtiType: MBTIType
  count: number
  percentage: number
  totalSubmissions: number
}

export interface IRecentResult {
  mbtiType: MBTIType
  timestamp: string
  scores: Record<string, number>
  completionTime?: number
}

/**
 * 대시보드용 통계 (기존 getStats 확장)
 */
export interface IDashboardStats extends IStats {
  topMBTI: MBTIType | null // 가장 인기 있는 유형
  avgCompletionTime: number // 평균 완료 시간 (초)
  recentResults: IRecentResult[] // 최근 결과
}

/**
 * 대시보드 통계 조회 (전체 통계 + 추가 정보)
 * 
 * @returns 대시보드용 확장 통계
 */
export async function getDashboardStats(): Promise<IDashboardStats> {
  const [mbtiCountsRaw, totalSubmissions, recentResultsRaw, completionTimesRaw] = await Promise.all([
    kv.hgetall('mbti-counts'),
    kv.get('total-submissions'),
    kv.lrange('recent-results', 0, 9), // 최근 10개
    kv.lrange('completion-times', 0, 99) // 최근 100개
  ])
  
  const mbtiCounts = (mbtiCountsRaw as Record<string, number>) || {}
  const total = (totalSubmissions as number) || 0
  
  // 각 MBTI 유형의 비율 계산 & 가장 인기 있는 유형 찾기
  const percentages: Record<string, number> = {}
  let topMBTI: MBTIType | null = null
  let maxCount = 0
  
  for (const [type, count] of Object.entries(mbtiCounts)) {
    percentages[type] = total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0
    if (count > maxCount) {
      maxCount = count
      topMBTI = type as MBTIType
    }
  }
  
  // 최근 결과 파싱
  const recentResults: IRecentResult[] = (recentResultsRaw as string[])
    .map(item => {
      try {
        return JSON.parse(item)
      } catch {
        return null
      }
    })
    .filter((item): item is IRecentResult => item !== null)
  
  // 평균 완료 시간 계산
  const completionTimes = ((completionTimesRaw as string[]) || [])
    .map(time => {
      const parsed = parseInt(time, 10)
      return isNaN(parsed) ? null : parsed
    })
    .filter((time): time is number => time !== null)
  
  const avgCompletionTime = completionTimes.length > 0
    ? Math.round(completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length)
    : 0
  
  return {
    mbtiCounts,
    totalSubmissions: total,
    percentages,
    topMBTI,
    avgCompletionTime,
    recentResults
  }
}

