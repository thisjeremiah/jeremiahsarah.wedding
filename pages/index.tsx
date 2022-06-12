import type { NextPage } from 'next'
import Head from 'next/head'
import { Nav } from '../components/Nav'
import Section from '../components/Section'

const Home: NextPage = () => {
  const testChildren = (
    <div className="text-center h-full w-full flex flex-col justify-center">
      <h1 className="text-2xl font-medium leading-loose">Headline</h1>
      <h2 className="text-md leading-tight opacity-60">Subtitle</h2>
    </div>
  )

  return (
    <div className="h-screen">
      <Head>
        <title>Jeremiah & Sarah</title>
        <meta name="description" content="Jeremiah & Sarah" />
      </Head>
      <Nav className="bg-sky-500 text-lemon-200" />
      <main className="">
        <Section bg="sky" color="rose" rounded="t" height="screen">
          <div className="text-center h-full w-full flex flex-col justify-center">
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
        </Section>
        <Section bg="berry" color="rose" rounded="bl" height="100vw" />
        <Section bg="sky" color="berry" rounded="bl/2" height="100vw" />
        <Section bg="berry" color="sky" rounded="tr/2" height="50vh">
          {testChildren}
        </Section>
        <Section bg="lemon" color="sky" rounded="b" height="50vh" />
        <Section color="lemon" height="50vh"></Section>
        <Section bg="lemon" color="berry" rounded="tr" height="screen" />
        <Section color="berry" height="screen" rounded="bl">
          {testChildren}
        </Section>
        <Section height="50vh" />
        <Section color="lemon" height="screen" rounded="t">
          {testChildren}
        </Section>
        <Section color="lemon" height="screen" rounded="br" />
        <Section height="50vh" />
        <Section color="fog" height="50vh" rounded="tl" />
        <Section color="fog" height="screen" rounded="b">
          {testChildren}
        </Section>
        <div className="w-full h-10" />
      </main>
    </div>
  )
}

export default Home
