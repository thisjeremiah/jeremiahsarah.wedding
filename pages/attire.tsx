import type { NextPage } from 'next'
import { Gradient, normalizeColor } from '../utils/Gradient'
import Layout from '../components/Layout'
import { useEffect, useRef } from 'react'
import { ColorCard, ColorCardProps } from '../components/ColorCard'
import { animate, useMotionValue } from 'framer-motion'
import { rgba2hex } from '../utils/utils'

const stripHex = (hex: string) => `0x${hex.substring(1)}`

// const hexColors = {
// magenta: '#cc1c55',
// blossom: '#efc9d1',
// tannish: '#e7cabd',
// terracotta: '#c47449',
// middleBrown: '#d48369',
// lemon: '#f1d895',
// sky: '#92c0f1',
// cobalt: '#2c3c81',
// gray: '#d4d1cc',
// }

const rgbaColors = {
  magenta: 'rgba(204, 28, 85, 1)',
  blossom: 'rgba(239, 201, 209, 1)',
  tannish: 'rgba(231, 202, 189, 1)',
  terracotta: 'rgba(196, 116, 73, 1)',
  middleBrown: 'rgba(212, 131, 105, 1)',
  lemon: 'rgba(241, 216, 149, 1)',
  sky: 'rgba(146, 192, 241, 1)',
  cobalt: 'rgba(44, 60, 129, 1)',
  gray: 'rgba(212, 209, 204, 1)',
}

const AttirePage: NextPage = () => {
  let gradient = useRef<Gradient>()
  let canvasRef = useRef<HTMLCanvasElement>(null)

  // const color1 = useMotionValue(rgbaColors.blossom)
  // const color2 = useMotionValue(rgbaColors.sky)
  const color1 = useMotionValue(rgbaColors.sky)
  const color2 = useMotionValue(rgbaColors.lemon)

  const updateColors = () => {
    if (!gradient.current) return

    const normHex = normalizeColor(rgba2hex(color1.get()))
    const normHex2 = normalizeColor(rgba2hex(color2.get()))

    gradient.current.mesh.material.uniforms.u_baseColor.value = normHex

    for (
      let i = 0;
      i < gradient.current.mesh.material.uniforms.u_waveLayers.value.length;
      i++
    ) {
      if (i % 2 === 0) {
        gradient.current.mesh.material.uniforms.u_waveLayers.value[
          i
        ].value.color.value = normHex2
      } else {
        gradient.current.mesh.material.uniforms.u_waveLayers.value[
          i
        ].value.color.value = normHex
      }
    }
  }

  color1.onChange(updateColors)

  useEffect(() => {
    if (gradient.current) return

    gradient.current = new Gradient()

    // @ts-ignore
    gradient.current.sectionColors = [
      color1.get(),
      color2.get(),
      color1.get(),
      color2.get(),
    ]
      .map(rgba2hex)
      .map(normalizeColor)

    if (canvasRef.current) {
      // @ts-ignore
      gradient.current.initGradient(canvasRef.current)
    }
  }, [])

  const setColors = (c1: string, c2: string) => {
    animate(color1, c1, { duration: 0.75 })
    animate(color2, c2, { duration: 0.75 })
  }

  return (
    <Layout
      title="Attire"
      navBackdropClassName=""
      navClassName="bg-white/30 backdrop-blur-lg text-white"
      className="text-white selection:bg-white/30"
    >
      <canvas
        ref={canvasRef}
        className="fixed z-0 inset-0 h-screen w-screen"
        data-transition-in="true"
      />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="sm:max-w-xl relative max-w-sm py-8 text-center text-base">
          Please join us and wear spring cocktail attire in our wedding colors;
          inspired both by our mixed heritage and the city of Santa Barbara.
        </div>
        <div className="pt-4 pb-16 max-w-6xl relative flex-wrap flex gap-20 sm:gap-10 items-center justify-center">
          {colorCards.map((colorCard) => (
            <ColorCard
              onHover={() => {
                const [color, color2] = colorLookup[colorCard.title]
                setColors(color, color2)
              }}
              key={colorCard.title}
              {...colorCard}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

const colorLookup: Record<string, string[]> = {
  Fuschia: [rgbaColors.magenta, rgbaColors.blossom],
  Blossom: [rgbaColors.blossom, rgbaColors.magenta],
  Lemon: [rgbaColors.lemon, rgbaColors.terracotta],
  Cobalt: [rgbaColors.cobalt, rgbaColors.sky],
  Slate: [rgbaColors.sky, rgbaColors.cobalt],
  Terracotta: [rgbaColors.terracotta, rgbaColors.lemon],
}

const colorCards: ColorCardProps[] = [
  {
    title: 'Fuschia',
    tile: '4',
    description:
      'Fun and vibrant, this color is inspired by the trailing bougainvillea that is characteristic of Santa Barbara, and a common adornment of Spanish Revival architecture.',
    colorClassName: 'text-fuschia-500',
  },
  {
    title: 'Blossom',
    tile: '6',
    description:
      'The color of Japanese sakura petals in springtime Tokyo, blush pink is effervescent and transitional; subtle yet impactful. To us, this is the quintessential color of kawaii.',
    colorClassName: 'text-blossom-500',
  },
  {
    title: 'Lemon',
    tile: '5',
    description:
      'Both bright and complementary, this color is reminiscent of lemon candy, yellow poppies, and egg yolks. Yellow serves as the perfect bridge between pastel and neutral.',
    colorClassName: 'text-lemon-600',
  },
  {
    title: 'Cobalt',
    tile: '7',
    description:
      'The color of Mexican tiles and freshly dyed Japanese shibori, this color is the perfect hybrid of both of our cultures, as well as the perfect accent to our venue’s cream canvas.',
    colorClassName: 'text-cobalt-500',
  },
  {
    title: 'Slate',
    tile: '3',
    description:
      'A kawaii pastel as well as a soft complement, this gentle blue reminds us of hydrangea flowers and Japanese ceramics.',
    colorClassName: 'text-slate-400',
  },
  {
    title: 'Terracotta',
    tile: '2',
    description:
      'While seemingly a humble neutral, this warm brown is meant to resemble the clay of floor tiling and serve as a grounded foundation in our diversely colorful palette.',
    colorClassName: 'text-terracotta-500',
  },
]

export default AttirePage
