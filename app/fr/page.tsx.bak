import QuoteForm from './components/QuoteForm'

export default function HomePage() {
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
          

          {/* FORMULAIRE */}
          <div className="bg-white/95 rounded-2xl shadow-3xl p-8">
            {/* ⚠️ NE RIEN CHANGER DANS QuoteForm */}
            {/* Il reste tel quel */}
            <QuoteForm />
          </div>
        </div>
      </div>
    </main>
  )
}