import type { NextPage } from 'next'
import { Gradient, normalizeColor } from '../utils/Gradient'
import Layout from '../components/Layout'
import { useEffect, useRef, useState } from 'react'
import { ColorCard, ColorCardProps } from '../components/ColorCard'
import { animate, useMotionValue } from 'framer-motion'
import { rgba2hex, hexToRGBA } from '../utils/utils'
import { useIsMobile } from '../utils/isMobile'
import { useWindowScroll } from 'react-use'
import { theme } from '../tailwind.config'

const colors = theme.extend.colors

const stripHex = (hex: string) => `0x${hex.substring(1)}`

const SCROLL_THRESHOLD = 50
const DEFAULT_TITLE = 'DEFAULT'
const COLOR_TRANSITION = 1 //

const h = hexToRGBA

const colorLookup: Record<string, string[]> = {
  Fuschia: [
    h(colors.fuschia['500']),
    h(colors.fuschia['400']),
    h(colors.fuschia['600']),
    h(colors.blossom['500']),
  ],
  Blossom: [
    h(colors.blossom['500']),
    h(colors.fuschia['500']),
    h(colors.blossom['600']),
    h(colors.blossom['400']),
  ],
  Lemon: [
    h(colors.lemon['400']),
    h(colors.lemon['600']),
    h(colors.lemon['500']),
    h(colors.terracotta['300']),
  ],
  Terracotta: [
    h(colors.terracotta['800']),
    h(colors.terracotta['400']),
    h(colors.terracotta['500']),
    h(colors.berry['600']),
  ],
  Cobalt: [
    h(colors.cobalt['500']),
    h(colors.cobalt['600']),
    h(colors.cobalt['400']),
    h(colors.sky['600']),
  ],
  Slate: [
    h(colors.sky['400']),
    h(colors.sky['200']),
    h(colors.sky['500']),
    h(colors.cobalt['300']),
  ],
  [DEFAULT_TITLE]: [
    h(colors.lemon['500']),
    h(colors.blossom['500']),
    h(colors.sky['500']),
    h(colors.fuschia['500']),
  ],
}

const AttirePage: NextPage = () => {
  return (
    <Layout
      title="Attire"
      navBackdropClassName=""
      htmlClassName="bg-white"
      navClassName="bg-white/30 backdrop-blur-lg text-white"
      className="text-white selection:bg-white/30"
    >
      <AttirePageInner />
    </Layout>
  )
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
      'Both bright and complementary, this color is reminiscent of lemon candy, yellow poppies, and egg yolks. Yellow serves as a tasteful bridge between pastel and neutral.',
    colorClassName: 'text-lemon-600',
  },
  {
    title: 'Cobalt',
    tile: '7',
    description:
      'The color of Mexican tiles and freshly dyed Japanese shibori, this color is the perfect hybrid of both of our cultures, as well as the ideal accent to our venue’s cream canvas.',
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

const AttirePageInner = () => {
  let gradient = useRef<Gradient>()
  let canvasRef = useRef<HTMLCanvasElement>(null)

  const isMobile = useIsMobile()
  const { y } = useWindowScroll()
  const [_focusedTitle, setFocusedTitle] = useState(DEFAULT_TITLE)
  const focusedTitle =
    isMobile && y <= SCROLL_THRESHOLD ? DEFAULT_TITLE : _focusedTitle

  const og = colorLookup[focusedTitle]

  const color1 = useMotionValue(og[0])
  const color2 = useMotionValue(og[1])
  const color3 = useMotionValue(og[2])
  const color4 = useMotionValue(og[3])

  useEffect(() => {
    const og = colorLookup[focusedTitle]
    animate(color1, og[0], { duration: COLOR_TRANSITION })
    animate(color2, og[1], { duration: COLOR_TRANSITION })
    animate(color3, og[2], { duration: COLOR_TRANSITION })
    animate(color4, og[3], { duration: COLOR_TRANSITION })
  }, [focusedTitle, color1, color2, color3, color4])

  const updateColors = () => {
    if (!gradient.current) return

    const hex1 = normalizeColor(rgba2hex(color1.get()))
    const hex2 = normalizeColor(rgba2hex(color2.get()))
    const hex3 = normalizeColor(rgba2hex(color3.get()))
    const hex4 = normalizeColor(rgba2hex(color4.get()))

    gradient.current.mesh.material.uniforms.u_baseColor.value = hex1

    gradient.current.mesh.material.uniforms.u_waveLayers.value[0].value.color.value =
      hex2

    gradient.current.mesh.material.uniforms.u_waveLayers.value[1].value.color.value =
      hex3

    gradient.current.mesh.material.uniforms.u_waveLayers.value[2].value.color.value =
      hex4
  }

  color1.onChange(updateColors)

  useEffect(() => {
    if (gradient.current) return

    gradient.current = new Gradient()

    // @ts-ignore
    gradient.current.sectionColors = [
      color1.get(),
      color2.get(),
      color3.get(),
      color4.get(),
    ]
      .map(rgba2hex)
      .map(normalizeColor)

    if (canvasRef.current) {
      // @ts-ignore
      gradient.current.initGradient(canvasRef.current)
    }
  }, [color1, color2, color3, color4])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed z-0 inset-0 h-full w-full"
        data-transition-in="true"
      />
      <div
        onMouseOver={() => {
          if (!isMobile) {
            setFocusedTitle(DEFAULT_TITLE)
          }
        }}
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="sm:max-w-2xl relative max-w-sm pt-16 pb-16 sm:pt-8 sm:pb-8 text-center text-lg px-4">
          Please join us and wear spring cocktail attire in our wedding colors;
          inspired both by our mixed heritage and the city of Santa Barbara.
        </div>
        <div className="px-8 pt-4 pb-20 sm:pb-16 max-w-6xl relative flex-wrap flex gap-20 sm:gap-8 items-center justify-center">
          {colorCards.map((colorCard) => (
            <ColorCard
              focused={focusedTitle === colorCard.title}
              onFocus={() => {
                setFocusedTitle(colorCard.title)
              }}
              key={colorCard.title}
              {...colorCard}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default AttirePage
