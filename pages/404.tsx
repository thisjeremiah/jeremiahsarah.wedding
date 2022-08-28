import type { NextPage } from 'next'
import Layout from '../components/Layout'
import PetalAnimation from '../components/PetalAnimation'

// TODO add kodama spirits

const Page404: NextPage = () => {
  return (
    <Layout className="bg-black text-white">
      <div className="absolute inset-0 pointer-events-none">
        <PetalAnimation />
      </div>
      <div className="absolute inset-0 h-screen pointer-events-none">
        <div className="text-center h-full w-full flex flex-col justify-center">
          <h1 className="text-6xl font-serif font-medium leading-none pb-4 flex justify-center">
            404
          </h1>
        </div>
      </div>
    </Layout>
  )
}

export default Page404
