import Tile from './Tile/Tile'
import cx from 'classnames'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useIsMobile } from '../utils/isMobile'

export type ColorCardProps = {
  tile: '1' | '2' | '3' | '4' | '5' | '6' | '7'
  title: string
  description: string
  colorClassName: string
  onFocus?(): void
  onUnfocus?(): void
  focused?: boolean
}

export function ColorCard(props: ColorCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    amount: 'all',
    margin: '-75px 0px -75px 0px',
  })
  const isMobile = useIsMobile()

  useEffect(() => {
    if (inView) {
      if (isMobile) {
        props.onFocus?.()
      }
    }
  }, [inView, isMobile])

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!isMobile) {
          props.onFocus?.()
        }
      }}
      onMouseOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      className={cx(
        props.focused ? 'sm:scale-105 scale-110' : 'scale-100',
        'duration-500 transition',
        'bg-terracotta-50 bg-opacity-[95%] flex flex-col backdrop:bg-blur rounded-sm selection:bg-white gap-3',
        'sm:w-80 sm:h-60 sm:p-6 sm:justify-start',
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
