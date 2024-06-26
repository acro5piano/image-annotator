import * as t from '../types'

import { getState } from '../store'

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  isFocused?: boolean,
) {
  const settings = getState().settings
  ctx.beginPath()
  ctx.lineWidth = 8
  ctx.strokeStyle = isFocused ? settings.secondaryColor : settings.primaryColor
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.arcTo(x, y + height, x + radius, y + height, radius)
  ctx.lineTo(x + width - radius, y + height)
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius)
  ctx.lineTo(x + width, y + radius)
  ctx.arcTo(x + width, y, x + width - radius, y, radius)
  ctx.lineTo(x + radius, y)
  ctx.arcTo(x, y, x, y + radius, radius)
  ctx.stroke()
}

export function drawFilledRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
) {
  ctx.fillStyle = fill
  // ctx.filter = 'blur(4px)'
  ctx.fillRect(x, y, width, height)
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  element: t.Arrow,
  isFocused?: boolean,
) {
  const settings = getState().settings
  const style = isFocused ? settings.secondaryColor : settings.primaryColor
  ctx.beginPath()
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  ctx.strokeStyle = style
  // @ts-ignore
  ctx.arrow(element.x, element.y, element.w, element.h, [0, 1, -10, 1, -15, 10])
  ctx.fill()
  ctx.stroke()
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  content: string,
  isFocused?: boolean,
) {
  const settings = getState().settings
  ctx.font = `bold ${fontSize}px sans`
  ctx.fillStyle = isFocused ? settings.secondaryColor : settings.primaryColor
  ctx.fillText(content, x, y)
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = fontSize / 37
  ctx.lineCap = 'round'
  ctx.strokeText(content, x, y)
}

export function getElementDimension(elm: t.RenderedElement) {
  if (t.isRectangle(elm)) {
    return { w: elm.w, h: elm.h }
  }
  if (t.isText(elm)) {
    return { w: elm.content.length * elm.fontSize, h: elm.fontSize }
  }

  throw new Error()
}
