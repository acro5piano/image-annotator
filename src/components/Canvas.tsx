import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorageState } from 'ahooks'
import { useCanvasContext } from '../hooks/useCanvasContext'
import { useOnPasteImage } from '../hooks/useOnPasteImage'
import { useKeyPress } from '../hooks/useKeyPress'
import { getElementDimension, drawRoundedRect, drawText } from '../utils/canvas'
import { Popover } from './Popover'
import * as t from '../types'

const DEFAULT_SMALL_DIFF = 10
const DEFAULT_LARGE_DIFF = 30
const DEFAULT_RECT_ROUND = 3

export function Canvas() {
  const canvasRef = useRef<any>(null)
  const [elements, setElements] = useState<t.RenderedElement[]>([])
  const [focusedElementIndex, setFocsedElementIndex] = useState(0)
  const [isFocus, setIsFocus] = useState(false)
  const [isInputVisilble, setIsInputVisible] = useState(false)
  const [isPasted, setIsPasted] = useState(false)
  const [copied, setCopied] = useState(false)

  // TODO: make them configurable
  const [smallDiff = DEFAULT_SMALL_DIFF] = useLocalStorageState(
    'ia:smallDiff',
    DEFAULT_SMALL_DIFF,
  )
  const [largeDiff = DEFAULT_LARGE_DIFF] = useLocalStorageState(
    'ia:largeDiff',
    DEFAULT_LARGE_DIFF,
  )

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
      if (t.isText(focusedElement)) {
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
        fontSize: 36,
      },
    ])
    setFocsedElementIndex(elements.length)
    setIsFocus(true)
    setTimeout(() => {
      setIsInputVisible(true)
    }, 10)
  })

  useKeyPress(['Escape'], () => {
    setIsFocus(false)
  })

  useKeyPress(['Enter', 'Return', 'i'], () => {
    setIsFocus(true)
    const focusedElement = elements[focusedElementIndex]
    if (t.isText(focusedElement)) {
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

  useKeyPress(['shift.>', 'ctrl.shift.>'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isText(element)
          ? {
              ...element,
              fontSize: element.fontSize + 2,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.<', 'ctrl.shift.<'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isText(element)
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
              x: element.x + smallDiff,
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
              x: element.x - smallDiff,
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
              y: element.y + smallDiff,
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
              y: element.y - smallDiff,
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
              x: element.x + largeDiff,
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
              x: element.x - largeDiff,
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
              y: element.y + largeDiff,
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
              y: element.y - largeDiff,
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
        idx === focusedElementIndex
          ? {
              ...element,
              x: width - getElementDimension(element).w,
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
              y: 20,
            }
          : element,
      ),
    )
  })

  useKeyPress(['G', 'ctrl.meta.e', 'ctrl.End'], () => {
    const { height } = canvasRef.current
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex
          ? {
              ...element,
              y: height - getElementDimension(element).h,
            }
          : element,
      ),
    )
  })

  useKeyPress(['d', 'ctrl.h', 'x', 'Backspace', 'Delete'], () => {
    if (isFocus) {
      setElements(elements.filter((_, idx) => idx !== focusedElementIndex))
      setFocsedElementIndex(focusedElementIndex - 1)
    }
  })

  useKeyPress(['shift.L', 'shift.ArrowRight'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              w: element.w + largeDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.H', 'shift.ArrowLeft'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              w: element.w - largeDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.K', 'shift.ArrowUp'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              h: element.h - largeDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['shift.J', 'shift.ArrowDown'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              h: element.h + largeDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowRight'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              w: element.w + smallDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowLeft'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              w: element.w - smallDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowUp'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              h: element.h - smallDiff,
            }
          : element,
      ),
    )
  })

  useKeyPress(['ctrl.shift.ArrowDown'], () => {
    setElements(
      elements.map((element, idx) =>
        idx === focusedElementIndex && t.isRectangle(element)
          ? {
              ...element,
              h: element.h + smallDiff,
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
      if (t.isRectangle(element)) {
        drawRoundedRect(
          ctx,
          element.x,
          element.y,
          element.w,
          element.h,
          DEFAULT_RECT_ROUND,
          isFocus && index === focusedElementIndex,
        )
      }
      if (t.isText(element)) {
        drawText(
          ctx,
          element.x,
          element.y,
          element.fontSize,
          element.content,
          isFocus && index === focusedElementIndex,
        )
      }
    })
  }, [elements, img, focusedElementIndex, isFocus, getContext])

  return (
    <>
      <canvas ref={canvasRef} className="canvas" />
      {!isPasted && (
        <div className="border border-gray-400 bg-white flex justify-center items-center rounded paste-image-here">
          <span>Please paste image to start (Ctrl + V)</span>
        </div>
      )}
      {isInputVisilble && (
        <form onSubmit={onSubmit}>
          <input onChange={onChangeText} autoFocus />
        </form>
      )}
      <Popover visible={copied} message="Copied to clipboard" />
    </>
  )
}
