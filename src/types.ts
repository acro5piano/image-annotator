export interface CanvasElement {
  x: number
  y: number
}

export interface Rectangle extends CanvasElement {
  w: number
  h: number
}

export interface Text extends CanvasElement {
  content: string
  fontSize: number
}

export function isRectangle(e: any): e is Rectangle {
  return e.w !== undefined
}

export function isText(e: any): e is Text {
  return e.content !== undefined
}

export type RenderedElement = Rectangle | Text
