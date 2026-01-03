'use client'

type Props = {
  lang: 'fr' | 'en'
}

const texts = {
  fr: {
    title: 'Demande de soumission automobile',
    subtitle: 'Obtenez rapidement une estimation d’un garage près de chez vous',
    vehicle: 'Véhicule',
    contact: 'Coordonnées',
    submit: 'Envoyer la demande',
    fields: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Courriel',
      phone: 'Téléphone',
      postal: 'Code postal',
      brand: 'Marque',
      model: 'Modèle',
      year: 'Année',
      issue: 'Décrivez le problème',
      service: 'Service demandé',
      urgency: 'Urgence',
      preferred: 'Contact préféré',
    },
    options: {
      preferred: ['Téléphone', 'Courriel'],
      service: ['Mécanique', 'Freins', 'Suspension', 'Diagnostic', 'Autre'],
      urgency: ['Faible', 'Moyenne', 'Urgente'],
    },
  },
  en: {
    title: 'Auto repair quote request',
    subtitle: 'Get a fast estimate from a nearby garage',
    vehicle: 'Vehicle',
    contact: 'Contact information',
    submit: 'Submit request',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      postal: 'Postal code',
      brand: 'Brand',
      model: 'Model',
      year: 'Year',
      issue: 'Describe the issue',
      service: 'Requested service',
      urgency: 'Urgency',
      preferred: 'Preferred contact',
    },
    options: {
      preferred: ['Phone', 'Email'],
      service: ['Mechanical', 'Brakes', 'Suspension', 'Diagnostic', 'Other'],
      urgency: ['Low', 'Medium', 'Urgent'],
    },
  },
}

export default function QuoteForm({ lang }: Props) {
  const t = texts[lang]

  return (
    <form className="space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
        <p className="text-gray-500 mt-2">{t.subtitle}</p>
      </div>

      {/* CONTACT */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {t.contact}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input" placeholder={t.fields.firstName} />
          <input className="input" placeholder={t.fields.lastName} />
          <input className="input" placeholder={t.fields.email} />
          <input className="input" placeholder={t.fields.phone} />

          <select className="input">
            <option>{t.fields.preferred}</option>
            {t.options.preferred.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <input className="input" placeholder={t.fields.postal} />
        </div>
      </section>

      {/* VEHICLE */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {t.vehicle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="input" placeholder={t.fields.brand} />
          <input className="input" placeholder={t.fields.model} />
          <input className="input" placeholder={t.fields.year} />
        </div>

        <textarea
          className="input mt-4 h-28 resize-none"
          placeholder={t.fields.issue}
        />
      </section>

      {/* SERVICE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select className="input">
          <option>{t.fields.service}</option>
          {t.options.service.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <select className="input">
          <option>{t.fields.urgency}</option>
          {t.options.urgency.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-4 rounded-xl
                   font-semibold text-lg hover:bg-blue-700 transition"
      >
        {t.submit}
      </button>
    </form>
  )
}
