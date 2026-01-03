import QuoteForm from '../../components/QuoteForm'

export default function PageFR() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">
          Demande de soumission automobile
        </h1>
        <QuoteForm lang="fr" />
      </div>
    </main>
  )
}
