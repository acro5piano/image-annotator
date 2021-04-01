import { useEffect, useState } from 'react'

export function useOnPasteImage(callback?: (img: HTMLImageElement) => any) {
  const [image, setImage] = useState<HTMLImageElement>(new Image())

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const file = event?.clipboardData?.items[0]?.getAsFile()
      if (!file) {
        return
      }

      // Create an image to render the blob on the canvas
      const img = new Image()

      // Once the image loads, render the img on the canvas
      img.onload = function () {
        // Draw the image
        setImage(img)
        if (callback) {
          callback(img)
        }
      }

      // Creates a DOMString containing a URL representing the object given in the parameter
      // namely the original Blob
      img.src = URL.createObjectURL(file)
    }

    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [callback])

  return image
}
