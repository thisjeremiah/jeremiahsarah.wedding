import cx from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import Tile from './Tile/Tile'

export function Nav(props: { bgColorClassName?: string }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <nav className="absolute sm:flex hidden w-full justify-end text-md gap-6 p-6 z-10">
        <Link href="/">home</Link>
        <Link href="/registry">registry</Link>
        <Link href="/schedule">schedule</Link>
        <Link href="/travel">travel</Link>
        <Link href="/photos">photos</Link>
      </nav>
      <nav
        onClick={() => {
          if (isOpen) {
            setOpen(false)
          }
        }}
        className={cx(
          'absolute sm:hidden inset-0 z-10',
          isOpen && 'bg-white/70',
        )}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => {
            setOpen((o) => !o)
          }}
        >
          <Tile className="w-10" tile="7" />
        </button>
        {isOpen && (
          <div
            className={cx(
              'relative p-4 rounded-lg mt-5 mx-4',
              isOpen && props.bgColorClassName,
            )}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex justify-between pb-4">
              <div className="text-xl">menu</div>
              <div className="">
                <button
                  onClick={() => setOpen(false)}
                  className="text-3xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="relative gap-4 flex flex-col text-xl relative w-fit">
              <Link href="/">home</Link>
              <Link href="/registry">registry</Link>
              <Link href="/schedule">schedule</Link>
              <Link href="/travel">travel</Link>
              <Link href="/photos">photos</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
