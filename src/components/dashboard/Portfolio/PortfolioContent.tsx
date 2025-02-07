'use client'

import { useState, useMemo } from 'react'
import { Asset } from '@/types/financial'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { AddAssetForm } from '@/components/dashboard/Portfolio/AddAssetForm'
import { EditAssetForm } from '@/components/dashboard/Portfolio/EditAssetForm'
import { DeleteAssetDialog } from '@/components/dashboard/Portfolio/DeleteAssetDialog'

export function PortfolioContent() {
  const { portfolio, addAsset, editAsset, deleteAsset } = usePortfolio()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [deletingAsset, setDeletingAsset] = useState<Asset | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Asset | 'type',
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' })
  const [selectedType, setSelectedType] = useState<'all' | Asset['type']>('all')

  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    addAsset(newAsset)
    setShowAddForm(false)
  }

  const handleEditAsset = (id: string, updatedAsset: Omit<Asset, 'id'>) => {
    editAsset(id, updatedAsset)
    setEditingAsset(null)
  }

  const handleDeleteAsset = (id: string) => {
    deleteAsset(id)
    setDeletingAsset(null)
  }

  const handleSort = (key: keyof Asset | 'type') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const filteredAndSortedAssets = useMemo(() => {
    let result = [...portfolio.assets]

    // Filtrar por tipo
    if (selectedType !== 'all') {
      result = result.filter(asset => asset.type === selectedType)
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(asset => 
        asset.name.toLowerCase().includes(term) ||
        asset.type.toLowerCase().includes(term)
      )
    }

    // Ordenar
    result.sort((a, b) => {
      const aValue = sortConfig.key === 'type' 
        ? a[sortConfig.key] === 'stock' ? 'Ações' : 
          a[sortConfig.key] === 'bond' ? 'Títulos' : 'Fundos Mútuos'
        : a[sortConfig.key]
      const bValue = sortConfig.key === 'type'
        ? b[sortConfig.key] === 'stock' ? 'Ações' :
          b[sortConfig.key] === 'bond' ? 'Títulos' : 'Fundos Mútuos'
        : b[sortConfig.key]

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [portfolio.assets, selectedType, searchTerm, sortConfig])

  const totalFilteredValue = useMemo(() => 
    filteredAndSortedAssets.reduce((sum, asset) => sum + asset.value, 0)
  , [filteredAndSortedAssets])

  return (
    <>
      <div className="mb-8 flex justify-between items-center animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfólio</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gerencie seus investimentos e acompanhe seu desempenho
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 transition-all duration-200 hover:scale-105"
        >
          Adicionar Ativo
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar ativos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
          />
        </div>
        <div className="flex">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | Asset['type'])}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">Todos os tipos</option>
            <option value="stock">Ações</option>
            <option value="bond">Títulos</option>
            <option value="mutual_fund">Fundos Mútuos</option>
          </select>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          {filteredAndSortedAssets.length} ativos encontrados | Total: {' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalFilteredValue)}
        </div>
      </div>

      {/* Lista de Ativos */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg animate-fade-in-up delay-150">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                {[
                  { key: 'name', label: 'Ativo' },
                  { key: 'type', label: 'Tipo' },
                  { key: 'quantity', label: 'Quantidade' },
                  { key: 'currentPrice', label: 'Preço Atual' },
                  { key: 'value', label: 'Valor Total' },
                  { key: 'changePercentage', label: 'Variação' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleSort(key as keyof Asset | 'type')}
                  >
                    <div className="flex items-center">
                      {label}
                      {sortConfig.key === key && (
                        <svg
                          className={`w-4 h-4 ml-1 ${
                            sortConfig.direction === 'desc' ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {asset.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {asset.type === 'stock' && 'Ações'}
                      {asset.type === 'bond' && 'Títulos'}
                      {asset.type === 'mutual_fund' && 'Fundos Mútuos'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {asset.quantity.toLocaleString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(asset.currentPrice)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(asset.value)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      asset.changePercentage >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {asset.changePercentage >= 0 ? '+' : ''}
                      {asset.changePercentage.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingAsset(asset)}
                      className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeletingAsset(asset)}
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumo do Portfólio */}
      <div className="mt-8 grid gap-6 md:grid-cols-3 animate-fade-in-up delay-300">
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Total Investido
          </h2>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(portfolio.totalValue)}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Retorno Total
          </h2>
          <div className="text-2xl font-bold text-green-600">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(portfolio.totalChange)}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Retorno Percentual
          </h2>
          <div className="text-2xl font-bold text-green-600">
            +{portfolio.totalChangePercentage.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Modais com animações */}
      {showAddForm && (
        <div className="animate-fade-in">
          <AddAssetForm
            onAdd={handleAddAsset}
            onClose={() => setShowAddForm(false)}
          />
        </div>
      )}

      {editingAsset && (
        <div className="animate-fade-in">
          <EditAssetForm
            asset={editingAsset}
            onEdit={handleEditAsset}
            onClose={() => setEditingAsset(null)}
          />
        </div>
      )}

      {deletingAsset && (
        <div className="animate-fade-in">
          <DeleteAssetDialog
            asset={deletingAsset}
            onDelete={handleDeleteAsset}
            onClose={() => setDeletingAsset(null)}
          />
        </div>
      )}
    </>
  )
} 