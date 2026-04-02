import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'East Coast Australia — Mai 2026 | Valentin & Nicolas',
  description: 'Road trip interactif de 14 jours sur la cote est australienne',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
