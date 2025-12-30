'use client'

import { useState, useRef } from 'react'

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const [loading, setLoading] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupType, setPopupType] = useState<'success' | 'error'>('success')
  const [popupMessage, setPopupMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    if (!formRef.current) return

    const form = formRef.current

    const formData = {
      firstName: (form.firstName as HTMLInputElement).value,
      lastName: (form.lastName as HTMLInputElement).value,
      email: (form.email as HTMLInputElement).value,
      phone: (form.phone as HTMLInputElement).value,
      contactPreference: (form.contactPreference as HTMLSelectElement).value,
      postalCode: (form.postalCode as HTMLInputElement).value.replace(/\s/g, ''),
      brand: (form.brand as HTMLInputElement).value,
      model: (form.model as HTMLInputElement).value,
      year: (form.year as HTMLInputElement).value,
      serviceType: (form.serviceType as HTMLSelectElement).value,
      description: (form.description as HTMLTextAreaElement).value,
      urgency: (form.urgency as HTMLSelectElement).value,
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      let data
      try {
        data = await res.json()
      } catch {
        data = { success: false, message: 'Erreur serveur (réponse invalide)' }
      }

      if (data.success) {
        setPopupType('success')
        setPopupMessage('✅ Demande envoyée avec succès ! Un garage près de chez vous vous contactera.')
        setPopupOpen(true)
        form.reset()
      } else {
        setPopupType('error')
        setPopupMessage(data.message || '❌ Aucun garage trouvé pour ce code postal.')
        setPopupOpen(true)
      }
    } catch (error) {
      setPopupType('error')
      setPopupMessage('❌ Erreur serveur')
      setPopupOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-1"
      style={{ backgroundImage: 'url(/images/garage-background.jp)' }}
    >
      <div className="bg-white/96 p-6 rounded-xl shadow-xl w-full max-w-2xl relative">
        {/* Header */}
       
		
		<div className="text-center mb-8">
  <img
    src="/images/logo.png"
    alt="Soumissions Auto"
    className="h-max mx-auto mb-4 rounded-xl shadow-x"
  />

  <h1 className="text-3xl font-bold text-gray-900">
    Demande de soumission automobile
  </h1>

  <p className="text-gray-600 mt-2">
    Recevez rapidement des soumissions de garages près de chez vous pour effectuer vos réparations automobiles.
  </p>
</div>


        {/* Formulaire */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Coordonnées */}
          <section className="space-y-3">
            <h2 className="font-semibold text-gray-700">🧑 Vos coordonnées</h2>
            <input name="firstName" placeholder="Prénom" required className="w-full border p-2 rounded" />
            <input name="lastName" placeholder="Nom" required className="w-full border p-2 rounded" />
            <input name="email" type="email" placeholder="Courriel" required className="w-full border p-2 rounded" />
            <input name="phone" placeholder="Téléphone" required className="w-full border p-2 rounded" />
            <select name="contactPreference" required className="w-full border p-2 rounded">
              <option value="">Meilleur moyen pour vous rejoindre</option>
              <option value="Téléphone">Téléphone</option>
              <option value="SMS">SMS</option>
              <option value="Courriel">Courriel</option>
            </select>
            <input name="postalCode" placeholder="Code postal" required className="w-full border p-2 rounded" />
          </section>

          {/* Véhicule */}
          <section className="space-y-3">
            <h2 className="font-semibold text-gray-700">🚗 Votre véhicule</h2>
            <input name="brand" placeholder="Marque (ex: Toyota)" required className="w-full border p-2 rounded" />
            <input name="model" placeholder="Modèle (ex: Corolla)" required className="w-full border p-2 rounded" />
            <input name="year" placeholder="Année" required className="w-full border p-2 rounded" />
          </section>

          {/* Service */}
          <section className="space-y-3">
            <h2 className="font-semibold text-gray-700">🛠️ Service demandé</h2>
            <select name="serviceType" required className="w-full border p-2 rounded">
              <option value="">Type de service</option>
              <option value="Entretien">Entretien</option>
			  <option value="Changement huile">Changement d'huile</option>
              <option value="Freins">Freins</option>
              <option value="Suspension">Suspension</option>
              <option value="Direction">Direction</option>
              <option value="Moteur">Moteur</option>
              <option value="Transmission">Transmission</option>
              <option value="Électricité">Électricité</option>
              <option value="Climatisation">Climatisation</option>
              <option value="Diagnostic">Diagnostic / voyant</option>
              <option value="Autre">Autre</option>
            </select>
            <textarea
              name="description"
              placeholder="Décrivez le problème ou le service souhaité"
              required
              rows={4}
              className="w-full border p-2 rounded"
            />
            <select name="urgency" className="w-full border p-2 rounded">
              <option value="">Quand souhaitez-vous le service ?</option>
              <option value="Urgent">Le plus tôt possible</option>
              <option value="Cette semaine">Cette semaine</option>
              <option value="1-2 semaines">La semaine prochaine</option>
              <option value="Pas pressé">Pas pressé</option>
            </select>
          </section>

          {/* Consentement */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" required />
            Les informations fournies sont utilisées uniquement afin de transmettre votre demande aux garages participants situés près de chez vous. Aucune donnée personnelle n’est vendue ni partagée à des fins commerciales externes. Les estimations transmises sont approximatives et ne constituent pas une soumission officielle. Le coût réel des réparations ne peut être déterminé qu’après une inspection complète du véhicule par un garage.
          </label>

          {/* Bouton */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
          </button>
        </form>

        {/* Popup */}
        {popupOpen && (
          <div
            className="fixed top-10 left-1/2 -translate-x-1/2 z-50 p-4 rounded shadow-lg text-white cursor-pointer"
            style={{ backgroundColor: popupType === 'success' ? '#16a34a' : '#dc2626' }}
            onClick={() => setPopupOpen(false)}
          >
            {popupMessage}
          </div>
        )}
      </div>
    </div>
  )
}
