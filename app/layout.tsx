// app/layout.tsx
import type { Metadata, Viewport } from 'next' // Added Viewport
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CoachCam | AI Performance Analysis',
  description: 'Instant AI-generated insights for athletes and coaches.',
}

// This prevents mobile browsers from auto-zooming on inputs
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}