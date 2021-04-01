import { useEffect, useRef, useState } from 'react'
import { useCanvasContext } from './hooks/useCanvasContext'
import { useOnPasteImage } from './hooks/useOnPasteImage'
import { useKeyPress } from 'ahooks'

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = 'red'
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

interface CanvasElement {
  x: number
  y: number
}

interface Rectangle extends CanvasElement {
  w: number
  h: number
}

interface Text extends CanvasElement {
  content: string
}

function isRectangle(e: any): e is Rectangle {
  return e.w !== undefined
}

type RenderedElement = Rectangle | Text

const DEFAULT_DIFF = 20

export function Canvas() {
  const canvasRef = useRef<any>(null)
  const [elements, setElements] = useState<RenderedElement[]>([])
  const [focusedRectangleIndex, setFocusedRectangleIndex] = useState(0)

  const img = useOnPasteImage((img: HTMLImageElement) => {
    const ctx = getContext()
    const canvas = canvasRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    canvas.width = img.width
    canvas.height = img.height
  })

  useEffect(() => {
    const ctx = getContext()
    const canvas = canvasRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    for (const element of elements) {
      if (isRectangle(element)) {
        roundedRect(ctx, element.x, element.y, element.w, element.h, 3)
      }
    }
  }, [elements, img])

  useKeyPress('r', () => {
    const { width, height } = canvasRef.current
    setElements([
      ...elements,
      {
        x: width / 3,
        y: height / 3,
        w: width / 3,
        h: height / 3,
      },
    ])
  })

  useKeyPress('j', () => {
    setFocusedRectangleIndex(
      Math.min(elements.length, focusedRectangleIndex + 1),
    )
  })

  useKeyPress('k', () => {
    setFocusedRectangleIndex(
      Math.min(elements.length, focusedRectangleIndex - 1),
    )
  })

  useKeyPress(['ctrl.f', 'right', 'l'], (event) => {
    if (event.shiftKey) {
      return
    }
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex
          ? {
              ...element,
              x: element.x + DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.n', 'down', 'n'], (event) => {
    if (event.shiftKey) {
      return
    }
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex
          ? {
              ...element,
              y: element.y + DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.b', 'left', 'b'], (event) => {
    if (event.shiftKey) {
      return
    }
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex
          ? {
              ...element,
              x: element.x - DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.p', 'up', 'p'], (event) => {
    if (event.shiftKey) {
      return
    }
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex
          ? {
              ...element,
              y: element.y - DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.a', 'home', '0'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex
          ? {
              ...element,
              x: 0,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.e', 'end', '$'], () => {
    const { width } = canvasRef.current
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex && isRectangle(element)
          ? {
              ...element,
              x: width - element.w,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.left'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex && isRectangle(element)
          ? {
              ...element,
              w: element.w - DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.right'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex && isRectangle(element)
          ? {
              ...element,
              w: element.w + DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.up'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex && isRectangle(element)
          ? {
              ...element,
              h: element.h - DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.down'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedRectangleIndex && isRectangle(element)
          ? {
              ...element,
              h: element.h + DEFAULT_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.c'], () => {
    const canvas = canvasRef.current

    // This works only on chrome?
    canvas.toBlob((blob: any) => {
      // @ts-ignore
      const item = new ClipboardItem({ 'image/png': blob })
      // @ts-ignore
      navigator.clipboard.write([item])
    })
  })

  const getContext = useCanvasContext(canvasRef)

  return <canvas ref={canvasRef} />
}
