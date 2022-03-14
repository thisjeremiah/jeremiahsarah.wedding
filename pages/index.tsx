import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="h-screen selection:text-rose-400 selection:bg-rose-600">
      <Head>
        <title>Jeremiah & Sarah</title>
        <meta name="description" content="Jeremiah & Sarah" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="select-none absolute bg-rose-300 w-screen h-screen -z-50">
        <div className="w-full h-full bg-rose-400 rounded-t-full"></div>
      </div>

      <nav className="absolute w-full justify-end text-rose-700 text-sm font-medium flex gap-6 p-4">
        {
          //<a href="/photos">Photos</a>
          // <a href="/things-to-do">Things To Do</a>
        }
        <a href="/registry">Registry</a>
      </nav>

      <main className="">
        <div className="text-center h-screen w-full flex flex-col justify-center">
          <h1 className="text-2xl font-medium text-rose-700 leading-loose">
            Jeremiah & Sarah
          </h1>
          <h2 className="text-md text-rose-600 leading-tight">
            1316 State Street
          </h2>
          <h2 className="text-md text-rose-600 leading-tight">
            Santa Barbara, CA 93101
          </h2>
          <h2 className="text-md text-rose-600 leading-loose">May 20 2023</h2>
          <h2 className="text-md text-rose-600 leading-tight">5:00 PM</h2>
        </div>
        <div className="bg-rose-400 h-screen w-full"></div>
      </main>
    </div>
  )
}

export default Home
