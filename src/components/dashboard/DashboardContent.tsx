'use client'

import { usePortfolio } from '@/contexts/PortfolioContext'
import { Charts } from '@/components/dashboard/Charts/Charts'
import { useState, useMemo } from 'react'
import { AssetsTable } from './Portfolio/AssetsTable'
import { AssetType } from '@/types/financial'

export function DashboardContent() {
  const { portfolio } = usePortfolio()
  const [timeRange, setTimeRange] = useState('all')
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [selectedType, setSelectedType] = useState<'all' | AssetType>('all')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')
  const [sortBy, setSortBy] = useState<'value' | 'change' | 'risk'>('value')
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Filtrar ativos baseado nos critérios selecionados
  const filteredAssets = useMemo(() => {
    let filtered = [...portfolio.assets]

    // Filtrar por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(asset => asset.type === selectedType)
    }

    // Filtrar por valor
    if (minValue) {
      filtered = filtered.filter(asset => asset.value >= Number(minValue))
    }
    if (maxValue) {
      filtered = filtered.filter(asset => asset.value <= Number(maxValue))
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (sortBy === 'value') return b.value - a.value
      if (sortBy === 'change') return b.changePercentage - a.changePercentage
      return b.riskLevel.localeCompare(a.riskLevel)
    })

    return filtered
  }, [portfolio.assets, selectedType, minValue, maxValue, sortBy])

  // Calcular métricas filtradas
  const filteredMetrics = useMemo(() => {
    const totalValue = filteredAssets.reduce((sum, asset) => sum + asset.value, 0)
    const totalChange = filteredAssets.reduce((sum, asset) => sum + asset.change, 0)
    const monthlyChange = totalChange / 12
    const annualReturn = (totalChange / (totalValue - totalChange)) * 100
    const totalAssetsCount = filteredAssets.length
    const averageAssetValue = totalValue / totalAssetsCount || 0

    return {
      monthlyChange,
      annualReturn,
      totalAssets: totalAssetsCount,
      averageAssetValue,
      totalValue,
      totalChange
    }
  }, [filteredAssets])

  // Função para exportar dados
  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    // Implementação da exportação seria feita aqui
    console.log(`Exportando em formato ${format}...`)
    setShowExportMenu(false)
  }

  // Calcular total investido (valor total - lucro)
  const totalInvested = portfolio.totalValue - portfolio.totalChange

  // Calcular distribuição por setor
  const sectorDistribution = portfolio.sectorDistribution.sort((a, b) => b.value - a.value).slice(0, 5)

  return (
    <>
      {/* Ticker Tape */}
      <div className="bg-gray-900 p-2 -mx-8 mb-8 overflow-hidden">
        <div className="flex items-center space-x-6 animate-scroll">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">AAPL</span>
            <span className="text-sm text-green-500">+0.45%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">TSLA</span>
            <span className="text-sm text-red-500">-0.25%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">NKE</span>
            <span className="text-sm text-red-500">-2.21%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">META</span>
            <span className="text-sm text-green-500">+0.21%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">NVDA</span>
            <span className="text-sm text-red-500">-0.45%</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">AMZN</span>
            <span className="text-sm text-green-500">+0.89%</span>
          </div>
        </div>
      </div>

      {/* Header com Filtros */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredAssets.length} ativos selecionados de {portfolio.assets.length} total
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => handleExport('csv')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Exportar como CSV
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Exportar como PDF
                    </button>
                    <button
                      onClick={() => handleExport('excel')}
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Exportar como Excel
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button 
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowQuickAdd(!showQuickAdd)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="grid gap-4 md:grid-cols-4">
          <select 
            className="bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="all">Todo Período</option>
            <option value="1m">Último Mês</option>
            <option value="3m">Últimos 3 Meses</option>
            <option value="6m">Últimos 6 Meses</option>
            <option value="1y">Último Ano</option>
          </select>

          <select
            className="bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | AssetType)}
          >
            <option value="all">Todos os Tipos</option>
            <option value="stock">Ações</option>
            <option value="bond">Títulos</option>
            <option value="mutual_fund">Fundos Mútuos</option>
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Valor Min"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Valor Max"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            className="bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'value' | 'change' | 'risk')}
          >
            <option value="value">Ordenar por Valor</option>
            <option value="change">Ordenar por Variação</option>
            <option value="risk">Ordenar por Risco</option>
          </select>
        </div>
      </div>

      {/* Quick Stats com dados filtrados */}
      <div className="grid gap-4 mb-8 md:grid-cols-4">
        <div className="p-4 bg-gray-800 rounded-xl">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-500/20 rounded-lg mr-3">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Retorno Anual</p>
              <p className="text-lg font-semibold text-white">
                {filteredMetrics.annualReturn.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-xl">
          <div className="flex items-center">
            <div className="p-2 bg-green-500/20 rounded-lg mr-3">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Média por Ativo</p>
              <p className="text-lg font-semibold text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  notation: 'compact'
                }).format(filteredMetrics.averageAssetValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-xl">
          <div className="flex items-center">
            <div className="p-2 bg-amber-500/20 rounded-lg mr-3">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total de Ativos</p>
              <p className="text-lg font-semibold text-white">
                {filteredMetrics.totalAssets}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-xl">
          <div className="flex items-center">
            <div className="p-2 bg-rose-500/20 rounded-lg mr-3">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Retorno Mensal</p>
              <p className="text-lg font-semibold text-white">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  notation: 'compact'
                }).format(filteredMetrics.monthlyChange)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* Total Assets */}
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-sm font-medium text-gray-400">Total em Ativos</h2>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-white">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(portfolio.totalValue)}
                </span>
                <span className="ml-2 text-sm text-green-500">
                  +{portfolio.totalChangePercentage.toFixed(1)}% este ano
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Distribution */}
          <div className="space-y-4">
            {portfolio.distribution.map((item) => (
              <div key={item.name} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400">{item.name}</span>
                    <span className="text-sm text-gray-400">{item.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm text-white">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Investments */}
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-sm font-medium text-gray-400">Total Investido</h2>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-white">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(totalInvested)}
                </span>
                <span className="ml-2 text-sm text-green-500">
                  +{((portfolio.totalChange / totalInvested) * 100).toFixed(1)}% retorno
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Investment Chart */}
          <div className="h-[200px] mt-4">
            <Charts height={200} />
          </div>
        </div>
      </div>

      {/* Sector Distribution */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Distribuição por Setor</h2>
        <div className="grid gap-4 md:grid-cols-5">
          {sectorDistribution.map((sector) => (
            <div key={sector.sector} className="p-4 bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">
                  {sector.sector.charAt(0).toUpperCase() + sector.sector.slice(1)}
                </span>
                <span className="text-sm text-white">{sector.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-indigo-600 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${sector.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Assets */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Ativos Recentes</h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-400 transition-colors">
            Ver Todos
          </button>
        </div>
        <AssetsTable />
      </div>

      {/* AI Advisor Card */}
      <div className="p-6 bg-indigo-600 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Invista de Forma Mais Inteligente com Nosso Consultor AI!
            </h3>
            <p className="text-indigo-200">
              Obtenha gerenciamento automatizado, insights em tempo real e conselhos personalizados.
            </p>
            <button className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
              Experimente Agora
            </button>
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-indigo-500 rounded-full">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
} 