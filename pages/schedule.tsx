import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Title from '../components/Title'

const Schedule: NextPage = () => {
  return (
    <Layout
      className="bg-slate-300 text-cobalt-500 cursor-slate"
      navClassName="bg-slate-200"
      navBackdropClassName="bg-slate-400/50"
    >
      <div className="text-center w-full">
        <Title>Schedule</Title>
        <div className="min-h-[20rem] h-[calc(100vh-8.75rem)] sm:h-[calc(100vh-9rem)] flex justify-center items-center pointer-events-none">
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-32">
            <div className="w-62">
              <h2 className="font-serif text-lg sm:text-xl">
                Rehearsal Dinner
              </h2>
              <p className="lowercase text-base sm:text-lg">may 19 2023</p>
              <p className="lowercase text-base sm:text-lg">* location tba</p>
              <p className="lowercase text-base sm:text-lg">* time tba</p>
            </div>
            <div className="w-62">
              <h2 className="font-serif text-lg sm:text-xl">
                Ceremony & Reception
              </h2>
              <p className="lowercase text-base sm:text-lg">may 20 2023</p>
              <p className="lowercase text-base sm:text-lg">
                villa & vine, santa barbara, ca
              </p>
              <p className="lowercase text-base sm:text-lg">* time tba</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Schedule
