import QuoteForm from '@/components/QuoteForm'

export default function EnglishPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/garage-background.jpg')" }}
      />

      {/* BLUR + DARK OVERLAY */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="bg-white/95 rounded-2xl shadow-3xl p-8">
            <QuoteForm lang="en" />
          </div>
        </div>
      </div>
    </main>
  )
}
