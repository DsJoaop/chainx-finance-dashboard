import { Metadata } from 'next'
import { AnalyticsContent } from '@/components/dashboard/Analytics/AnalyticsContent'

export const metadata: Metadata = {
  title: 'Chainx - Análises',
  description: 'Análise detalhada do seu portfólio de investimentos',
}

export default function AnalyticsPage() {
  return <AnalyticsContent />
} 