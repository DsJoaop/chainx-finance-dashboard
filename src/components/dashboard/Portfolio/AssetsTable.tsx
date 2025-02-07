'use client'

import { usePortfolio } from '@/contexts/PortfolioContext'
import { useState } from 'react'

type SortableFields = 'name' | 'type' | 'quantity' | 'currentPrice' | 'purchasePrice' | 'change'
type SortDirection = 'ascending' | 'descending'

interface SortConfig {
  key: SortableFields
  direction: SortDirection
}

export function AssetsTable() {
  const { portfolio } = usePortfolio()
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const sortedAssets = [...portfolio.assets].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig
    const modifier = direction === 'ascending' ? 1 : -1

    const aValue = a[key]
    const bValue = b[key]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return modifier * aValue.localeCompare(bValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return modifier * (aValue - bValue)
    }

    return 0
  })

  const requestSort = (key: SortableFields) => {
    let direction: SortDirection = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {[
              { key: 'name', label: 'Ativo' },
              { key: 'type', label: 'Tipo' },
              { key: 'quantity', label: 'Quantidade' },
              { key: 'currentPrice', label: 'Preço Atual' },
              { key: 'purchasePrice', label: 'Preço de Compra' },
              { key: 'change', label: 'Retorno' }
            ].map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => requestSort(key as SortableFields)}
              >
                <div className="flex items-center">
                  {label}
                  {sortConfig?.key === key && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {sortedAssets.map((asset, index) => (
            <tr
              key={asset.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {asset.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {asset.ticker}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {asset.type === 'stock'
                    ? 'Ações'
                    : asset.type === 'bond'
                    ? 'Títulos'
                    : 'Fundos Mútuos'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {asset.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatCurrency(asset.currentPrice)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatCurrency(asset.purchasePrice)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    asset.change >= 0
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {asset.change >= 0 ? '+' : ''}
                  {formatCurrency(asset.change)} ({formatPercentage(
                    (asset.change / (asset.purchasePrice * asset.quantity)) * 100
                  )})
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 