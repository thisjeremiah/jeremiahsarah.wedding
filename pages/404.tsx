import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Page404: NextPage = () => {
  return (
    <Layout
      navClassName="bg-black"
      navBackdropClassName="bg-black/50"
      className="bg-black text-white selection:bg-rose-500 cursor-default"
      htmlClassName="bg-black"
    >
      <div className="fixed inset-0 h-screen pointer-events-none">
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
