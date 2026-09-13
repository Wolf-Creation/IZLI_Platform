import { useEffect, useState, type RefObject } from 'react'

export interface ParallaxPoint {
  x: number
  y: number
}

export function useHeroParallax<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [point, setPoint] = useState<ParallaxPoint>({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const maxDistance = 8
    const ease = 0.09
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      current.x += (target.x - current.x) * ease
      current.y += (target.y - current.y) * ease

      setPoint({ x: current.x, y: current.y })

      if (Math.abs(target.x - current.x) > 0.04 || Math.abs(target.y - current.y) > 0.04) {
        frame = window.requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect()
      const normalizedX = rect.width ? (clientX - rect.left) / rect.width - 0.5 : 0
      const normalizedY = rect.height ? (clientY - rect.top) / rect.height - 0.5 : 0

      target.x = normalizedX * maxDistance
      target.y = normalizedY * maxDistance

      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => updateTarget(event.clientX, event.clientY)
    const onPointerLeave = () => {
      target.x = 0
      target.y = 0
      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)

    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ref])

  return point
}