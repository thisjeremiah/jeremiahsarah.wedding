import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Tile from '../components/Tile'
import Title from '../components/Title'

const Schedule: NextPage = () => {
  return (
    <Layout className="bg-cobalt-400 text-lemon-400">
      <div className="mx-8 text-center">
        <Title className="pb-20">Schedule</Title>
        <h2 className="font-serif text-xl">Friday, May 19, 2023</h2>
        <h2 className="lowercase text-lg">Rehearsal Dinner</h2>
        <div className="text-rose-600 py-6 flex justify-center gap-1">
          <Tile type="flower" />
          <Tile type="hibiscus" />
          <Tile type="flower" />
        </div>
        <h2 className="font-serif text-xl">Saturday, May 20, 2023</h2>
        <h2 className="lowercase text-lg">Villa & Vine</h2>
      </div>
    </Layout>
  )
}

export default Schedule
