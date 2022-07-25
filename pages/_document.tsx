import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/cheltenham-lt"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/tkq2evd.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
