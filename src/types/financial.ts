export type AssetType = 'stock' | 'bond' | 'mutual_fund'

export type AssetSector = 
  | 'technology'
  | 'finance'
  | 'healthcare'
  | 'consumer'
  | 'industry'
  | 'energy'
  | 'utilities'
  | 'real_estate'
  | 'materials'
  | 'communication'

export type RiskLevel = 'low' | 'medium' | 'high'

export interface Asset {
  id: string
  name: string
  type: AssetType
  ticker: string
  sector: AssetSector
  quantity: number
  purchasePrice: number
  currentPrice: number
  value: number
  change: number
  changePercentage: number
  riskLevel: RiskLevel
  dividendYield: number
  lastDividend: number
  purchaseDate: string
  notes: string
  currency: string
  exchange: string
  fees: {
    purchase: number
    management: number
    performance: number
  }
  metadata: {
    rating?: string
    maturityDate?: string // Para títulos
    interestRate?: number // Para títulos
    fundManager?: string // Para fundos mútuos
    strategyType?: string // Para fundos mútuos
    minimumInvestment?: number
  }
}

export interface AssetDistribution {
  name: string
  value: number
  percentage: number
}

export interface ProfitHistory {
  year: number
  stocks: number
  bonds: number
  mutualFunds: number
}

export interface SectorDistribution {
  sector: AssetSector
  value: number
  percentage: number
}

export interface RiskDistribution {
  riskLevel: RiskLevel
  value: number
  percentage: number
}

export interface Portfolio {
  totalValue: number
  totalChange: number
  totalChangePercentage: number
  distribution: AssetDistribution[]
  sectorDistribution: SectorDistribution[]
  riskDistribution: RiskDistribution[]
  assets: Asset[]
  profitHistory: ProfitHistory[]
  metrics: {
    dividendYield: number
    averageRisk: RiskLevel
    totalDividends: number
    totalFees: number
    sharpeRatio: number
    beta: number
    alpha: number
    volatility: number
  }
} 