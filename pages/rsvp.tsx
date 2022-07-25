import type { NextPage } from 'next'
import Head from 'next/head'
import { Nav } from '../components/Nav'

const RSVPPage: NextPage = () => {
  return (
    <div className="h-screen selection:text-fog-400 selection:bg-fog-600">
      <Head>
        <title>Jeremiah & Sarah</title>
        <meta name="description" content="Jeremiah & Sarah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="absolute bg-fog-300 w-screen h-screen flex flex-col justify-center">
        <div className="text-center bg-fog-400 py-8">
          <h1 className="text-2xl font-medium text-fog-700 leading-loose">
            Jeremiah & Sarah
          </h1>
          <h2 className="text-md text-fog-600 leading-tight">
            1316 State Street
          </h2>
          <h2 className="text-md text-fog-600 leading-tight">
            Santa Barbara, CA 93101
          </h2>
        </div>
      </main>
    </div>
  )
}

export default RSVPPage
