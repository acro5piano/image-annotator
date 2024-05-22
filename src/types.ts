export interface CanvasElement {
  x: number
  y: number
}

export interface Rectangle extends CanvasElement {
  type: 'RECT'
  w: number
  h: number
}

export function isRectangle(e: any): e is Rectangle {
  return e.type === 'RECT'
}

export interface FilledRectangle extends CanvasElement {
  type: 'FILLED_RECT'
  w: number
  h: number
  fill: string
}

export function isFilledRectangle(e: any): e is FilledRectangle {
  return e.type === 'FILLED_RECT'
}

export interface Text extends CanvasElement {
  type: 'TEXT'
  content: string
  fontSize: number
}

export function isText(e: any): e is Text {
  return e.content !== undefined
}

export interface Arrow extends CanvasElement {
  type: 'ARROW'
  w: number
  h: number
}

export function isArrow(e: any): e is Arrow {
  return e.type === 'ARROW'
}

export function isAbleToResize(e: any): e is Rectangle {
  return isRectangle(e) || isArrow(e) || isFilledRectangle(e)
}

export type RenderedElement = Rectangle | Text | Arrow | FilledRectangle
