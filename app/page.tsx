import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const headersList = headers()
  const lang = headersList.get('accept-language') || ''

  if (lang.startsWith('fr')) {
    redirect('/fr')
  }

  redirect('/en')
}
