import type { NextPage } from 'next'
import Image from 'next/image'
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
      <div className="fixed pointer-events-none inset-0 items-center text-center h-full w-full flex flex-col justify-center">
        <div className="z-1 relative w-[400px] flex sm:flex-row items-center sm:items-end flex-col-reverse justify-between mt-[3rem] sm:mt-[1rem]">
          <div className="flex flex-col justify-end pb-8 text-left">
            <div className="pb-4 justify-center flex">
              <div className="w-60 drop-shadow-sm">
                <SarahAndJeremiahTitle />
              </div>
            </div>
            <div className="ml-1">
              <h2 className="text-lg leading-loose lowercase drop-shadow-sm">
                May 20 2023
              </h2>
              <h2 className="text-lg leading-tight lowercase drop-shadow-sm">
                Santa Barbara, CA
              </h2>
            </div>
          </div>
          <div className="z-[-3] sm:ml-[-2.39rem] sm:mb-0 -mb-4">
            <div className="w-60 flex overflow-hidden drop-shadow-sm">
              <Image src="/engagement-photo.jpg" width={756} height={1058} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
