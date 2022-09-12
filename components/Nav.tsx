import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLayoutEffect, useMemo, useState } from 'react'
import Tile from './Tile/Tile'

export function Nav(props: {
  title?: string
  backdropClassName?: string
  navClassName?: string
  className?: string
}) {
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
      {}
      <div className="sm:flex hidden z-10 w-full justify-end items-center p-6">
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
      {props.title && (
        <div className="sm:flex hidden w-full justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <Tile className="w-8 text-center" tile={currentTile} />
            <h1 className="font-serif text-4xl tracking-wide">{props.title}</h1>
          </div>
        </div>
      )}
      <nav
        onClick={() => {
          if (isOpen) {
            setOpen(false)
          }
        }}
        className={cx(
          'fixed sm:hidden inset-0 z-10',
          isOpen ? '' : 'pointer-events-none',
        )}
      >
        <div
          className={cx(
            'items-center justify-between absolute flex top-0 left-0 right-0 pointer-events-auto py-3 px-6',
            props.title && props.className,
          )}
        >
          <div />
          <h1 className="absolute left-0 h-10 text-2xl text-center tracking-wide font-serif w-full items-center leading-[2.5rem]">
            {props.title}
          </h1>
          <button
            className="flex flex-col relative items-center"
            onClick={() => setOpen((o) => !o)}
          >
            <Tile
              className="w-10 border-2 border-transparent"
              tile={currentTile as any}
            />
            <p className="text-xs">menu</p>
          </button>
        </div>
        {isOpen && (
          <div className={cx('fixed inset-0 z-10', props.backdropClassName)}>
            <div
              className={cx(
                'relative px-5 pt-4 pb-6 rounded-lg mt-5 mx-4 pointer-events-auto',
                'border-current',
                props.navClassName,
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between">
                <div className="relative gap-4 flex flex-col text-xl relative w-fit pt-2">
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
                <div className="">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-3xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
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
