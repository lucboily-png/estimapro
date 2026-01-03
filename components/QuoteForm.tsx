'use client'

import { useState } from 'react'

type Lang = 'fr' | 'en'

const TEXT = {
  fr: {
    title: 'Demande de soumission automobile',
    subtitle: 'Recevez rapidement une estimation de garages près de chez vous',
    submit: 'Envoyer la demande',
    success: '✅ Votre demande a été envoyée avec succès.',
    error: '❌ Une erreur est survenue. Veuillez réessayer.',
    fields: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Courriel',
      phone: 'Téléphone',
      postalCode: 'Code postal',
      brand: 'Marque',
      model: 'Modèle',
      year: 'Année',
      service: 'Service demandé',
      urgency: 'Délai',
      description: 'Description du problème',
    },
  },
  en: {
    title: 'Auto Repair Quote Request',
    subtitle: 'Get estimates from nearby auto repair shops',
    submit: 'Submit request',
    success: '✅ Your request has been sent successfully.',
    error: '❌ An error occurred. Please try again.',
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      postalCode: 'Postal code',
      brand: 'Brand',
      model: 'Model',
      year: 'Year',
      service: 'Requested service',
      urgency: 'Urgency',
      description: 'Problem description',
    },
  },
}

export default function QuoteForm({ lang = 'fr' }: { lang?: Lang }) {
  const t = TEXT[lang]
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const form = e.currentTarget
    const formData = {
      firstName: (form.firstName as HTMLInputElement).value,
      lastName: (form.lastName as HTMLInputElement).value,
      email: (form.email as HTMLInputElement).value,
      phone: (form.phone as HTMLInputElement).value,
      postalCode: (form.postalCode as HTMLInputElement).value,
      brand: (form.brand as HTMLInputElement).value,
      model: (form.model as HTMLInputElement).value,
      year: (form.year as HTMLInputElement).value,
      serviceType: (form.serviceType as HTMLSelectElement).value,
      urgency: (form.urgency as HTMLSelectElement).value,
      description: (form.description as HTMLTextAreaElement).value,
      lang,
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('error')

      setMessage(t.success)
      form.reset()
    } catch {
      setMessage(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* TITRE */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {t.title}
        </h1>
        <p className="mt-2 text-slate-600">
          {t.subtitle}
        </p>
      </div>

      {/* GRILLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" required placeholder={t.fields.firstName} className="input" />
        <input name="lastName" required placeholder={t.fields.lastName} className="input" />
        <input name="email" type="email" required placeholder={t.fields.email} className="input" />
        <input name="phone" required placeholder={t.fields.phone} className="input" />
        <input name="postalCode" required placeholder={t.fields.postalCode} className="input" />
        <input name="brand" required placeholder={t.fields.brand} className="input" />
        <input name="model" required placeholder={t.fields.model} className="input" />
        <input name="year" required placeholder={t.fields.year} className="input" />
      </div>

      <select name="serviceType" required className="input">
        <option value="">{t.fields.service}</option>
        <option>Carrosserie</option>
        <option>Mécanique</option>
        <option>Peinture</option>
        <option>Autre</option>
      </select>

      <select name="urgency" required className="input">
        <option value="">{t.fields.urgency}</option>
        <option>Urgent</option>
        <option>1-3 jours</option>
        <option>Flexible</option>
      </select>

      <textarea
        name="description"
        rows={4}
        placeholder={t.fields.description}
        className="input"
      />

      <button
        disabled={loading}
        className="w-full rounded-xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
      >
        {loading ? '...' : t.submit}
      </button>

      {message && (
        <p className="text-center font-medium">{message}</p>
      )}
    </form>
  )
}
