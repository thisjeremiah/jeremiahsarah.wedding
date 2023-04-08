import React, { useMemo } from 'react'
import Head from 'next/head'
import cx from 'classnames'
import { Nav } from './Nav'
import { Monogram } from './Monogram'

export default function Layout(props: {
  children: React.ReactNode
  className?: string
  title?: string
  buttonClassName?: string
  navClassName?: string
  navBackdropClassName?: string
  themeColor?: string
}) {
  const heartColor = useMemo(() => {
    if (
      props.title &&
      [
        'Registry',
        'Schedule',
        'Photos',
        'Rehearsal Dinner',
        'Wedding RSVP',
      ].includes(props.title)
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

  const footer = (
    <footer className="absolute left-0 bottom-0 right-0 px-6 pb-6">
      <div className="flex w-full justify-center flex-col items-center">
        {props.title && (
          <div className="w-5 mb-3">
            <Monogram />
          </div>
        )}
        <div className="select-none translate-x-[7px] lowercase group w-fit text-sm">
          Made with{' '}
          <div
            className={cx('inline-block group-hover:animate-heart', heartColor)}
          >
            ♡
          </div>{' '}
          in Portland, OR
        </div>
      </div>
    </footer>
  )

  // TODO FIXME
  // <main className="absolute top-20 h-[calc(100vh-5rem)] overflow-scroll">
  // <div className="relative pb-24">

  return (
    <div
      className={cx('relative transition-color min-h-screen', props.className)}
    >
      <Head>
        <meta name="theme-color" content={props.themeColor} />
      </Head>
      <Nav
        title={props.title}
        backdropClassName={props.navBackdropClassName}
        navClassName={props.navClassName}
        className={props.className}
        buttonClassName={props.buttonClassName}
      />
      <main className="relative pb-24 pt-20 sm:pt-0">{props.children}</main>
      {footer}
    </div>
  )
}
