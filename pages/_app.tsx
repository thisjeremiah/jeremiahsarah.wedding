import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
// import { Transition } from '../components/Transition'
// <Transition transitionKey={router.route}>
// </Transition>

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Sarah & Jeremiah</title>
        <meta name="description" content="sarah & jeremiah" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
