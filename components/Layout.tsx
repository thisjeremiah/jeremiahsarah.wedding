import React, { useLayoutEffect } from 'react'
import cx from 'classnames'
import { Nav } from './Nav'

export default function Layout(props: {
  children: React.ReactNode
  className?: string
}) {
  useLayoutEffect(() => {
    if (props.className) {
      document.querySelector('html')!.className = props.className
    }
  }, [])

  return (
    <div className={cx('transition-color h-screen', props.className)}>
      <Nav />
      <main>{props.children}</main>
    </div>
  )
}
