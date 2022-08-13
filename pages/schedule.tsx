import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Tile from '../components/Tile'
import Title from '../components/Title'

const Schedule: NextPage = () => {
  return (
    <Layout className="bg-cobalt-400 text-lemon-400">
      <div className="mx-8 text-center h-full">
        <Title className="pb-20">Schedule</Title>
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-serif text-xl">Friday, May 19, 2023</h2>
              <p className="lowercase text-lg">Rehearsal Dinner</p>
            </div>
            <div className="text-rose-600 flex justify-center gap-1">
              <Tile type="flower" />
              <Tile type="hibiscus" />
              <Tile type="flower" />
            </div>
            <div>
              <h2 className="font-serif text-xl">Saturday, May 20, 2023</h2>
              <p className="lowercase text-lg">Villa & Vine</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Schedule
