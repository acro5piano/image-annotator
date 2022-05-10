import { useState, useEffect } from 'react'

function plain(s: string) {
  return s.replace('ctrl.', '').replace('meta.', '').replace('shift.', '')
}

export function useKeyPress(
  keys: string[],
  callback: (event: KeyboardEvent) => void,
) {
  const [inputing, setInputing] = useState(false)

  useEffect(() => {
    const handler = () => {
      setInputing((st) => !st)
    }
    document.addEventListener('focusin', handler)
    document.addEventListener('focusout', handler)
    return () => {
      document.removeEventListener('focusin', handler)
      document.removeEventListener('focusout', handler)
    }
  }, [])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (inputing) {
        return
      }
      keys.some((key) => {
        if (
          (key.includes('ctrl') && !event.ctrlKey) ||
          (!key.includes('ctrl') && event.ctrlKey) ||
          (key.includes('meta') && !event.metaKey && !event.altKey) ||
          (!key.includes('meta') && (event.metaKey || event.altKey)) ||
          (key.includes('shift') && !event.shiftKey) ||
          (!key.includes('shift') && event.shiftKey) ||
          (!key.includes('shift') && event.shiftKey) ||
          plain(key) !== event.key
        ) {
          return false
        }
        callback(event)
        return true
      })
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [keys, callback, inputing])
}
