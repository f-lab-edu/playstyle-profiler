import { fetchDashboardStats } from '@/actions/stats'
import { DashboardClient } from './DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const stats = await fetchDashboardStats()

  return <DashboardClient stats={stats} />
}
