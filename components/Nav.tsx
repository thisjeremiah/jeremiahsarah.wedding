import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLayoutEffect, useMemo, useState } from 'react'
import Tile from './Tile/Tile'

export function Nav(props: { backdropClassName?: string; className?: string }) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  useDisableBodyScroll(isOpen)

  const currentTile: any = useMemo(() => {
    const link = links.find((link) => link.href === router.pathname)
    if (!link) return '1'
    return link.icon
  }, [router.pathname])

  return (
    <>
      <div className="absolute sm:flex hidden z-10 w-full justify-between items-center p-6">
        <Tile className="w-10" tile={currentTile} />
        <nav className="flex text-md gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cx(
                  'w-fit border-current',
                  router.pathname === link.href ? 'border-b-2' : '',
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <nav
        onClick={() => {
          if (isOpen) {
            setOpen(false)
          }
        }}
        className={cx(
          'fixed sm:hidden inset-0 z-10',
          isOpen ? props.backdropClassName : 'pointer-events-none',
        )}
      >
        <button
          className="absolute top-6 right-6 pointer-events-auto"
          onClick={() => setOpen((o) => !o)}
        >
          <Tile className="w-10" tile={currentTile as any} />
        </button>
        {isOpen && (
          <div
            className={cx(
              'relative p-4 rounded-lg mt-5 mx-4 pointer-events-auto',
              isOpen && props.className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between pb-4">
              <div />
              <div className="">
                <button
                  onClick={() => setOpen(false)}
                  className="text-3xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="relative gap-4 flex flex-col text-xl relative w-fit">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={cx(
                      'w-fit border-current',
                      router.pathname === link.href ? 'border-b-2' : '',
                    )}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
const useDisableBodyScroll = (open: boolean) => {
  useLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}

const links = [
  { href: '/', label: 'home', icon: '7' },
  { href: '/registry', label: 'registry', icon: '2' },
  { href: '/schedule', label: 'schedule', icon: '3' },
  { href: '/travel', label: 'travel', icon: '5' },
  { href: '/photos', label: 'photos', icon: '6' },
]
