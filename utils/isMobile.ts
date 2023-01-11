import { useWindowSize } from './useWindowSize'

const mobileWidth = 640 // sm breakpoint tailwindcss

export function useIsMobile() {
  const { width } = useWindowSize()

  const isMobile = width && width <= mobileWidth

  return isMobile
}
