import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EstimaPro',
  description: 'Demande de soumission automobile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  )
}
