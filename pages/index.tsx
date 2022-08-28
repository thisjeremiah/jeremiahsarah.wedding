import type { NextPage } from 'next'
import Layout from '../components/Layout'
import PetalAnimation from '../components/PetalAnimation'
import SarahAndJeremiahTitle from '../components/SarahAndJeremiahTitle'

const Home: NextPage = () => {
  return (
    <Layout className="bg-cobalt-500 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <PetalAnimation />
      </div>
      <div className="h-screen">
        <div className="text-center h-full w-full flex flex-col justify-center">
          <div className="pb-4 justify-center flex">
            <div className="z-10 w-52">
              <SarahAndJeremiahTitle />
            </div>
          </div>
          <h2 className="z-10 text-lg leading-tight lowercase">
            Santa Barbara, CA
          </h2>
          <h2 className="z-10 text-lg leading-loose lowercase">May 20 2023</h2>
        </div>
      </div>
    </Layout>
  )
}

export default Home
