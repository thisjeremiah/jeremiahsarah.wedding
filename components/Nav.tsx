import Link from 'next/link'
import cx from 'classnames'

export function Nav() {
  return (
    <nav className={cx('w-full justify-end text-md', 'flex gap-6 p-6')}>
      <Link href="/">home</Link>
      <Link href="/registry">registry</Link>
      <Link href="/schedule">schedule</Link>
      <Link href="/travel">travel</Link>
      <Link href="/photos">photos</Link>
    </nav>
  )
}
