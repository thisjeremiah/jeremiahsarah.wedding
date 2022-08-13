import type { NextPage } from 'next'
import Auth from '../components/Auth'
import Layout from '../components/Layout'
import Tile from '../components/Tile'
import Title from '../components/Title'

const Schedule: NextPage = () => {
  return (
    <Layout className="bg-berry-600 text-lemon-400">
      <Auth>
        <div className="mx-8 text-center h-full">
          <Title>Schedule</Title>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-serif text-xl">Friday, May 19, 2023</h2>
                <p className="lowercase text-lg">Rehearsal Dinner</p>
              </div>
              <div className="text-lemon-500 flex justify-center gap-1">
                <Tile type="flower" />
                <Tile type="hibiscus" />
                <Tile type="flower" />
              </div>
              <div>
                <h2 className="font-serif text-xl">Saturday, May 20, 2023</h2>
                <p className="lowercase text-lg">Villa & Vine</p>
                <p className="lowercase text-base">Ceremony</p>
                <p className="lowercase text-base">Dinner and Dancing</p>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </Layout>
  )
}

export default Schedule
