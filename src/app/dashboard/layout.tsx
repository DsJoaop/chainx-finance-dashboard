import { Sidebar } from '@/components/dashboard/Sidebar/Sidebar'
import { PortfolioProvider } from '@/contexts/PortfolioContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <PortfolioProvider>
        <Sidebar />
        <div className="flex-1 ml-64 transition-all duration-300 ease-in-out">
          <div className="p-8">
            {children}
          </div>
        </div>
      </PortfolioProvider>
    </main>
  )
} 