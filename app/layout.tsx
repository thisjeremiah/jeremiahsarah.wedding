import { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

//
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
/*
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cheltenham-lt"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/tkq2evd.css" />
      </head>
      */
