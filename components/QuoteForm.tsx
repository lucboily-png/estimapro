'use client'

import { useState, useRef } from 'react'

type Lang = 'fr' | 'en'

const TEXTS = {
  fr: {
    title: 'Demande de soumission automobile',
    subtitle: 'Recevez rapidement une estimation d’un garage près de chez vous',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Courriel',
    phone: 'Téléphone',
    contactPref: 'Contact préféré',
    contactOptions: ['Courriel', 'Téléphone'],
    postalCode: 'Code postal',
    vehicle: 'Véhicule',
    brand: 'Marque',
    model: 'Modèle',
    year: 'Année',
    service: 'Service demandé',
    services: ['Carrosserie', 'Peinture', 'Esthétique', 'Mécanique'],
    urgency: 'Délai',
    urgencies: ['Urgent', 'Dans les prochains jours', 'Aucune urgence'],
    description: 'Description du problème',
    submit: 'Envoyer la demande',
    sending: 'Envoi en cours...',
    successTitle: 'Demande envoyée avec succès',
    successText:
      'Nous avons bien reçu votre demande. Un garage près de chez vous vous contactera sous peu.',
    error:
      "Désolé, nous n'avons trouvé aucun garage près de chez vous.",
  },

  en: {
    title: 'Auto repair quote request',
    subtitle: 'Get a fast estimate from a nearby garage',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    contactPref: 'Preferred contact',
    contactOptions: ['Email', 'Phone'],
    postalCode: 'Postal code',
    vehicle: 'Vehicle',
    brand: 'Brand',
    model: 'Model',
    year: 'Year',
    service: 'Requested service',
    services: ['Bodywork', 'Paint', 'Detailing', 'Mechanical'],
    urgency: 'Urgency',
    urgencies: ['Urgent', 'Next few days', 'No rush'],
    description: 'Describe the issue',
    submit: 'Submit request',
    sending: 'Sending...',
    successTitle: 'Request sent successfully',
    successText:
      'Your request was received. A nearby garage will contact you shortly.',
    error:
      'Sorry, we could not find any garage near you.',
  },
}

export default function QuoteForm({ lang = 'fr' }: { lang?: Lang }) {
  const t = TEXTS[lang]

  const formRef = useRef<HTMLFormElement>(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const form = e.currentTarget

    const formData = {
      lang,
      firstName: (form.firstName as HTMLInputElement).value,
      lastName: (form.lastName as HTMLInputElement).value,
      email: (form.email as HTMLInputElement).value,
      phone: (form.phone as HTMLInputElement).value,
      contactPreference: (form.contactPreference as HTMLSelectElement).value,
      postalCode: (form.postalCode as HTMLInputElement).value,
      brand: (form.brand as HTMLInputElement).value,
      model: (form.model as HTMLInputElement).value,
      year: (form.year as HTMLInputElement).value,
      serviceType: (form.serviceType as HTMLSelectElement).value,
      urgency: (form.urgency as HTMLSelectElement).value,
      description: (form.description as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || t.error)
      } else {
        setSuccess(true)
        formRef.current?.reset()
      }
    } catch {
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {t.title}
        </h1>
        <p className="text-gray-600 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* NAME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" required placeholder={t.firstName} className="input" />
        <input name="lastName" required placeholder={t.lastName} className="input" />
      </div>

      {/* CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" name="email" required placeholder={t.email} className="input" />
        <input name="phone" required placeholder={t.phone} className="input" />
      </div>

      <select name="contactPreference" required className="input">
        <option value="">{t.contactPref}</option>
        {t.contactOptions.map(o => (
          <option key={o}>{o}</option>
        ))}
      </select>

      <input name="postalCode" required placeholder={t.postalCode} className="input" />

      {/* VEHICLE */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">{t.vehicle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="brand" required placeholder={t.brand} className="input" />
          <input name="model" required placeholder={t.model} className="input" />
          <input name="year" required placeholder={t.year} className="input" />
        </div>
      </div>

      {/* SERVICE */}
      <select name="serviceType" required className="input">
        <option value="">{t.service}</option>
        {t.services.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <select name="urgency" required className="input">
        <option value="">{t.urgency}</option>
        {t.urgencies.map(u => (
          <option key={u}>{u}</option>
        ))}
      </select>

      <textarea
        name="description"
        rows={4}
        placeholder={t.description}
        className="input"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-800 p-4 rounded-lg">
          <strong>{t.successTitle}</strong>
          <p className="text-sm mt-1">{t.successText}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
      >
        {loading ? t.sending : t.submit}
      </button>
    </form>
  )
}
