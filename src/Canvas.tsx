import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useCanvasContext } from './hooks/useCanvasContext'
import { useOnPasteImage } from './hooks/useOnPasteImage'
import { useKeyPress } from './hooks/useKeyPress'

const FOCUSED_COLOR = '#fb5211'
const ELEMENT_COLOR = '#e91e63'

function roundedRect(
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
  fontSize: number
}

function isRectangle(e: any): e is Rectangle {
  return e.w !== undefined
}

function isText(e: any): e is Text {
  return e.content !== undefined
}

type RenderedElement = Rectangle | Text

const SMALL_DIFF = 10
const BIG_DIFF = 30

export function Canvas() {
  const canvasRef = useRef<any>(null)
  const [elements, setElements] = useState<RenderedElement[]>([])
  const [focusedElementIndex, setFocsedElementIndex] = useState(0)
  const [isFocus, setIsFocus] = useState(false)
  const [isInputVisilble, setIsInputVisible] = useState(false)
  const [isPasted, setIsPasted] = useState(false)
  const [copied, setCopied] = useState(false)

  const img = useOnPasteImage(() => {
    setIsPasted(true)
  })

  const onSubmit = useCallback((event: any) => {
    event.preventDefault()
    setIsInputVisible(false)
  }, [])

  const onChangeText = useCallback(
    (event: any) => {
      const focusedElement = elements[focusedElementIndex]
      if (isText(focusedElement)) {
        setElements(
          elements.map((element, idx) =>
            idx === focusedElementIndex
              ? {
                  ...element,
                  content: event.target.value,
                }
              : element,
          ),
        )
      }
    },
    [elements, focusedElementIndex],
  )

  useKeyPress(['ctrl.c'], () => {
    const canvas = canvasRef.current

    // This works only on the latest chrome?
    canvas.toBlob((blob: any) => {
      // @ts-ignore
      const item = new ClipboardItem({ 'image/png': blob })
      // @ts-ignore
      navigator.clipboard.write([item])

      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 4000)
    })
  })

  useKeyPress(['r'], () => {
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
    setFocsedElementIndex(elements.length)
    setIsFocus(true)
  })

  useKeyPress(['t'], () => {
    const { width, height } = canvasRef.current
    const focusedElement = elements[focusedElementIndex]
    let x = width / 3
    let y = height / 3
    if (focusedElement) {
      x = focusedElement.x
      y = focusedElement.y - 20
    }
    setElements([
      ...elements,
      {
        x,
        y,
        content: 'Content...',
        fontSize: 48,
      },
    ])
    setFocsedElementIndex(elements.length)
    setIsFocus(true)
  })

  useKeyPress(['Escape'], () => {
    setIsFocus(false)
  })

  useKeyPress(['Enter', 'Return', 'i'], () => {
    setIsFocus(true)
    const focusedElement = elements[focusedElementIndex]
    if (isText(focusedElement)) {
      // Adding delay prevents to inserting "i"
      setTimeout(() => {
        setIsInputVisible(true)
      }, 10)
    }
  })

  useKeyPress(['o'], () => {
    setIsFocus(true)
    if (focusedElementIndex === elements.length - 1) {
      setFocsedElementIndex(0)
    } else {
      setFocsedElementIndex(focusedElementIndex + 1)
    }
  })

  useKeyPress(['shift.>'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isText(element)
          ? {
              ...element,
              fontSize: element.fontSize + 2,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.<'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isText(element)
          ? {
              ...element,
              fontSize: Math.max(0, element.fontSize - 2),
            }
          : element,
      ),
    )
  })

  useKeyPress(['l', 'ctrl.ArrowRight'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              x: element.x + SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['h', 'ctrl.ArrowLeft'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              x: element.x - SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['j', 'ctrl.ArrowDown'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              y: element.y + SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['k', 'ctrl.ArrowUp'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              y: element.y - SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.f', 'ArrowRight'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              x: element.x + BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.b', 'ArrowLeft'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              x: element.x - BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.n', 'ArrowDown'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              y: element.y + BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.p', 'ArrowUp'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              y: element.y - BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['0', 'ctrl.a', 'Home'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              x: 0,
            }
          : element,
      ),
    )
  })

  useKeyPress(['$', 'ctrl.e', 'End'], () => {
    const { width } = canvasRef.current
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              x: width - element.w,
            }
          : element,
      ),
    )
  })

  useKeyPress(['g', 'ctrl.meta.a', 'ctrl.Home'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              y: 0,
            }
          : element,
      ),
    )
  })

  useKeyPress(['G', 'ctrl.meta.e', 'ctrl.End'], () => {
    const { height } = canvasRef.current
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              y: height - element.h,
            }
          : element,
      ),
    )
  })

  useKeyPress(['d', 'x', 'Backspace', 'Delete'], () => {
    if (isFocus) {
      setElements(elements.filter((_, idx) => idx !== focusedElementIndex))
    }
  })

  useKeyPress(['shift.L', 'shift.ArrowRight'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              w: element.w + BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.H', 'shift.ArrowLeft'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              w: element.w - BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.K', 'shift.ArrowUp'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              h: element.h - BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.J', 'shift.ArrowDown'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              h: element.h + BIG_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowRight'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              w: element.w + SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowLeft'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              w: element.w - SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowUp'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              h: element.h - SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowDown'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && isRectangle(element)
          ? {
              ...element,
              h: element.h + SMALL_DIFF,
            }
          : element,
      ),
    )
  })

  const getContext = useCanvasContext(canvasRef)

  useEffect(() => {
    const ctx = getContext()
    const canvas = canvasRef.current
    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    elements.forEach((element, index) => {
      if (isRectangle(element)) {
        roundedRect(
          ctx,
          element.x,
          element.y,
          element.w,
          element.h,
          3,
          isFocus && index === focusedElementIndex,
        )
      }
      if (isText(element)) {
        ctx.font = `bold ${element.fontSize}px sans-serif`
        ctx.fillStyle =
          isFocus && index === focusedElementIndex
            ? FOCUSED_COLOR
            : ELEMENT_COLOR
        ctx.fillText(element.content, element.x, element.y)
      }
    })
  }, [elements, img, focusedElementIndex, isFocus, getContext])

  return (
    <>
      <canvas ref={canvasRef} className="canvas" />
      {!isPasted && (
        <div className="border border-gray-400 bg-white flex justify-center items-center rounded paste-image-here">
          <span>Please paste image to edit</span>
        </div>
      )}
      {isInputVisilble && (
        <form onSubmit={onSubmit}>
          <input onChange={onChangeText} autoFocus />
        </form>
      )}
      <div
        className={clsx('fixed bottom-0 left-0 pb-2 pl-4 transition-all', {
          '-mb-12': !copied,
          'mb-0': copied,
        })}
      >
        <div
          className={clsx(
            'mx-auto bg-gray-900 text-white rounded py-4 px-8 transition-all',
            {
              '-mb-96': !copied,
            },
          )}
        >
          Copied to clipboard
        </div>
      </div>
    </>
  )
}
