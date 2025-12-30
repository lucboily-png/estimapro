import QuoteForm from '@/components/QuoteForm'

export default function PageEN() {
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
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              Auto Repair Quote Request
            </h1>

            <p className="text-gray-600 mb-6">
              Fill out this form and a partner garage will contact you shortly.
            </p>

            {/* FORM */}
            <QuoteForm lang="en" />
          </div>
        </div>
      </div>
    </main>
  )
}
