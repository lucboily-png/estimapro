import QuoteForm from '@/components/QuoteForm'

export default function PageFR() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* IMAGE DE FOND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/garage-background.jpg')" }}
      />

      {/* OVERLAY FLOU + ASSOMBRI */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

      {/* CONTENU */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="bg-white/95 rounded-2xl shadow-3xl p-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Demande de soumission automobile
            </h1>

            <p className="text-gray-600 mb-6">
              Remplissez ce formulaire et un garage partenaire vous contactera rapidement.
            </p>

            {/* FORMULAIRE */}
            <QuoteForm lang="fr" />
          </div>
        </div>
      </div>
    </main>
  )
}
