import cx from 'classnames'

const colors = {
  lemon: 'bg-lemon-400',
  berry: 'bg-berry-500',
  fog: 'bg-fog-400',
  sky: 'bg-sky-500',
  rose: 'bg-rose-400',
  white: 'bg-white',
}

const themes = {
  lemon:
    'bg-lemon-400 text-berry-600 selection:text-berry-200 selection:bg-berry-600',
  berry:
    'bg-berry-500 text-rose-400 selection:text-rose-200 selection:bg-rose-600',
  fog: 'bg-fog-400 text-sky-600 selection:text-sky-200 selection:bg-sky-600',
  sky: 'bg-sky-500 text-white selection:text-sky-300 selection:bg-sky-600',
  rose: 'bg-rose-400 text-rose-700 selection:text-rose-200 selection:bg-rose-600',
  white: 'bg-white text-black selection:text-black selection:bg-white',
}

const rounded = {
  tr: 'rounded-tr-full',
  tl: 'rounded-tl-full',
  br: 'rounded-br-full',
  bl: 'rounded-bl-full',
  t: 'rounded-t-full',
  b: 'rounded-b-full',
  r: 'rounded-r-full',
  l: 'rounded-l-full',
  'tr/2': 'rounded-tr-[50%]',
  'tl/2': 'rounded-tl-[50%]',
  'br/2': 'rounded-br-[50%]',
  'bl/2': 'rounded-bl-[50%]',
  't/2': 'rounded-t-[50%]',
  'b/2': 'rounded-b-[50%]',
  'r/2': 'rounded-r-[50%]',
  'l/2': 'rounded-l-[50%]',
}

const heights = {
  '50vh': 'h-[50vh]',
  screen: 'h-screen',
  '50vw': 'h-[50vw]',
  '100vw': 'h-[100vw]',
  content: 'h-content',
}

const widths = {
  '50vh': 'w-[50vh]',
  screen: 'w-screen',
  '50vw': 'w-[50vw]',
  '100vw': 'w-[100vw]',
  content: 'w-content',
}

type BgProps = {
  bg?: keyof typeof colors
  color?: keyof typeof themes
  rounded?: keyof typeof rounded
  height?: keyof typeof heights
  width?: keyof typeof widths
  children?: React.ReactNode
}

export default function Section(props: BgProps) {
  const bg = props.bg ? colors[props.bg] : ''
  const theme = props.color ? themes[props.color] : ''
  const round = props.rounded ? rounded[props.rounded] : ''
  const height = props.height ? heights[props.height] : 'h-screen'
  const width = props.width ? widths[props.width] : ''

  return (
    <div className={`w-full ${bg}`}>
      <div className={cx('w-full', theme, round, height, width)}>
        {props.children}
      </div>
    </div>
  )
}
