export function hexToRGBA(hex: string) {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 1 + ')'
}

export function rgba2hex(orig: string) {
  let a

  const rgb = orig
    .replace(/\s/g, '')
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)

  const alpha = ((rgb && rgb[4]) || '').trim()

  let hex = rgb
    ? // @ts-ignore
      (rgb[1] | (1 << 8)).toString(16).slice(1) +
      // @ts-ignore
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      // @ts-ignore
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : orig

  if (alpha !== '') {
    a = alpha
  } else {
    // @ts-ignore
    a = 1
  }

  // multiply before convert to HEX
  // @ts-ignore
  a = ((a * 255) | (1 << 8)).toString(16).slice(1)
  hex = hex + a

  hex = '0x' + hex.substring(0, 6)

  return hex
}
