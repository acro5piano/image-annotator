import { useCallback, useRef, useState } from 'react'

export function useHistory<T>(initialState: T) {
  const [state, setStateInternal] = useState(initialState)
  const historyRef = useRef<T[]>([initialState])
  const pointerRef = useRef(0)

  const setState = useCallback((updater: T | ((prev: T) => T)) => {
    setStateInternal((prev) => {
      const next =
        typeof updater === 'function'
          ? (updater as (prev: T) => T)(prev)
          : updater
      historyRef.current = historyRef.current.slice(
        0,
        pointerRef.current + 1,
      )
      historyRef.current.push(next)
      pointerRef.current = historyRef.current.length - 1
      return next
    })
  }, [])

  const undo = useCallback((): T | null => {
    if (pointerRef.current > 0) {
      pointerRef.current--
      const prev = historyRef.current[pointerRef.current]!
      setStateInternal(prev)
      return prev
    }
    return null
  }, [])

  const redo = useCallback((): T | null => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current++
      const next = historyRef.current[pointerRef.current]!
      setStateInternal(next)
      return next
    }
    return null
  }, [])

  return [state, setState, undo, redo] as const
}
