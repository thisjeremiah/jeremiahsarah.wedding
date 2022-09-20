import type { NextPage } from 'next'
import Image from 'next/image'
import Layout from '../components/Layout'

const Schedule: NextPage = () => {
  return (
    <Layout
      title="Schedule"
      className="bg-slate-300 text-cobalt-500 cursor-cobalt selection:bg-white"
      navClassName="bg-slate-200"
      navBackdropClassName="bg-slate-400/50"
    >
      <div className="text-center w-full py-16 sm:py-0">
        <div className="sm:pt-9 sm:min-h-[calc(100vh-15rem)] flex justify-center items-center pointer-events-none">
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-32">
            <div className="w-62">
              <div className="w-[16rem] h-[16rem] relative">
                <Image
                  layout="fill"
                  src={require('../public/santa-barbara.jpg')}
                  placeholder="blur"
                />
                <div className="absolute flex flex-col items-center justify-center left-[calc(50%-2rem)] w-16 h-16 bg-terracotta-500 top-[-1rem] text-white select-none">
                  <div className="text-sm">may</div>
                  <div className="font-serif text-3xl leading-none">19</div>
                </div>
              </div>
              <h2 className="font-serif text-xl pb-0.5 pt-8">
                Rehearsal Dinner
              </h2>
              <span className="lowercase text-base sm:text-lg">
                <p>may 19 2023</p>
                <p>* location tba</p>
                <p>* time tba</p>
              </span>
            </div>
            <div className="w-62">
              <div className="w-[16rem] h-[16rem] relative">
                <Image
                  layout="fill"
                  src={require('../public/villa-and-vine.jpg')}
                  placeholder="blur"
                />
                <div className="absolute flex flex-col items-center justify-center left-[calc(50%-2rem)] w-16 h-16 bg-terracotta-500 top-[-1rem] text-white select-none">
                  <div className="text-sm">may</div>
                  <div className="font-serif text-3xl leading-none">20</div>
                </div>
              </div>
              <h2 className="font-serif text-xl pb-0.5 pt-8">
                Ceremony & Reception
              </h2>
              <span className="lowercase text-base sm:text-lg">
                <p>may 20 2023</p>
                <p>villa & vine, santa barbara, ca</p>
                <p>* time tba</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Schedule
