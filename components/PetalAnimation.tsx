import cx from 'classnames'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

export default function PetalAnimation() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const timeout = useRef<NodeJS.Timeout>()
  const [isResize, setResize] = useState(false)

  useEffect(() => {
    function onResize() {
      setResize(true)

      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => setResize(false), 500)
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div
      className={cx(
        'fixed w-screen h-screen transition-opacity',
        isResize ? 'opacity-0' : 'opacity-90',
      )}
    >
      <Particles
        init={particlesInit}
        options={{
          detectRetina: true,
          particles: {
            number: {
              value: 22,
            },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: 'random',
              animation: {
                enable: true,
                speed: 10,
              },
            },
            tilt: {
              direction: 'random',
              enable: false,
              move: true,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 30,
              },
            },
            shape: {
              type: 'images',
              images: [
                {
                  src: '/blossom2.png',
                },
                {
                  src: '/blossom-petal.png',
                },
                {
                  src: '/blossom-petal.png',
                },
              ],
            },
            size: {
              value: 12,
            },
            wobble: {
              distance: 10,
              enable: true,
              move: true,
              speed: {
                min: -1,
                max: 1,
              },
            },
          },
        }}
      />
    </div>
  )
}
