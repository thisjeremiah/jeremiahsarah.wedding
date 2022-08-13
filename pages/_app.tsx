import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Transition } from '../components/Transition'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>sarah & jeremiah</title>
        <meta name="description" content="sarah & jeremiah" />
      </Head>
      <Transition transitionKey={router.route}>
        <Component {...pageProps} />
      </Transition>
    </>
  )
}

export default MyApp
