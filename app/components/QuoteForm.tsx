'use client'

import { useState } from 'react'

type Lang = 'fr' | 'en'

export default function QuoteForm({ lang = 'fr' }: { lang?: Lang }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  /* =========================
     TEXTES FR / EN
  ========================= */
  const t = {
    fr: {
      title: 'Demande de soumission auto',
      submit: 'Envoyer la demande',
      success: 'Votre demande a été envoyée avec succès.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Courriel',
      phone: 'Téléphone',
      postalCode: 'Code postal',
      brand: 'Marque',
      model: 'Modèle',
      year: 'Année',
      serviceType: 'Service demandé',
      urgency: 'Urgence',
      description: 'Description du problème',
    },
    en: {
      title: 'Auto Repair Quote Request',
      submit: 'Submit Request',
      success: 'Your request has been sent successfully.',
      error: 'An error occurred. Please try again.',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      postalCode: 'Postal code',
      brand: 'Brand',
      model: 'Model',
      year: 'Year',
      serviceType: 'Requested service',
      urgency: 'Urgency',
      description: 'Problem description',
    },
  }[lang]

  /* =========================
     SUBMIT
  ========================= */
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

      if (!res.ok) throw new Error('Server error')

      setMessage(t.success)
      form.reset()
    } catch (err) {
      setMessage(t.error)
    } finally {
      setLoading(false)
    }
  }

  /* =========================
     UI
  ========================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">{t.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" placeholder={t.firstName} required />
        <input name="lastName" placeholder={t.lastName} required />
        <input name="email" type="email" placeholder={t.email} required />
        <input name="phone" placeholder={t.phone} required />
        <input name="postalCode" placeholder={t.postalCode} required />
        <input name="brand" placeholder={t.brand} required />
        <input name="model" placeholder={t.model} required />
        <input name="year" placeholder={t.year} required />
      </div>

      <select name="serviceType" required>
        <option value="">{t.serviceType}</option>
        <option value="estimate">Estimate</option>
        <option value="repair">Repair</option>
      </select>

      <select name="urgency" required>
        <option value="">{t.urgency}</option>
        <option value="normal">Normal</option>
        <option value="urgent">Urgent</option>
      </select>

      <textarea
        name="description"
        placeholder={t.description}
        rows={4}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        {loading ? '...' : t.submit}
      </button>

      {message && (
        <p className="text-center text-sm mt-2">{message}</p>
      )}
    </form>
  )
}
