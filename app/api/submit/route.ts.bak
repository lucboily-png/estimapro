import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import garages from '@/data/garages.json'

export async function POST(req: Request) {
  try {
    // 🔎 Vérification clé API
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY manquante')
      return NextResponse.json(
        { success: false, message: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const data = await req.json()

    // 🔎 Validation minimale
    if (!data?.postalCode) {
      return NextResponse.json(
        { success: false, message: 'Code postal manquant' },
        { status: 400 }
      )
    }

    const postalCode = data.postalCode.replace(/\s/g, '').toUpperCase()

    // 🔎 Sécurité : garages.json
    if (!Array.isArray(garages)) {
      console.error('❌ garages.json invalide')
      return NextResponse.json(
        { success: false, message: 'Configuration garages invalide' },
        { status: 500 }
      )
    }

    const matchedGarages = garages.filter(garage =>
      garage.postalCodes
        ?.map(pc => pc.replace(/\s/g, '').toUpperCase())
        .includes(postalCode)
    )

    console.log('📍 Code postal client :', postalCode)
    console.log(
      '📨 Garages sélectionnés :',
      matchedGarages.map(g => g.email)
    )

    // ❌ Aucun garage trouvé
    if (matchedGarages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Désolé, nous n'avons trouvé aucun garage près de chez-vous.",
        },
        { status: 404 }
      )
    }

    // 📧 Envoi aux garages
    for (const garage of matchedGarages) {
      try {
        await resend.emails.send({
          from: 'Soumissions Auto <onboarding@resend.dev>',
          to: garage.email,
          subject: `Nouvelle demande – ${data.brand || 'Véhicule'}`,
          html: `
            <h2>Nouvelle demande de soumission</h2>
            <p><strong>Code postal :</strong> ${postalCode}</p>
            <p><strong>Email client :</strong> ${data.email || 'N/A'}</p>
          `,
        })
      } catch (mailError) {
        console.error(
          `❌ Erreur envoi email vers ${garage.email}`,
          mailError
        )
      }
    }

    // ✅ Succès
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('🔥 ERREUR API SUBMIT :', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
