'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { usePortfolio } from '@/contexts/PortfolioContext'

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function ProfitChart() {
  const { portfolio } = usePortfolio()

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={portfolio.profitHistory}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={formatCurrency} />
          <Legend />
          <Bar name="Ações" dataKey="stocks" fill="#4F46E5" />
          <Bar name="Títulos" dataKey="bonds" fill="#10B981" />
          <Bar name="Fundos Mútuos" dataKey="mutualFunds" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 