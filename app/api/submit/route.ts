import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import garages from '@/data/garages.json'

export async function POST(req: Request) {

  // 🔍 LOG DE VALIDATION (TEMPORAIRE)
  console.log(
    'RESEND_API_KEY présente:',
    !!process.env.RESEND_API_KEY
  )

  try {
    const data = await req.json()
	
	console.log('🧪 DATA REÇU :', data)
console.log('📧 EMAIL CLIENT :', data.email)


    // ✅ Instanciation ici (runtime)
    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY manquante')
      return NextResponse.json(
        { success: false, message: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    const postalCode = data.postalCode.replace(/\s/g, '').toUpperCase()

    const matchedGarages = garages.filter(g =>
      g.postalCodes
        .map(pc => pc.replace(/\s/g, '').toUpperCase())
        .includes(postalCode)
    )

    if (matchedGarages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Désolé, nous n'avons trouvé aucun garage près de chez-vous avec ce code postal.",
        },
        { status: 404 }
      )
    }

    for (const garage of matchedGarages) {
      await resend.emails.send({
  from: 'Soumissions Auto <onboarding@resend.dev>',
  to: garage.email,
  subject: `🛠️ Nouvelle demande de soumission – ${data.brand} ${data.model} ${data.year}`,
  html: `
  <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:24px">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden">

      <div style="background:#0f172a;color:#ffffff;padding:20px">
        <h2 style="margin:0">Nouvelle demande de soumission</h2>
        <p style="margin:4px 0 0;font-size:14px;color:#c7d2fe">
          Soumissions Auto
        </p>
      </div>

      <div style="padding:20px;color:#111827">

        <h3>👤 Client</h3>
        <p>
          <strong>Nom :</strong> ${data.firstName} ${data.lastName}<br/>
          <strong>Email :</strong> ${data.email}<br/>
          <strong>Téléphone :</strong> ${data.phone}<br/>
          <strong>Contact préféré :</strong> ${data.contactPreference}<br/>
          <strong>Code postal :</strong> ${data.postalCode}
        </p>

        <hr/>

        <h3>🚗 Véhicule</h3>
        <p>
          ${data.brand} ${data.model} (${data.year})
        </p>

        <hr/>

        <h3>🔧 Service demandé</h3>
        <p>
          <strong>Type :</strong> ${data.serviceType}<br/>
          <strong>Délai :</strong> ${data.urgency || 'Non précisé'}
        </p>

        <p style="margin-top:12px">
          <strong>Description :</strong><br/>
          ${data.description}
        </p>

      </div>

    </div>
  </div>
  `,
})

    }

// 📩 EMAIL DE CONFIRMATION CLIENT
await resend.emails.send({
  from: 'Soumissions Auto <onboarding@resend.dev>', // temporaire
  to: data.email,
  subject: 'Nous avons bien reçu votre demande de soumission 🚗',
  html: `
    <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:30px;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;padding:24px;">
        <h2 style="color:#0f172a;">Merci pour votre demande 🙌</h2>

        <p>Bonjour ${data.firstName},</p>

        <p>
          Nous avons bien reçu votre demande de soumission pour votre
          <strong>${data.year} ${data.brand} ${data.model}</strong>.
        </p>

        <p>
          Des garages près de chez vous vous contacteront sous peu.
        </p>

        <hr style="margin:24px 0" />

        <p style="font-size:14px;color:#64748b;">
          Ce message est envoyé automatiquement.  
          Merci de ne pas y répondre.
        </p>
      </div>
    </div>
  `,
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
