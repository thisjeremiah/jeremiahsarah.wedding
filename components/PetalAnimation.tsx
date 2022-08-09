import React, { useCallback, useRef } from 'react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

export default function PetalAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return (
    <div ref={ref} className="w-screen h-screen">
      <Particles
        init={particlesInit}
        options={{
          detectRetina: true,
          particles: {
            move: {
              direction: 'right',
              enable: true,
              outModes: {
                default: 'out',
              },
              size: true,
              speed: 0.00001,
            },
            number: {
              value: 15,
              // density: {
              // enable: true,
              // area: 100,
              // },
            },
            // opacity: {
            // value: 1,
            // animation: {
            // enable: false,
            // startValue: 'max',
            // destroy: 'min',
            // speed: 0.0001,
            // sync: true,
            // },
            // },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: 'random',
              animation: {
                enable: true,
                speed: 30,
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
                speed: 60,
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
            // roll: {
            // darken: {
            // enable: true,
            // value: 30,
            // },
            // enlighten: {
            // enable: true,
            // value: 30,
            // },
            // enable: true,
            // speed: {
            // min: 15,
            // max: 25,
            // },
            // },
            wobble: {
              distance: 30,
              enable: true,
              move: true,
              speed: {
                min: -15,
                max: 15,
              },
            },
          },
        }}
      />
    </div>
  )
}
