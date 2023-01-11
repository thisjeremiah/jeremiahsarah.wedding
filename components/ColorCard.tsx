import Tile from './Tile/Tile'
import cx from 'classnames'

export type ColorCardProps = {
  tile: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  title: string
  description: string
  colorClassName: string
  onHover?(): void
}

export function ColorCard(props: ColorCardProps) {
  return (
    <div
      onMouseEnter={props.onHover}
      className={cx(
        'hover:scale-[105%] duration-500 transition transform',
        'bg-terracotta-50 bg-opacity-[95%] flex flex-col backdrop:bg-blur rounded-sm selection:bg-white gap-3',
        'sm:w-80 sm:h-60 sm:p-5 sm:justify-start',
        'w-80 h-80 justify-between p-8',
      )}
    >
      <Tile
        tile={props.tile}
        className={`w-12 sm:w-10 ${props.colorClassName}`}
      />
      <div className="flex flex-col gap-3">
        <div className="font-serif text-xl sm:text-lg text-terracotta-900">
          {props.title}
        </div>
        <div className="text-sm text-terracotta-900">{props.description}</div>
      </div>
    </div>
  )
}
