import Image from 'next/image'
import React, { useLayoutEffect, useMemo } from 'react'
import cx from 'classnames'
import { Nav } from './Nav'
import { Monogram } from './Monogram'

export default function Layout(props: {
  children: React.ReactNode
  className?: string
  title?: string
  navClassName?: string
  navBackdropClassName?: string
}) {
  useLayoutEffect(() => {
    if (props.className) {
      document.querySelector('html')!.className = props.className
    }
  }, [])

  const heartColor = useMemo(() => {
    if (
      props.title &&
      ['Registry', 'Schedule', 'Photos'].includes(props.title)
    ) {
      return 'text-fuschia-300'
    }
    if (props.title && ['Travel'].includes(props.title)) {
      return 'text-fuschia-200'
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
      <footer className="absolute bottom-0 w-full pl-6 pb-6">
        <div className="flex w-full justify-center flex-col items-center">
          {props.title && (
            <div className="w-6 pb-3 -ml-3">
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
