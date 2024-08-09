import { Coord } from 'media-overlay-library'
import {
  PointerEventHandler,
  PointerEvent as PointerEventReact,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface DraggableEvent {
  readonly name: string | null
  readonly vector: Coord
  readonly relativeOrigin: Coord
  readonly clientTo?: Coord
}

export type DraggableHandler = (e: DraggableEvent, ended: boolean) => void

export interface DraggableControls {
  readonly start: PointerEventHandler<SVGElement>
  /**
   * A function to register a draggable event listener. The
   * draggable event contains the name and translation vector
   * of the dragged element (provided a `name` attribute was
   * set).
   */
  readonly subscribe: (subscriber: DraggableHandler) => void
  /**
   * A function to unregister the draggable event listener.
   */
  readonly unsubscribe: VoidFunction
}

/**
 * useDraggable
 *
 * A hook which provides a convenient way to subscribe to
 * the translation vector when starting to drag an element.
 */
export function useDraggable(): DraggableControls {
  const [origin, setOrigin] = useState<Coord | null>(null)
  const [relOrigin, setRelOrigin] = useState<Coord | null>(null)

  const __translationName = useRef<string | null>(null)
  const __translationVector = useRef<Coord>([0, 0])
  const __clientTo = useRef<Coord>()
  const __translationSubscriber = useRef<DraggableHandler>()

  const subscribe = useCallback((subscriber: DraggableHandler) => {
    __translationSubscriber.current = subscriber
  }, [])

  const unsubscribe = useCallback(() => {
    __translationSubscriber.current = undefined
    __translationName.current === null
    __translationVector.current = [0, 0]
    setOrigin(null)
  }, [])

  const start = useCallback((e: PointerEventReact<SVGElement>) => {
    e.stopPropagation()
    const name = (e.target as SVGElement).getAttribute('name')
    if (name === null) {
      console.error(`${useDraggable.name}: 'name' attribute missing on element`)
    }
    setOrigin([e.pageX, e.pageY])
    setRelOrigin([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
    __translationName.current = name
  }, [])

  useEffect(() => {
    if (origin !== null) {
      const [originX, originY] = origin
      const emitTranslationEvent = (ended: boolean) => {
        if (__translationSubscriber.current === undefined) {
          console.error(`${useDraggable.name}: 'missing subscriber function'`)
          return
        }
        __translationSubscriber.current(
          {
            name: __translationName.current,
            vector: __translationVector.current,
            relativeOrigin: relOrigin,
            clientTo: __clientTo.current
          },
          ended
        )
      }
      const updatePointerTranslation = (e: PointerEvent) => {
        __translationVector.current = [e.pageX - originX, e.pageY - originY]
        __clientTo.current = [e.clientX, e.clientY]
        emitTranslationEvent(false)
      }

      const blockTouch = (e: TouchEvent) => {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
      const endTranslation = () => {
        setOrigin(null)
        emitTranslationEvent(true)
      }
      document.addEventListener('pointermove', updatePointerTranslation)
      document.addEventListener('touchmove', blockTouch, { passive: false })
      document.addEventListener('pointerup', endTranslation)
      document.addEventListener('touchend', endTranslation)
      return () => {
        document.removeEventListener('pointermove', updatePointerTranslation)
        document.removeEventListener('touchmove', blockTouch)
        document.removeEventListener('pointerup', endTranslation)
        document.removeEventListener('touchend', endTranslation)
      }
    }
  }, [origin, relOrigin])

  return { subscribe, unsubscribe, start }
}
