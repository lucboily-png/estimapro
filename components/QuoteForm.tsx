type Props = {
  lang: 'fr' | 'en'
}

const texts = {
  fr: {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Courriel',
    phone: 'Téléphone',
    vehicle: 'Véhicule',
    brand: 'Marque',
    model: 'Modèle',
    year: 'Année',
    service: 'Service demandé',
    description: 'Description du problème',
    submit: 'Envoyer la demande',
  },
  en: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    vehicle: 'Vehicle',
    brand: 'Brand',
    model: 'Model',
    year: 'Year',
    service: 'Requested service',
    description: 'Problem description',
    submit: 'Submit request',
  },
}

export default function QuoteForm({ lang }: Props) {
  const t = texts[lang]

  return (
    <form className="space-y-6">
      {/* IDENTITÉ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder={t.firstName}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder={t.lastName}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder={t.email}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          placeholder={t.phone}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* VÉHICULE */}
      <div>
        <h3 className="text-lg font-semibold mb-3">{t.vehicle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder={t.brand}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder={t.model}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder={t.year}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* SERVICE */}
      <div>
        <input
          type="text"
          placeholder={t.service}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <textarea
          placeholder={t.description}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* BOUTON */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
      >
        {t.submit}
      </button>
    </form>
  )
}
