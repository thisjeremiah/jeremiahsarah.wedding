import Link from 'next/link'
import cx from 'classnames'

export function Nav(props: { className?: string }) {
  return (
    <nav
      className={cx(
        'w-full justify-end initial:text-rose-700 text-sm font-medium flex gap-6 p-4',
        props.className,
      )}
    >
      {
        //<a href="/photos">Photos</a>
        // <a href="/things-to-do">Things To Do</a>
      }
      <Link href="/">home</Link>
      <Link href="/registry">registry</Link>
      <Link href="/photos">photos</Link>
    </nav>
  )
}
