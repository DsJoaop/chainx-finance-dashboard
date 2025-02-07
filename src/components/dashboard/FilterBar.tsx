'use client'

import { AssetType } from '@/types/financial'
import { useId } from 'react'

interface FilterBarProps {
  timeRange: string
  selectedType: 'all' | AssetType
  minValue: string
  maxValue: string
  sortBy: 'value' | 'change' | 'risk'
  showExportMenu: boolean
  showQuickAdd: boolean
  onTimeRangeChange: (value: string) => void
  onTypeChange: (value: 'all' | AssetType) => void
  onMinValueChange: (value: string) => void
  onMaxValueChange: (value: string) => void
  onSortByChange: (value: 'value' | 'change' | 'risk') => void
  onExportMenuToggle: (value: boolean) => void
  onQuickAddToggle: (value: boolean) => void
  onExport: (format: 'csv' | 'pdf' | 'excel') => void
  filteredAssetsCount: number
  totalAssetsCount: number
}

export function FilterBar({
  timeRange,
  selectedType,
  minValue,
  maxValue,
  sortBy,
  showExportMenu,
  showQuickAdd,
  onTimeRangeChange,
  onTypeChange,
  onMinValueChange,
  onMaxValueChange,
  onSortByChange,
  onExportMenuToggle,
  onQuickAddToggle,
  onExport,
  filteredAssetsCount,
  totalAssetsCount
}: FilterBarProps) {
  const timeRangeId = useId()
  const typeId = useId()
  const minValueId = useId()
  const maxValueId = useId()
  const sortById = useId()

  return (
    <div className="flex flex-col gap-6 mb-8" role="region" aria-label="Filtros do Dashboard">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredAssetsCount} ativos selecionados de {totalAssetsCount} total
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => onExportMenuToggle(!showExportMenu)}
              aria-label="Menu de Exportação"
              aria-expanded={showExportMenu}
              aria-haspopup="true"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            {showExportMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="export-menu"
              >
                <div className="py-1">
                  <button
                    onClick={() => onExport('csv')}
                    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    role="menuitem"
                  >
                    Exportar como CSV
                  </button>
                  <button
                    onClick={() => onExport('pdf')}
                    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    role="menuitem"
                  >
                    Exportar como PDF
                  </button>
                  <button
                    onClick={() => onExport('excel')}
                    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    role="menuitem"
                  >
                    Exportar como Excel
                  </button>
                </div>
              </div>
            )}
          </div>
          <button 
            className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => onQuickAddToggle(!showQuickAdd)}
            aria-label="Adicionar Ativo"
            aria-expanded={showQuickAdd}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4" role="group" aria-label="Opções de Filtro">
        <div>
          <label htmlFor={timeRangeId} className="sr-only">Período</label>
          <select 
            id={timeRangeId}
            className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
          >
            <option value="all">Todo Período</option>
            <option value="1m">Último Mês</option>
            <option value="3m">Últimos 3 Meses</option>
            <option value="6m">Últimos 6 Meses</option>
            <option value="1y">Último Ano</option>
          </select>
        </div>

        <div>
          <label htmlFor={typeId} className="sr-only">Tipo de Ativo</label>
          <select
            id={typeId}
            className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as 'all' | AssetType)}
          >
            <option value="all">Todos os Tipos</option>
            <option value="stock">Ações</option>
            <option value="bond">Títulos</option>
            <option value="mutual_fund">Fundos Mútuos</option>
          </select>
        </div>

        <div className="flex gap-2">
          <div>
            <label htmlFor={minValueId} className="sr-only">Valor Mínimo</label>
            <input
              id={minValueId}
              type="number"
              placeholder="Valor Min"
              value={minValue}
              onChange={(e) => onMinValueChange(e.target.value)}
              className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
              min="0"
              step="100"
            />
          </div>
          <div>
            <label htmlFor={maxValueId} className="sr-only">Valor Máximo</label>
            <input
              id={maxValueId}
              type="number"
              placeholder="Valor Max"
              value={maxValue}
              onChange={(e) => onMaxValueChange(e.target.value)}
              className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div>
          <label htmlFor={sortById} className="sr-only">Ordenar Por</label>
          <select
            id={sortById}
            className="w-full bg-gray-800 text-sm text-white rounded-lg px-3 py-2 border-none focus:ring-2 focus:ring-indigo-500"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as 'value' | 'change' | 'risk')}
          >
            <option value="value">Ordenar por Valor</option>
            <option value="change">Ordenar por Variação</option>
            <option value="risk">Ordenar por Risco</option>
          </select>
        </div>
      </div>
    </div>
  )
} 