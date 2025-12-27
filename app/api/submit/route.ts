import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import garages from '@/data/garages.json'

const resend = new Resend(process.env.RESEND_API_KEY)

/* =========================
   HELPERS
========================= */

function normalizePostalCode(code: string) {
  return code.replace(/\s+/g, '').toUpperCase()
}

/* =========================
   EMAIL HTML – GARAGE
========================= */

function garageEmailHTML(data: any) {
  return `
  <div style="background:#f4f6f8;padding:30px;font-family:Arial,sans-serif">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden">
      <div style="background:#0f172a;color:#fff;padding:20px">
        <h2 style="margin:0">Nouvelle demande de soumission</h2>
      </div>

      <div style="padding:20px;color:#111">
        <h3>👤 Client</h3>
        <p>
          <strong>Nom :</strong> ${data.firstName} ${data.lastName}<br/>
          <strong>Email :</strong> ${data.email}<br/>
          <strong>Téléphone :</strong> ${data.phone}<br/>
          <strong>Contact préféré :</strong> ${data.contactPreference}<br/>
          <strong>Code postal :</strong> ${data.postalCode}
        </p>

        <h3>🚗 Véhicule</h3>
        <p>${data.brand} ${data.model} (${data.year})</p>

        <h3>🔧 Service demandé</h3>
        <p><strong>${data.serviceType}</strong></p>

        <h3>⏱️ Délai souhaité</h3>
        <p>${data.urgency || 'Non précisé'}</p>

        <h3>📝 Description</h3>
        <p>${data.description}</p>
      </div>
    </div>
  </div>
  `
}

/* =========================
   EMAIL HTML – CLIENT
========================= */

function clientEmailHTML(data: any) {
  return `
  <div style="background:#f4f6f8;padding:30px;font-family:Arial,sans-serif">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden">
      <div style="background:#0f172a;color:#fff;padding:20px">
        <h2 style="margin:0">Demande reçue ✔️</h2>
      </div>

      <div style="padding:20px;color:#111">
        <p>Bonjour ${data.firstName},</p>

        <p>
          Nous avons bien reçu votre demande de soumission pour votre véhicule :
        </p>

        <ul>
          <li><strong>Véhicule :</strong> ${data.brand} ${data.model} (${data.year})</li>
          <li><strong>Service :</strong> ${data.serviceType}</li>
          <li><strong>Code postal :</strong> ${data.postalCode}</li>
        </ul>

        <p>
          Un ou plusieurs garages de votre secteur vous contacteront sous peu.
        </p>

        <p style="margin-top:30px">
          🚗 <strong>Soumissions Auto</strong>
        </p>
      </div>
    </div>
  </div>
  `
}

/* =========================
   POST
========================= */

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('📦 Nouvelle demande reçue :', data)

    const clientPostal = normalizePostalCode(data.postalCode)
    console.log('📍 Code postal client :', clientPostal)

    const matchedGarages = garages.filter(garage =>
      garage.postalCodes
        .map(normalizePostalCode)
        .includes(clientPostal)
    )

    console.log(
      '📨 Garages sélectionnés :',
      matchedGarages.map(g => g.email)
    )

    if (matchedGarages.length === 0) {
      console.log('⚠️ Aucun garage trouvé pour ce code postal')
      return NextResponse.json(
        {
          success: false,
          message:
            "Désolé, nous n'avons trouvé aucun garage près de chez-vous.",
        },
        { status: 404 }
      )
    }

    /* ===== EMAILS GARAGES ===== */
    for (const garage of matchedGarages) {
      console.log('📧 Envoi email garage →', garage.email)

      await resend.emails.send({
        from: 'Soumissions Auto <no-reply@resend.dev>',
        to: garage.email,
        subject: `🛠️ Nouvelle demande de soumission – ${data.brand} ${data.model}`,
        html: garageEmailHTML(data),
      })
    }

    /* ===== EMAIL CLIENT ===== */
    console.log('📧 Envoi email client →', data.email)

    await resend.emails.send({
      from: 'Soumissions Auto <no-reply@resend.dev>',
      to: data.email,
      subject: 'Confirmation de votre demande de soumission',
      html: clientEmailHTML(data),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('🔥 ERREUR API SUBMIT :', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
