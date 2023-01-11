import React, { useMemo } from 'react'
import cx from 'classnames'
import { Nav } from './Nav'
import { Monogram } from './Monogram'
import { useIsomorphicLayoutEffect } from 'framer-motion'

export default function Layout(props: {
  children: React.ReactNode
  className?: string
  title?: string
  navClassName?: string
  navBackdropClassName?: string
}) {
  useIsomorphicLayoutEffect(() => {
    if (props.className) {
      document.querySelector('html')!.className = props.className
    }
  }, [])

  const heartColor = useMemo(() => {
    if (
      props.title &&
      ['Registry', 'Schedule', 'Photos', 'Rehearsal Dinner'].includes(
        props.title,
      )
    ) {
      return 'text-fuschia-300'
    }
    if (props.title && ['Travel'].includes(props.title)) {
      return 'text-fuschia-200'
    }
    if (props.title && ['Attire'].includes(props.title)) {
      return 'text-white'
    }
    return 'text-rose-500'
  }, [props.title])

  return (
    <div
      className={cx('relative transition-color min-h-screen', props.className)}
    >
      <Nav
        title={props.title}
        backdropClassName={props.navBackdropClassName}
        navClassName={props.navClassName}
        className={props.className}
      />
      <main className="relative pb-24 pt-20 sm:pt-0">{props.children}</main>
      <footer className="absolute left-0 bottom-0 right-0 px-6 pb-6">
        <div className="flex w-full justify-center flex-col items-center">
          {props.title && (
            <div className="w-5 mb-3">
              <Monogram />
            </div>
          )}
          <div className="group w-fit text-sm">
            made with{' '}
            <div
              className={cx(
                'inline-block group-hover:animate-heart',
                heartColor,
              )}
            >
              ♡
            </div>{' '}
            in portland, or
          </div>
        </div>
      </footer>
    </div>
  )
}
