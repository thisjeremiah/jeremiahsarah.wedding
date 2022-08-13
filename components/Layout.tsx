import React from 'react'
import cx from 'classnames'
import { Nav } from './Nav'

export default function Layout(props: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cx('min-h-screen transition-color', props.className)}>
      <Nav />
      <main>{props.children}</main>
    </div>
  )
}
