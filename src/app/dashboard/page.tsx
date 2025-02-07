import { Metadata } from 'next'
import { DashboardContent } from '@/components/dashboard/DashboardContent'

export const metadata: Metadata = {
  title: 'Chainx - Dashboard Financeiro',
  description: 'Gerencie seus ativos financeiros de forma inteligente',
}

export default function DashboardPage() {
  return <DashboardContent />
} 