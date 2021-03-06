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
          {
            // <Section color="lemon" width="50vh"></Section>
            // <Section bg="lemon" color="berry" rounded="tr" width="screen" />
            // <Section color="berry" width="screen" rounded="bl"></Section>
            // <Section width="50vh" />
            // <Section color="lemon" width="screen" rounded="t"></Section>
            // <Section color="lemon" width="screen" rounded="br" />
            // <Section width="50vh" />
            // <Section color="fog" width="50vh" rounded="tl" />
            // <Section color="fog" width="screen" rounded="b"></Section>
          }
        </div>
      </div>
    </div>
  )
}

export default Background
