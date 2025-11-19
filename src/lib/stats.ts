import { kv } from '@vercel/kv'
import type { MBTIType, IQuizResult } from '@/types'

export async function submitResult(result: IQuizResult): Promise<number> {
  await kv.hincrby('mbti-counts', result.mbtiType, 1)
  
  const totalSubmissions = await kv.incr('total-submissions')
  
  await kv.lpush('recent-results', JSON.stringify({
    mbtiType: result.mbtiType,
    timestamp: new Date().toISOString(),
    scores: result.scores,
    completionTime: result.completionTime
  }))
  await kv.ltrim('recent-results', 0, 99)
  
  await kv.lpush('completion-times', result.completionTime)
  await kv.ltrim('completion-times', 0, 99)
  
  return totalSubmissions
}

export async function getStats(): Promise<IStats> {
  const [mbtiCountsRaw, totalSubmissions] = await Promise.all([
    kv.hgetall('mbti-counts'),
    kv.get('total-submissions')
  ])
  
  const mbtiCounts = (mbtiCountsRaw as Record<MBTIType, number>) || {}
  const total = (totalSubmissions as number) || 0
  
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

export async function resetStats(): Promise<void> {
  await Promise.all([
    kv.del('mbti-counts'),
    kv.del('total-submissions'),
    kv.del('recent-results')
  ])
}

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

export interface IDashboardStats extends IStats {
  topMBTI: MBTIType | null
  avgCompletionTime: number
  recentResults: IRecentResult[]
}

export async function getDashboardStats(): Promise<IDashboardStats> {
  const [mbtiCountsRaw, totalSubmissions, recentResultsRaw, completionTimesRaw] = await Promise.all([
    kv.hgetall('mbti-counts'),
    kv.get('total-submissions'),
    kv.lrange('recent-results', 0, 9),
    kv.lrange('completion-times', 0, 99)
  ])
  
  const mbtiCounts = (mbtiCountsRaw as Record<string, number>) || {}
  const total = (totalSubmissions as number) || 0
  
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
  
  const recentResults: IRecentResult[] = (recentResultsRaw as string[])
    .map(item => {
      try {
        return JSON.parse(item)
      } catch {
        return null
      }
    })
    .filter((item): item is IRecentResult => item !== null)
  
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

