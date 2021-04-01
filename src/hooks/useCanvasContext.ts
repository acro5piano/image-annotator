import { useCallback } from 'react'

export function useCanvasContext(canvasRef: any) {
  const getContext = useCallback(() => {
    return canvasRef.current.getContext('2d') as CanvasRenderingContext2D
  }, [canvasRef])
  return getContext
}
