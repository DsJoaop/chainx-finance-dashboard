'use client'

import { useMemo } from 'react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { Charts } from '@/components/dashboard/Charts/Charts'

export function AnalyticsContent() {
  const { portfolio } = usePortfolio()

  // Calcular métricas adicionais
  const metrics = useMemo(() => {
    const annualReturn = (portfolio.totalChange / (portfolio.totalValue - portfolio.totalChange)) * 100
    
    // Calcular volatilidade (desvio padrão dos retornos mensais)
    const monthlyReturns = portfolio.profitHistory.map(history => {
      const totalMonthly = history.stocks + history.bonds + history.mutualFunds
      const previousTotal = (portfolio.totalValue - portfolio.totalChange) / portfolio.profitHistory.length
      return ((totalMonthly - previousTotal) / previousTotal) * 100
    })
    
    const meanReturn = monthlyReturns.reduce((sum, ret) => sum + ret, 0) / monthlyReturns.length
    const variance = monthlyReturns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / monthlyReturns.length
    const volatility = Math.sqrt(variance)
    
    // Índice Sharpe (considerando taxa livre de risco de 4.5% a.a.)
    const riskFreeRate = 4.5
    const sharpeRatio = (annualReturn - riskFreeRate) / volatility
    
    // Beta da carteira (simplificado)
    const marketReturn = 12 // Retorno do mercado (exemplo: 12% a.a.)
    const beta = annualReturn / marketReturn

    return {
      annualReturn,
      volatility,
      sharpeRatio,
      beta
    }
  }, [portfolio])

  // Calcular métricas por tipo de ativo
  const assetTypeMetrics = useMemo(() => {
    const types = ['stock', 'bond', 'mutual_fund'] as const
    const typeNames = {
      stock: 'Ações',
      bond: 'Títulos',
      mutual_fund: 'Fundos Mútuos'
    }

    return types.map(type => {
      const assets = portfolio.assets.filter(asset => asset.type === type)
      const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
      const totalChange = assets.reduce((sum, asset) => sum + asset.change, 0)
      const ytdReturn = (totalChange / (totalValue - totalChange)) * 100
      
      // Volatilidade por tipo (simplificada)
      const volatility = assets.reduce((sum, asset) => sum + Math.abs(asset.changePercentage), 0) / assets.length

      return {
        type: typeNames[type],
        totalValue,
        ytdReturn,
        volatility
      }
    })
  }, [portfolio])

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Análises</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Análise detalhada do desempenho dos seus investimentos
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Retorno Médio Anual
            </h2>
            <div className="p-1.5 rounded-full bg-primary-100 dark:bg-primary-900">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics.annualReturn.toFixed(1)}%
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Retorno anualizado
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Volatilidade
            </h2>
            <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics.volatility.toFixed(1)}%
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Desvio padrão anual
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Índice Sharpe
            </h2>
            <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics.sharpeRatio.toFixed(2)}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Retorno ajustado ao risco
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Beta da Carteira
            </h2>
            <div className="p-1.5 rounded-full bg-rose-100 dark:bg-rose-900">
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5M8 8v8m-4-5v5m0 0h18" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics.beta.toFixed(2)}
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Sensibilidade ao mercado
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <Charts />

      {/* Análise de Desempenho por Tipo de Ativo */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Desempenho por Tipo de Ativo
        </h2>
        <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tipo de Ativo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valor Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Retorno YTD
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Volatilidade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {assetTypeMetrics.map((metric) => (
                <tr key={metric.type}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {metric.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(metric.totalValue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    +{metric.ytdReturn.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {metric.volatility.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Insights de Risco
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 p-1.5 rounded-full bg-amber-100 dark:bg-amber-900 mt-1">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {metrics.volatility > 15 
                    ? 'Alta volatilidade detectada. Considere diversificar mais sua carteira.'
                    : 'Volatilidade dentro dos níveis aceitáveis.'}
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900 mt-1">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {metrics.sharpeRatio > 1 
                    ? 'Bom retorno ajustado ao risco. Mantenha a estratégia atual.'
                    : 'Considere ajustar sua estratégia para melhorar o retorno ajustado ao risco.'}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recomendações
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 p-1.5 rounded-full bg-primary-100 dark:bg-primary-900 mt-1">
                <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {portfolio.distribution[0].percentage > 70 
                    ? 'Considere diversificar mais seus investimentos em diferentes classes de ativos.'
                    : 'Boa diversificação entre classes de ativos.'}
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 p-1.5 rounded-full bg-rose-100 dark:bg-rose-900 mt-1">
                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {metrics.beta > 1.2 
                    ? 'Carteira muito sensível ao mercado. Considere adicionar ativos defensivos.'
                    : 'Sensibilidade ao mercado em níveis adequados.'}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
} 