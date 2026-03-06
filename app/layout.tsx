// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voto Informado Perú 2026',
  description: 'Analiza y compara los planes de gobierno de los candidatos presidenciales peruanos con IA. Datos oficiales del JNE.',
  keywords: 'elecciones peru 2026, planes de gobierno, candidatos presidenciales, voto informado',
  openGraph: {
    title: 'Voto Informado Perú 2026',
    description: 'Analiza planes de gobierno con inteligencia artificial',
    locale: 'es_PE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
