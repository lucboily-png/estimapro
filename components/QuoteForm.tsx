type Props = {
  lang: 'fr' | 'en'
}

export default function QuoteForm({ lang }: Props) {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder={lang === 'fr' ? 'Nom complet' : 'Full name'}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        {lang === 'fr' ? 'Envoyer' : 'Submit'}
      </button>
    </form>
  )
}
