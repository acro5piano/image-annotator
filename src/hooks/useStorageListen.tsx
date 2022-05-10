import { useEffect } from 'react'
import { EventEmitter } from 'events'

const ee = new EventEmitter()

export function emit() {
  ee.emit('storage')
}

export const useStorageListen = (onChange: () => void) => {
  useEffect(() => {
    ee.on('storage', onChange)
    return () => {
      ee.off('storage', onChange)
    }
  }, [onChange])
}
