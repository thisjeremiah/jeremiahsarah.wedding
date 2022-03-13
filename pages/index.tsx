import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Jeremiah & Sarah</title>
        <meta name="description" content="Jeremiah & Sarah" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-3xl font-bold underline">
          Welcome to Jeremiah and Sarah's wedding site!
        </h1>
      </main>

      <footer className="">
        <a href="" target="_blank" rel="noopener noreferrer"></a>
      </footer>
    </div>
  )
}

export default Home
