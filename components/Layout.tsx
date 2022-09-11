import React, { useLayoutEffect } from 'react'
import cx from 'classnames'
import { Nav } from './Nav'

export default function Layout(props: {
  children: React.ReactNode
  className?: string
  navClassName?: string
  navBackdropClassName?: string
}) {
  useLayoutEffect(() => {
    if (props.className) {
      document.querySelector('html')!.className = props.className
    }
  }, [])

  return (
    <div className={cx('transition-color h-screen', props.className)}>
      <Nav
        backdropClassName={props.navBackdropClassName}
        className={props.navClassName}
      />
      <main className="relative">{props.children}</main>
    </div>
  )
}
