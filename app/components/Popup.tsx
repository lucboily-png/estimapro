'use client'

type PopupProps = {
  open: boolean
  type: 'success' | 'error'
  message: string
  onClose: () => void
}

export default function Popup({ open, type, message, onClose }: PopupProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        
        {/* Icône */}
        <div className="text-5xl mb-4">
          {type === 'success' ? '✅' : '❌'}
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold mb-2">
          {type === 'success' ? 'Demande envoyée' : 'Aucun garage trouvé'}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* Bouton */}
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold transition"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
