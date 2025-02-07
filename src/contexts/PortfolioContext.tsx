'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Asset, Portfolio, RiskLevel, SectorDistribution, RiskDistribution } from '@/types/financial'
import { mockPortfolio } from '@/data/mockData'

interface PortfolioContextData {
  portfolio: Portfolio
  addAsset: (asset: Omit<Asset, 'id'>) => void
  editAsset: (id: string, asset: Omit<Asset, 'id'>) => void
  deleteAsset: (id: string) => void
}

const PortfolioContext = createContext<PortfolioContextData>({} as PortfolioContextData)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio)

  const calculateProfitHistory = useCallback((assets: Asset[]) => {
    // Agrupar ativos por tipo
    const stockAssets = assets.filter(asset => asset.type === 'stock')
    const bondAssets = assets.filter(asset => asset.type === 'bond')
    const mutualFundAssets = assets.filter(asset => asset.type === 'mutual_fund')

    // Calcular valores totais por tipo
    const stocksTotal = stockAssets.reduce((sum, asset) => sum + asset.value, 0)
    const bondsTotal = bondAssets.reduce((sum, asset) => sum + asset.value, 0)
    const mutualFundsTotal = mutualFundAssets.reduce((sum, asset) => sum + asset.value, 0)

    // Gerar histórico dos últimos 7 anos
    const currentYear = new Date().getFullYear()
    const profitHistory = Array.from({ length: 7 }, (_, index) => {
      const year = currentYear - (6 - index)
      const yearProgress = index / 6 // Progresso de 0 a 1

      // Simular crescimento progressivo baseado nos valores atuais
      return {
        year,
        stocks: stocksTotal * (0.4 + yearProgress * 0.6), // Começa com 40% do valor atual
        bonds: bondsTotal * (0.5 + yearProgress * 0.5), // Começa com 50% do valor atual
        mutualFunds: mutualFundsTotal * (0.6 + yearProgress * 0.4), // Começa com 60% do valor atual
      }
    })

    return profitHistory
  }, [])

  const calculateSectorDistribution = useCallback((assets: Asset[], totalValue: number): SectorDistribution[] => {
    const sectorMap = new Map<string, number>()
    
    assets.forEach(asset => {
      const currentValue = sectorMap.get(asset.sector) || 0
      sectorMap.set(asset.sector, currentValue + asset.value)
    })

    return Array.from(sectorMap.entries()).map(([sector, value]) => ({
      sector: sector as Asset['sector'],
      value,
      percentage: (value / totalValue) * 100
    }))
  }, [])

  const calculateRiskDistribution = useCallback((assets: Asset[], totalValue: number): RiskDistribution[] => {
    const riskMap = new Map<RiskLevel, number>()
    
    assets.forEach(asset => {
      const currentValue = riskMap.get(asset.riskLevel) || 0
      riskMap.set(asset.riskLevel, currentValue + asset.value)
    })

    return Array.from(riskMap.entries()).map(([riskLevel, value]) => ({
      riskLevel,
      value,
      percentage: (value / totalValue) * 100
    }))
  }, [])

  const calculatePortfolioMetrics = useCallback((assets: Asset[], totalValue: number) => {
    const totalDividends = assets.reduce((sum, asset) => sum + (asset.lastDividend * asset.quantity), 0)
    const totalFees = assets.reduce((sum, asset) => 
      sum + asset.fees.purchase + asset.fees.management + asset.fees.performance, 0
    )

    // Calcular média ponderada do dividendYield
    const weightedDividendYield = assets.reduce((sum, asset) => 
      sum + (asset.dividendYield * (asset.value / totalValue)), 0
    )

    // Determinar nível de risco médio ponderado
    const riskScores = { low: 1, medium: 2, high: 3 }
    const weightedRiskScore = assets.reduce((sum, asset) => 
      sum + (riskScores[asset.riskLevel] * (asset.value / totalValue)), 0
    )
    const averageRisk: RiskLevel = 
      weightedRiskScore <= 1.67 ? 'low' :
      weightedRiskScore <= 2.33 ? 'medium' : 'high'

    // Calcular volatilidade (desvio padrão dos retornos)
    const returns = assets.map(asset => asset.changePercentage)
    const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / returns.length
    const volatility = Math.sqrt(variance)

    // Calcular Sharpe Ratio (considerando taxa livre de risco de 4.5% a.a.)
    const riskFreeRate = 4.5
    const sharpeRatio = (meanReturn - riskFreeRate) / volatility

    // Calcular Beta (simplificado, usando média do mercado de 10%)
    const marketReturn = 10
    const beta = meanReturn / marketReturn

    // Calcular Alpha (retorno acima do esperado pelo mercado)
    const expectedReturn = riskFreeRate + beta * (marketReturn - riskFreeRate)
    const alpha = meanReturn - expectedReturn

    return {
      dividendYield: weightedDividendYield,
      averageRisk,
      totalDividends,
      totalFees,
      sharpeRatio,
      beta,
      alpha,
      volatility
    }
  }, [])

  const calculatePortfolioTotals = useCallback((assets: Asset[]) => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
    const totalChange = assets.reduce((sum, asset) => sum + asset.change, 0)
    const totalChangePercentage = (totalChange / (totalValue - totalChange)) * 100

    // Calcular distribuição por tipo
    const distribution = assets.reduce((acc, asset) => {
      const type = asset.type === 'stock' ? 'Ações' : 
                  asset.type === 'bond' ? 'Títulos' : 'Fundos Mútuos'
      
      const existingType = acc.find(item => item.name === type)
      if (existingType) {
        existingType.value += asset.value
      } else {
        acc.push({ name: type, value: asset.value, percentage: 0 })
      }
      return acc
    }, [] as { name: string; value: number; percentage: number }[])

    // Calcular percentuais
    distribution.forEach(item => {
      item.percentage = (item.value / totalValue) * 100
    })

    // Calcular distribuições adicionais
    const sectorDistribution = calculateSectorDistribution(assets, totalValue)
    const riskDistribution = calculateRiskDistribution(assets, totalValue)
    const profitHistory = calculateProfitHistory(assets)
    const metrics = calculatePortfolioMetrics(assets, totalValue)

    return {
      totalValue,
      totalChange,
      totalChangePercentage,
      distribution,
      sectorDistribution,
      riskDistribution,
      profitHistory,
      metrics
    }
  }, [calculateProfitHistory, calculateSectorDistribution, calculateRiskDistribution, calculatePortfolioMetrics])

  const addAsset = useCallback((newAsset: Omit<Asset, 'id'>) => {
    setPortfolio(prev => {
      const asset: Asset = {
        ...newAsset,
        id: Math.random().toString(36).substr(2, 9),
      }
      const newAssets = [...prev.assets, asset]
      const totals = calculatePortfolioTotals(newAssets)

      return {
        ...prev,
        ...totals,
        assets: newAssets,
      }
    })
  }, [calculatePortfolioTotals])

  const editAsset = useCallback((id: string, updatedAsset: Omit<Asset, 'id'>) => {
    setPortfolio(prev => {
      const newAssets = prev.assets.map(asset => 
        asset.id === id ? { ...updatedAsset, id } : asset
      )
      const totals = calculatePortfolioTotals(newAssets)

      return {
        ...prev,
        ...totals,
        assets: newAssets,
      }
    })
  }, [calculatePortfolioTotals])

  const deleteAsset = useCallback((id: string) => {
    setPortfolio(prev => {
      const newAssets = prev.assets.filter(asset => asset.id !== id)
      const totals = calculatePortfolioTotals(newAssets)

      return {
        ...prev,
        ...totals,
        assets: newAssets,
      }
    })
  }, [calculatePortfolioTotals])

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        addAsset,
        editAsset,
        deleteAsset,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
} 