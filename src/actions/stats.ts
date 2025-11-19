'use server'

import { revalidatePath } from 'next/cache'
import { getDashboardStats } from '@/lib/stats'
import type { IDashboardStats } from '@/lib/stats'

export async function fetchDashboardStats(): Promise<IDashboardStats> {
  try {
    const stats = await getDashboardStats()
    return stats
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw new Error('통계를 불러오는데 실패했습니다.')
  }
}

export async function refreshDashboardStats(): Promise<IDashboardStats> {
  revalidatePath('/dashboard')
  
  return await fetchDashboardStats()
}

