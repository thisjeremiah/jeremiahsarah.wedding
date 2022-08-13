import type { NextPage } from 'next'
import Layout from '../components/Layout'
import PetalAnimation from '../components/PetalAnimation'

const Home: NextPage = () => {
  return (
    <Layout className="bg-cobalt-400 text-lemon-400">
      <div className="absolute inset-0 pointer-events-none">
        <PetalAnimation />
      </div>
      <div className="h-screen text-lemon-400">
        <div className="text-center h-full w-full flex flex-col justify-center">
          <div className="text-5xl font-serif font-medium text-lemon-500 leading-none pb-4 flex justify-center">
            <h1 className="text-left">
              Sarah & <br /> Jeremiah
            </h1>
          </div>
          <h2 className="text-lg leading-tight lowercase">Santa Barbara, CA</h2>
          <h2 className="text-lg leading-loose lowercase">May 20 2023</h2>
        </div>
      </div>
    </Layout>
  )
}

export default Home
