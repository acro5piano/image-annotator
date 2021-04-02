import * as t from '../types'

const FOCUSED_COLOR = '#fb5211'
const ELEMENT_COLOR = '#e91e63'

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  isFocused?: boolean,
) {
  ctx.beginPath()
  ctx.lineWidth = 8
  ctx.strokeStyle = isFocused ? FOCUSED_COLOR : ELEMENT_COLOR
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

export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  content: string,
  isFocused?: boolean,
) {
  ctx.font = `bold ${fontSize}px sans-serif`
  ctx.fillStyle = isFocused ? FOCUSED_COLOR : ELEMENT_COLOR
  ctx.fillText(content, x, y)
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