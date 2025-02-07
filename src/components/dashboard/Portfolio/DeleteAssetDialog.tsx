'use client'

import { Asset } from '@/types/financial'

interface DeleteAssetDialogProps {
  asset: Asset
  onDelete: (id: string) => void
  onClose: () => void
}

export function DeleteAssetDialog({ asset, onDelete, onClose }: DeleteAssetDialogProps) {
  const handleDelete = () => {
    onDelete(asset.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Confirmar Exclusão
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Tem certeza que deseja excluir o ativo <strong>{asset.name}</strong>? Esta ação não pode ser desfeita.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
} 