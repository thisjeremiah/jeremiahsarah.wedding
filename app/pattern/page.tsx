import type { NextPage } from 'next'
import PetalAnimation from '../../components/PetalAnimation'

const Pattern: NextPage = () => {
  return (
    <div className="bg-black w-screen h-screen">
      <PetalAnimation isProjectionArt />
    </div>
  )
}

export default Pattern
