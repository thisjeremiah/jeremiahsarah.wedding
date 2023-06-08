import cx from 'classnames'
import {
  motion,
  useIsomorphicLayoutEffect,
  useScroll,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import Tile from './Tile/Tile'

export function Nav(props: {
  title?: string
  backdropClassName?: string
  buttonClassName?: string
  navClassName?: string
  className?: string
}) {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  useDisableBodyScroll(isOpen)

  const currentTile: any = useMemo(() => {
    const link = links.find((link) => link.href === router.pathname)
    if (!link) {
      if (router.pathname.includes('rsvp')) return '2'
      return '1'
    }
    return link.icon
  }, [router.pathname])

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, (latest) => latest / 100)

  return (
    <>
      <div className="sm:flex relative hidden z-10 w-full justify-between items-center p-6">
        <Link href="/">
          <a>
            <Tile className="w-9 text-center" tile={currentTile} />
          </a>
        </Link>
        <nav className="flex text-md gap-6 h-[1.6rem]">
          {links
            .filter((_, i) => i > 0)
            .map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cx(
                    'w-fit border-current',
                    router.pathname === link.href &&
                      !link.button &&
                      'border-b-2',
                    link.button && 'py-1 px-3.5 rounded-full text-sm',
                    link.button && props.buttonClassName,
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
        </nav>
      </div>
      {props.title && (
        <div className="sm:flex hidden w-full justify-center relative z-10">
          <h1 className="font-fairplex small-caps tracking-wider font-black uppercase text-5xl [font-variant:all-small-caps]">
            {props.title}
          </h1>
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
            'relative flex flex-col pointer-events-auto',
            props.title && props.className,
          )}
        >
          {props.title === 'Attire' && (
            <motion.div
              style={{ opacity }}
              className="absolute top-0 left-0 right-0 backdrop-blur-lg bottom-[2px]"
            />
          )}
          <div className="flex items-center justify-between px-6 py-3">
            <div />
            {props.title && (
              <div className="absolute left-0 h-10 text-[2.5rem] text-center w-full items-center leading-[2.5rem] font-fairplex small-caps tracking-wider font-black uppercase [font-variant:all-small-caps]">
                {props.title}
              </div>
            )}
            <button
              className="flex flex-col relative items-center"
              onClick={() => setOpen((o) => !o)}
            >
              <Tile
                className="w-10 border-2 border-transparent"
                tile={currentTile}
              />
              <p className="text-xs">menu</p>
            </button>
          </div>
          {props.title && (
            <motion.div
              style={{ opacity }}
              className="w-full h-[2px] bg-current"
            />
          )}
        </div>
        {isOpen && (
          <div className={cx('fixed inset-0 z-10', props.backdropClassName)}>
            <div
              className={cx(
                'relative px-5 pt-4 pb-6 rounded-lg mt-3 mx-3 pointer-events-auto border-current',
                props.navClassName,
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between">
                <div className="relative gap-4 flex flex-col text-xl w-fit pt-2">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        className={cx(
                          'w-fit border-current',
                          router.pathname === link.href &&
                            !link.button &&
                            'border-b-2',
                          link.button &&
                            'bg-white py-1 px-3.5 rounded-full text-base self-center',
                          link.button && props.buttonClassName,
                        )}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </div>
                <div>
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
  useIsomorphicLayoutEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}

const links = [
  { href: '/', label: 'home', icon: '7' },
  { href: '/schedule', label: 'schedule', icon: '3' },
  { href: '/attire', label: 'attire', icon: '1' },
  { href: '/registry', label: 'registry', icon: '2' },
  { href: '/photos', label: 'photos', icon: '6' },
  { href: '/travel', label: 'travel', icon: '5' },
  { href: '/song-request', button: true, label: 'request a song!', icon: '3' },
]
