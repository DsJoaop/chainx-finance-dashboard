'use client'

import { useEffect, useState } from 'react'
import { Asset, AssetType, AssetSector, RiskLevel } from '@/types/financial'

interface EditAssetFormProps {
  asset: Asset
  onEdit: (id: string, asset: Omit<Asset, 'id'>) => void
  onClose: () => void
}

export function EditAssetForm({ asset, onEdit, onClose }: EditAssetFormProps) {
  const [formData, setFormData] = useState({
    name: asset.name,
    type: asset.type,
    ticker: asset.ticker,
    sector: asset.sector,
    quantity: asset.quantity.toString(),
    purchasePrice: asset.purchasePrice.toString(),
    currentPrice: asset.currentPrice.toString(),
    riskLevel: asset.riskLevel,
    dividendYield: asset.dividendYield.toString(),
    lastDividend: asset.lastDividend.toString(),
    purchaseDate: asset.purchaseDate,
    notes: asset.notes,
    currency: asset.currency,
    exchange: asset.exchange,
    fees: {
      purchase: asset.fees.purchase.toString(),
      management: asset.fees.management.toString(),
      performance: asset.fees.performance.toString(),
    },
    metadata: {
      rating: asset.metadata.rating || '',
      maturityDate: asset.metadata.maturityDate || '',
      interestRate: asset.metadata.interestRate?.toString() || '',
      fundManager: asset.metadata.fundManager || '',
      strategyType: asset.metadata.strategyType || '',
      minimumInvestment: asset.metadata.minimumInvestment?.toString() || '',
    },
  })

  useEffect(() => {
    setFormData({
      name: asset.name,
      type: asset.type,
      ticker: asset.ticker,
      sector: asset.sector,
      quantity: asset.quantity.toString(),
      purchasePrice: asset.purchasePrice.toString(),
      currentPrice: asset.currentPrice.toString(),
      riskLevel: asset.riskLevel,
      dividendYield: asset.dividendYield.toString(),
      lastDividend: asset.lastDividend.toString(),
      purchaseDate: asset.purchaseDate,
      notes: asset.notes,
      currency: asset.currency,
      exchange: asset.exchange,
      fees: {
        purchase: asset.fees.purchase.toString(),
        management: asset.fees.management.toString(),
        performance: asset.fees.performance.toString(),
      },
      metadata: {
        rating: asset.metadata.rating || '',
        maturityDate: asset.metadata.maturityDate || '',
        interestRate: asset.metadata.interestRate?.toString() || '',
        fundManager: asset.metadata.fundManager || '',
        strategyType: asset.metadata.strategyType || '',
        minimumInvestment: asset.metadata.minimumInvestment?.toString() || '',
      },
    })
  }, [asset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const quantity = Number(formData.quantity)
    const purchasePrice = Number(formData.purchasePrice)
    const currentPrice = Number(formData.currentPrice)
    const value = quantity * currentPrice
    const change = value - (quantity * purchasePrice)
    const changePercentage = (change / (quantity * purchasePrice)) * 100

    onEdit(asset.id, {
      name: formData.name,
      type: formData.type,
      ticker: formData.ticker,
      sector: formData.sector,
      quantity,
      purchasePrice,
      currentPrice,
      value,
      change,
      changePercentage,
      riskLevel: formData.riskLevel,
      dividendYield: Number(formData.dividendYield),
      lastDividend: Number(formData.lastDividend),
      purchaseDate: formData.purchaseDate,
      notes: formData.notes,
      currency: formData.currency,
      exchange: formData.exchange,
      fees: {
        purchase: Number(formData.fees.purchase),
        management: Number(formData.fees.management),
        performance: Number(formData.fees.performance),
      },
      metadata: {
        rating: formData.metadata.rating,
        maturityDate: formData.metadata.maturityDate,
        interestRate: formData.metadata.interestRate ? Number(formData.metadata.interestRate) : undefined,
        fundManager: formData.metadata.fundManager,
        strategyType: formData.metadata.strategyType,
        minimumInvestment: formData.metadata.minimumInvestment ? Number(formData.metadata.minimumInvestment) : undefined,
      },
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Editar Ativo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome do Ativo
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ticker
              </label>
              <input
                type="text"
                required
                value={formData.ticker}
                onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as AssetType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="stock">Ações</option>
                <option value="bond">Títulos</option>
                <option value="mutual_fund">Fundos Mútuos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Setor
              </label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value as AssetSector })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="technology">Tecnologia</option>
                <option value="finance">Finanças</option>
                <option value="healthcare">Saúde</option>
                <option value="consumer">Consumo</option>
                <option value="industry">Indústria</option>
                <option value="energy">Energia</option>
                <option value="utilities">Utilidades</option>
                <option value="real_estate">Imobiliário</option>
                <option value="materials">Materiais</option>
                <option value="communication">Comunicação</option>
              </select>
            </div>
          </div>

          {/* Informações de Negociação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantidade
              </label>
              <input
                type="number"
                required
                min="0"
                step="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preço de Compra
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preço Atual
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.currentPrice}
                onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Informações de Risco e Dividendos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nível de Risco
              </label>
              <select
                value={formData.riskLevel}
                onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as RiskLevel })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="low">Baixo</option>
                <option value="medium">Médio</option>
                <option value="high">Alto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dividend Yield (%)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.dividendYield}
                onChange={(e) => setFormData({ ...formData, dividendYield: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Último Dividendo
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.lastDividend}
                onChange={(e) => setFormData({ ...formData, lastDividend: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data de Compra
              </label>
              <input
                type="date"
                required
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Moeda
              </label>
              <input
                type="text"
                required
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bolsa
              </label>
              <input
                type="text"
                required
                value={formData.exchange}
                onChange={(e) => setFormData({ ...formData, exchange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Taxas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taxa de Compra
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.fees.purchase}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, purchase: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taxa de Gestão
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.fees.management}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, management: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Taxa de Performance
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.fees.performance}
                onChange={(e) => setFormData({
                  ...formData,
                  fees: { ...formData.fees, performance: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Metadados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating
              </label>
              <input
                type="text"
                value={formData.metadata.rating}
                onChange={(e) => setFormData({
                  ...formData,
                  metadata: { ...formData.metadata, rating: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {formData.type === 'bond' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Vencimento
                  </label>
                  <input
                    type="date"
                    value={formData.metadata.maturityDate}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: { ...formData.metadata, maturityDate: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Taxa de Juros (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.metadata.interestRate}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: { ...formData.metadata, interestRate: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </>
            )}

            {formData.type === 'mutual_fund' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gestor do Fundo
                  </label>
                  <input
                    type="text"
                    value={formData.metadata.fundManager}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: { ...formData.metadata, fundManager: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de Estratégia
                  </label>
                  <input
                    type="text"
                    value={formData.metadata.strategyType}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: { ...formData.metadata, strategyType: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Investimento Mínimo
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.metadata.minimumInvestment}
                    onChange={(e) => setFormData({
                      ...formData,
                      metadata: { ...formData.metadata, minimumInvestment: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </>
            )}
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Observações
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 