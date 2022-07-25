import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>sarah & jeremiah</title>
        <meta name="description" content="sarah & jeremiah" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
