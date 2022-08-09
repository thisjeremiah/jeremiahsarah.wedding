import Link from 'next/link'
import cx from 'classnames'

export function Nav() {
  return (
    <nav
      className={cx(
        'absolute',
        'w-full justify-end text-md',
        'flex gap-6 px-6 py-6',
      )}
    >
      <Link href="/">home</Link>
      <Link href="/registry">registry</Link>
      <Link href="/photos">photos</Link>
    </nav>
  )
}
