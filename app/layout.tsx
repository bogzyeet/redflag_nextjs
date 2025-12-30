import type { Metadata } from 'next'
import { Raleway, Poppins, Racing_Sans_One } from 'next/font/google'
import './globals.css'

const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
})

const racingSansOne = Racing_Sans_One({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-racing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Red Flag Car Club - Dubai Automotive Enthusiasts',
  description: 'Join our exclusive community of automotive enthusiasts, collectors, and drivers in Dubai. Experience curated drives, networking events, and unforgettable experiences on the road.',
  keywords: 'car club dubai, automotive enthusiasts, luxury cars dubai, car meets dubai, driving club, red flag dxb',
  authors: [{ name: 'Red Flag Car Club' }],
  openGraph: {
    title: 'Red Flag Car Club - Dubai',
    description: 'Exclusive automotive community in Dubai',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${poppins.variable} ${racingSansOne.variable}`}>
      <head>
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}

