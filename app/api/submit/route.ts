import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import garages from '@/data/garages.json'

export async function POST(req: Request) {
	console.log(
    'RESEND_API_KEY présente:',
    !!process.env.RESEND_API_KEY
  )
  
  try {
    const data = await req.json()

    // ✅ Instanciation ICI (runtime)
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
            "Désolé, nous n'avons trouvé aucun garage près de chez-vous.",
        },
        { status: 404 }
      )
    }

    for (const garage of matchedGarages) {
      await resend.emails.send({
        from: 'Soumissions Auto <onboarding@resend.dev>',
        to: garage.email,
        subject: `Nouvelle demande – ${data.brand} ${data.model} ${data.year}`,
        html: `<p>Nouvelle demande reçue</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('🔥 ERREUR API SUBMIT :', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
