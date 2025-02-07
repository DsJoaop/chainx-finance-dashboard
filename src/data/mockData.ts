import { Portfolio, Asset } from '@/types/financial'

export const mockPortfolio: Portfolio = {
  totalValue: 325980.65,
  totalChange: 39117.67,
  totalChangePercentage: 12,
  distribution: [
    { name: 'Ações', value: 211887.42, percentage: 65 },
    { name: 'Títulos', value: 81495.16, percentage: 25 },
    { name: 'Fundos Mútuos', value: 32598.06, percentage: 10 },
  ],
  sectorDistribution: [
    { sector: 'technology', value: 98000.00, percentage: 30 },
    { sector: 'finance', value: 65000.00, percentage: 20 },
    { sector: 'healthcare', value: 49000.00, percentage: 15 },
    { sector: 'consumer', value: 32000.00, percentage: 10 },
    { sector: 'industry', value: 32000.00, percentage: 10 },
    { sector: 'energy', value: 16000.00, percentage: 5 },
    { sector: 'utilities', value: 16000.00, percentage: 5 },
    { sector: 'real_estate', value: 16000.00, percentage: 5 },
  ],
  riskDistribution: [
    { riskLevel: 'low', value: 97794.19, percentage: 30 },
    { riskLevel: 'medium', value: 162990.32, percentage: 50 },
    { riskLevel: 'high', value: 65196.13, percentage: 20 },
  ],
  assets: [
    {
      id: '1',
      name: 'Petrobras',
      ticker: 'PETR4',
      type: 'stock' as const,
      sector: 'energy',
      quantity: 100,
      purchasePrice: 28.50,
      currentPrice: 32.75,
      value: 3275.00,
      change: 425.00,
      changePercentage: 14.91,
      riskLevel: 'medium',
      dividendYield: 12.5,
      lastDividend: 2.75,
      purchaseDate: '2023-06-15',
      notes: 'Empresa estatal de petróleo com forte dividendos',
      currency: 'BRL',
      exchange: 'B3',
      fees: {
        purchase: 4.90,
        management: 0,
        performance: 0
      },
      metadata: {
        rating: 'Buy',
      }
    },
    {
      id: '2',
      name: 'Tesouro IPCA+ 2026',
      ticker: 'IPCA+2026',
      type: 'bond' as const,
      sector: 'finance',
      quantity: 1,
      purchasePrice: 5000.00,
      currentPrice: 5250.00,
      value: 5250.00,
      change: 250.00,
      changePercentage: 5.00,
      riskLevel: 'low',
      dividendYield: 0,
      lastDividend: 0,
      purchaseDate: '2023-01-10',
      notes: 'Título público indexado à inflação',
      currency: 'BRL',
      exchange: 'Tesouro Direto',
      fees: {
        purchase: 0,
        management: 0.25,
        performance: 0
      },
      metadata: {
        rating: 'AAA',
        maturityDate: '2026-08-15',
        interestRate: 5.75
      }
    },
    {
      id: '3',
      name: 'FII HGLG11',
      ticker: 'HGLG11',
      type: 'mutual_fund' as const,
      sector: 'real_estate',
      quantity: 50,
      purchasePrice: 180.00,
      currentPrice: 175.50,
      value: 8775.00,
      change: -225.00,
      changePercentage: -2.50,
      riskLevel: 'medium',
      dividendYield: 8.2,
      lastDividend: 1.20,
      purchaseDate: '2023-09-20',
      notes: 'Fundo imobiliário de galpões logísticos',
      currency: 'BRL',
      exchange: 'B3',
      fees: {
        purchase: 4.90,
        management: 1.5,
        performance: 0
      },
      metadata: {
        fundManager: 'CSHG',
        strategyType: 'Logística',
        minimumInvestment: 1000
      }
    },
  ] as Asset[],
  profitHistory: [
    {
      year: 2018,
      stocks: 3279.43,
      bonds: 1200.50,
      mutualFunds: 800.30,
    },
    {
      year: 2019,
      stocks: 4405.21,
      bonds: 1500.75,
      mutualFunds: 1200.45,
    },
    {
      year: 2020,
      stocks: 3544.09,
      bonds: 1800.90,
      mutualFunds: 1400.60,
    },
    {
      year: 2021,
      stocks: 4830.51,
      bonds: 2100.25,
      mutualFunds: 1600.75,
    },
    {
      year: 2022,
      stocks: 5522.81,
      bonds: 2400.60,
      mutualFunds: 1800.90,
    },
    {
      year: 2023,
      stocks: 4769.17,
      bonds: 2700.95,
      mutualFunds: 2000.05,
    },
    {
      year: 2024,
      stocks: 5122.80,
      bonds: 3000.30,
      mutualFunds: 2200.20,
    },
  ],
  metrics: {
    dividendYield: 7.8,
    averageRisk: 'medium',
    totalDividends: 25480.32,
    totalFees: 3250.45,
    sharpeRatio: 1.45,
    beta: 0.85,
    alpha: 2.3,
    volatility: 12.5
  }
} 