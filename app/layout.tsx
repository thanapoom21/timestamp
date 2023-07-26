import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
 
// These styles apply to every route in the application
import './globals.css'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Backend Microservice Apps',
  description: 'Generated by FreeCodeCamp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}