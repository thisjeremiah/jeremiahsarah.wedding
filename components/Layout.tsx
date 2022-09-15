import React, { useLayoutEffect, useMemo } from 'react'
import cx from 'classnames'
import { Nav } from './Nav'

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
      <main className="relative pb-16 pt-20 sm:pt-0">{props.children}</main>
      <footer className="absolute bottom-0 w-full pl-6 pb-6">
        <p className="text-center text-sm">
          made with <span className={heartColor}>♡</span> in portland, or
        </p>
      </footer>
    </div>
  )
}
