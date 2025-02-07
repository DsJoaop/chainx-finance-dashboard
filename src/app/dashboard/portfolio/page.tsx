import { Metadata } from 'next'
import { PortfolioContent } from '@/components/dashboard/Portfolio/PortfolioContent'

export const metadata: Metadata = {
  title: 'Chainx - Portfólio',
  description: 'Visualize e gerencie seu portfólio de investimentos',
}

export default function PortfolioPage() {
  return <PortfolioContent />
} 