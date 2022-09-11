import type { NextPage } from 'next'
import Layout from '../components/Layout'
import PetalAnimation from '../components/PetalAnimation'
import SarahAndJeremiahTitle from '../components/SarahAndJeremiahTitle'

const Home: NextPage = () => {
  return (
    <Layout
      navBackdropClassName="bg-cobalt-600/50"
      className="bg-cobalt-500 text-white cursor-cobalt selection:bg-blossom-500"
      navClassName="text-white bg-cobalt-600 border-white"
    >
      <PetalAnimation />
      <div className="relative h-screen z-1">
        <div className="fixed text-center h-full w-full flex flex-col justify-center">
          <div className="pb-4 justify-center flex">
            <div className="w-52">
              <SarahAndJeremiahTitle />
            </div>
          </div>
          <h2 className="text-lg leading-tight lowercase">Santa Barbara, CA</h2>
          <h2 className="text-lg leading-loose lowercase">May 20 2023</h2>
        </div>
      </div>
    </Layout>
  )
}

export default Home
