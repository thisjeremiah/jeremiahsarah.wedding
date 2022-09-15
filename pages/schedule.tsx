import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Schedule: NextPage = () => {
  return (
    <Layout
      title="Schedule"
      className="bg-slate-300 text-cobalt-500 cursor-slate"
      navClassName="bg-slate-200"
      navBackdropClassName="bg-slate-400/50"
    >
      <div className="text-center w-full">
        <div className="min-h-[20rem] h-[calc(100vh-8.75rem)] sm:h-[calc(100vh-12rem)] flex justify-center items-center pointer-events-none">
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-32">
            <div className="w-62">
              <h2 className="font-serif text-xl sm:text-2xl pb-0.5">
                Rehearsal Dinner
              </h2>
              <span className="lowercase text-base sm:text-lg">
                <p>may 19 2023</p>
                <p>* location tba</p>
                <p>* time tba</p>
              </span>
            </div>
            <div className="w-62">
              <h2 className="font-serif text-xl sm:text-2xl pb-0.5">
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
