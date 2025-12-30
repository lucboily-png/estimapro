import QuoteForm from '@/app/components/QuoteForm'

export default function PageEn() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/garage-background.jpg')" }}
      />

      {/* BLUR + DARK OVERLAY */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          
          {/* HEADER */}
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Auto Repair Quote Request
            </h1>
            <p className="text-white/90">
              Quickly receive quotes from garages near you
            </p>
          </div>

          {/* FORM */}
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8">
            <QuoteForm />
          </div>
        </div>
      </div>
    </main>
  )
}
