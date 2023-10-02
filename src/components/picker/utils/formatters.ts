import { config } from '../constants'
import { gradientParser } from './gradientParser'

const { defaultGradient } = config

type Color = {
  value: string
}

export const low = (color: Color) => {
  return color.value.toLowerCase()
}

export const high = (color: Color) => {
  return color.value.toUpperCase()
}

export const getColors = (value: string) => {
  let isGradient = value?.includes('gradient')
  if (isGradient) {
    let isConic = value?.includes('conic')
    let safeValue = !isConic ? value : defaultGradient
    if (isConic) {
      console.log('Sorry we cant handle conic gradients yet')
    }
    const obj = gradientParser(safeValue);
    return obj?.colorStops
  } else {
    return [{ value }]
  }
}

export const formatInputValues = (value: number, min:  number, max: number) => {
  return isNaN(value) ? min : value < min ? min : value > max ? max : value
}
