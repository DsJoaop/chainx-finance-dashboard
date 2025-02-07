'use client'

import { SectorDistribution as SectorDistributionType } from '@/types/financial'

interface SectorDistributionProps {
  sectors: SectorDistributionType[]
}

export function SectorDistribution({ sectors }: SectorDistributionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distribuição por Setor</h2>
      <div className="grid gap-4 md:grid-cols-5">
        {sectors.map((sector) => (
          <div key={sector.sector} className="p-4 bg-white dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {sector.sector.charAt(0).toUpperCase() + sector.sector.slice(1)}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">{sector.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className="bg-indigo-600 dark:bg-indigo-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${sector.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 