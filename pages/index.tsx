import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const testChildren = (
    <div className="text-center h-full w-full flex flex-col justify-center">
      <h1 className="text-2xl font-medium leading-loose">Headline</h1>
      <h2 className="text-md leading-tight opacity-60">Subtitle</h2>
    </div>
  )

  return (
    <div className="h-screen">
      <Head>
        <title>Jeremiah & Sarah</title>
        <meta name="description" content="Jeremiah & Sarah" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <nav className="bg-rose-300 w-full justify-end text-rose-700 text-sm font-medium flex gap-6 p-4">
        {
          //<a href="/photos">Photos</a>
          // <a href="/things-to-do">Things To Do</a>
        }
        <a href="/registry">Registry</a>
      </nav>

      <div className="select-none absolute bg-rose-300 w-screen h-screen -z-50"></div>

      <main className="">
        <Section color="rose" rounded="t" height="screen">
          <div className="text-center h-full w-full flex flex-col justify-center">
            <h1 className="text-2xl font-medium text-rose-700 leading-loose">
              Jeremiah & Sarah
            </h1>
            <h2 className="text-md text-rose-600 leading-tight">
              1316 State Street
            </h2>
            <h2 className="text-md text-rose-600 leading-tight">
              Santa Barbara, CA 93101
            </h2>
            <h2 className="text-md text-rose-600 leading-loose">May 20 2023</h2>
            <h2 className="text-md text-rose-600 leading-tight">5:00 PM</h2>
          </div>
        </Section>
        <Section color="rose" rounded="bl" height="100vw" />
        <Section bg="sky" color="white" rounded="bl/2" height="100vw" />
        <Section bg="white" color="sky" rounded="tr/2" height="50vh">
          {testChildren}
        </Section>
        <Section bg="lemon" color="sky" rounded="b" height="50vh" />
        <Section color="lemon" height="50vh"></Section>
        <Section bg="lemon" color="berry" rounded="tr" height="screen" />
        <Section color="berry" height="screen" rounded="bl">
          {testChildren}
        </Section>
        <Section height="50vh" />
        <Section color="lemon" height="screen" rounded="t">
          {testChildren}
        </Section>
        <Section color="lemon" height="screen" rounded="br" />
        <Section height="50vh" />
        <Section color="fog" height="50vh" rounded="tl" />
        <Section color="fog" height="screen">
          {testChildren}
        </Section>
      </main>
    </div>
  )
}

type BgProps = {
  bg?: string
  color?: string
  rounded?: string
  height: string
  children?: React.ReactNode
}

function Section(props: BgProps) {
  const colors: Record<string, string> = {
    lemon: 'bg-lemon-400',
    berry: 'bg-berry-500',
    fog: 'bg-fog-400',
    sky: 'bg-sky-500',
    rose: 'bg-rose-400',
    white: 'bg-white',
  }

  const themes: Record<string, string> = {
    lemon:
      'bg-lemon-400 text-berry-600 selection:text-berry-200 selection:bg-berry-600',
    berry:
      'bg-berry-500 text-rose-400 selection:text-rose-200 selection:bg-rose-600',
    fog: 'bg-fog-400 text-sky-600 selection:text-sky-200 selection:bg-sky-600',
    sky: 'bg-sky-500 text-white selection:text-sky-300 selection:bg-sky-600',
    rose: 'bg-rose-400 text-rose-700 selection:text-rose-200 selection:bg-rose-600',
    white: 'bg-white text-black selection:text-black selection:bg-white',
  }

  const rounded: Record<string, string> = {
    tr: 'rounded-tr-full',
    tl: 'rounded-tl-full',
    br: 'rounded-br-full',
    bl: 'rounded-bl-full',
    t: 'rounded-t-full',
    b: 'rounded-b-full',
    'tr/2': 'rounded-tr-[50%]',
    'tl/2': 'rounded-tl-[50%]',
    'br/2': 'rounded-br-[50%]',
    'bl/2': 'rounded-bl-[50%]',
    't/2': 'rounded-t-[50%]',
    'b/2': 'rounded-b-[50%]',
  }

  const height: Record<string, string> = {
    '50vh': 'h-[50vh]',
    screen: 'h-screen',
    '50vw': 'h-[50vw]',
    '100vw': 'h-[100vw]',
  }

  const bg = props.bg ? colors[props.bg] : ''
  const theme = props.color ? themes[props.color] : ''
  const round = props.rounded ? rounded[props.rounded] : ''

  return (
    <div className={`w-full ${bg}`}>
      <div className={`${height[props.height]} w-full ${theme} ${round}`}>
        {props.children}
      </div>
    </div>
  )
}

export default Home
