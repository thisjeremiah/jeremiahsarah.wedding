import type { NextPage } from 'next'
import { Nav } from '../components/Nav'
import Section from '../components/Section'

const Home: NextPage = () => {
  // const testChildren = (
  // <div className="text-center h-full w-full flex flex-col justify-center">
  // <h1 className="text-2xl font-medium leading-loose">Headline</h1>
  // <h2 className="text-md leading-tight opacity-60">Subtitle</h2>
  // </div>
  // )

  return (
    <div className="h-screen">
      <Nav className="bg-sky-500 text-lemon-200" />
      <main className="">
        <Section bg="sky" color="rose" rounded="t" height="screen">
          <div className="text-center h-full w-full flex flex-col justify-center">
            <div className="text-4xl font-serif font-medium text-rose-700 leading-none pb-4 flex justify-center">
              <h1 className="text-left">
                Sarah & <br /> Jeremiah
              </h1>
            </div>
            <h2 className="text-md text-rose-600 leading-tight lowercase">
              1316 State Street
            </h2>
            <h2 className="text-md text-rose-600 leading-tight lowercase">
              Santa Barbara, CA 93101
            </h2>
            <h2 className="text-md text-rose-600 leading-loose lowercase">
              May 20 2023
            </h2>
            <h2 className="text-md text-rose-600 leading-tight lowercase">
              5:00 PM
            </h2>
          </div>
        </Section>
      </main>
    </div>
  )
}

export default Home
