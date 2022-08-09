import type { NextPage } from 'next'
import Section from '../components/Section'

const Background: NextPage = () => {
  return (
    <div className="h-screen">
      <div className="overflow-hidden">
        <div className="flex animate-shift">
          <Section bg="sky" color="rose" rounded="l" width="100vw" />
          <Section bg="berry" color="rose" rounded="br" width="100vw" />
          <Section bg="sky" color="berry" rounded="br/2" width="100vw" />
          <Section bg="berry" color="sky" rounded="tl/2" width="100vw" />
          <Section bg="sky" color="rose" rounded="l" width="100vw" />
        </div>
      </div>
    </div>
  )
}

export default Background
