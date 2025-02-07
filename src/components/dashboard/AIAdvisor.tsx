'use client'

export function AIAdvisor() {
  return (
    <div className="p-6 bg-indigo-600 dark:bg-indigo-700 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Invista de Forma Mais Inteligente com Nosso Consultor AI!
          </h3>
          <p className="text-indigo-100 dark:text-indigo-200">
            Obtenha gerenciamento automatizado, insights em tempo real e conselhos personalizados.
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-indigo-600 dark:text-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-white/90 transition-colors">
            Experimente Agora
          </button>
        </div>
        <div className="w-24 h-24 flex items-center justify-center bg-indigo-500 dark:bg-indigo-600 rounded-full">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      </div>
    </div>
  )
} 