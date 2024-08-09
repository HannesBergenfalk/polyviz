import {
  Coord,
  CoordArray,
  FoundationContext,
  LinerContext,
} from "media-overlay-library"
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  PointerEvent as PointerEventReact,
  useMemo,
} from "react"
import { Circle } from "./Circle"
import { Line } from "./Line"
import { useDraggable, DraggableHandler } from "./useDraggable"
import { Mode } from "../../types"
import { useCuleContext } from "../CuleContext"
import { Text } from "./Text"
import { uddNode } from "../../firebase/operations"

interface SvgControlProps {
  addEdge: (n1: number, n2: number) => void
  addNode: (position: Coord) => void
}
export const SvgControl: FC<SvgControlProps> = ({ addEdge, addNode }) => {
  const {
    data: { nodes, edges, id },
    state: { activeMode },
    update: { setElementToEdit, setNewNodePosition },
  } = useCuleContext()
  const { toSvgBasis, toUserBasis } = useContext(FoundationContext)
  const [newEdge, setNewEdge] = useState<readonly [Coord, Coord]>()
  const newEdgeStart = useRef<number>()
  const newEdgeEnd = useRef<number>()

  const pendingEdit = useRef<SVGElement | null>(null)

  const transformRef = useRef(toSvgBasis)
  const { areaBBox } = useContext(LinerContext)
  const lastWidth = useRef(areaBBox.width)
  const lastHeight = useRef(areaBBox.height)
  const majorAxis =
    areaBBox.height > areaBBox.width ? areaBBox.height : areaBBox.width

  const [svgPoints, setSvgPoints] = useState<CoordArray>(
    nodes.map((n) => toSvgBasis(n.position))
  )

  const relativeEdges = useMemo(() => {
    const indexMap = nodes.reduce((acc, node, index) => {
      acc[node.id] = index
      return acc
    }, {})
    return edges.map((e) => ({
      ...e,
      start: indexMap[e.from],
      end: indexMap[e.to],
    }))
  }, [nodes, edges])
  const { subscribe, unsubscribe, start } = useDraggable()

  const updateNodePosition = useCallback(
    (pos: Coord, index: number) => {
      const currentNode = nodes[index]
      console.log(currentNode)
      uddNode({ ...currentNode, culeId: id, position: pos })
    },
    [nodes, id]
  )

  useEffect(() => {
    setSvgPoints(nodes.map((n) => transformRef.current(n.position)))
  }, [nodes])
  useEffect(() => {
    const co = document.getElementsByName("container")[0]
    const blockTouch = (e: TouchEvent) => {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    if (co !== null && co !== undefined) {
      co.addEventListener("touchstart", blockTouch, { passive: false })
      return () => co.removeEventListener("touchstart", blockTouch)
    }
    console.log("Wring!")
  }, [])
  useEffect(() => {
    if (
      areaBBox.width !== lastWidth.current ||
      areaBBox.height !== lastHeight.current
    ) {
      transformRef.current = toSvgBasis
      setSvgPoints(nodes.map((n) => transformRef.current(n.position)))
      lastWidth.current = areaBBox.width
      lastHeight.current = areaBBox.height
    }
  }, [areaBBox, toSvgBasis])
  useEffect(() => {
    const updatePos: DraggableHandler = (
      { name, vector, relativeOrigin, clientTo },
      ended
    ) => {
      if (name === null) {
        return
      }
      const [tx, ty] = vector
      if (tx ** 2 + ty ** 2 < 2) {
        if (ended) {
          setElementToEdit(pendingEdit.current)
        }
        return
      }
      if (activeMode === Mode.edit) {
        const index = parseInt(name.slice(1))

        const nextPoints = nodes
          .map((n) => toSvgBasis(n.position))
          .map((p, i): Coord => (i === index ? [p[0] + tx, p[1] + ty] : p))
        if (ended) {
          pendingEdit.current = null
          updateNodePosition(toUserBasis(nextPoints[index]), index)
        }
        setSvgPoints(nextPoints)
      }
      if (activeMode === Mode.add) {
        const [ox, oy] = relativeOrigin
        const pos: Coord = [ox + tx, oy + ty]
        if (clientTo !== undefined) {
          const [clientX, clientY] = clientTo
          const elements = document.elementsFromPoint(clientX, clientY)
          let elementName = null
          for (let i = 0; i < elements.length; i++) {
            elementName = elements[i].getAttribute("name")
            if (
              elementName !== null &&
              elementName !== name &&
              elementName.startsWith("n")
            ) {
              break
            }
            if (elementName === "container") {
              elementName = null
              break
            }
          }
          if (elementName !== null) {
            const targetIndex = parseInt(elementName.slice(1))
            newEdgeEnd.current = targetIndex
          } else {
            newEdgeEnd.current = undefined
          }
        }
        if (ended) {
          setNewEdge(undefined)
          if (
            newEdgeEnd.current !== undefined &&
            newEdgeStart.current !== undefined
          ) {
            addEdge(newEdgeStart.current, newEdgeEnd.current)
          }
          newEdgeStart.current = undefined
          newEdgeEnd.current = undefined
          return
        }
        setNewEdge([relativeOrigin, pos])
      }
    }

    subscribe(updatePos)
    return () => unsubscribe()
  }, [
    toSvgBasis,
    subscribe,
    unsubscribe,
    toUserBasis,
    activeMode,
    addEdge,
    nodes,
  ])

  const pointerDownBackground = useCallback(
    (e: PointerEventReact<SVGElement>) => {
      const targetName = (e.target as SVGElement)?.getAttribute("name")
      if (targetName === null || targetName === undefined) {
        return
      }
      if (activeMode === Mode.add && targetName === "background") {
        setNewNodePosition(
          toUserBasis([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
        )
        // uncomment for fast mode
        //addNode(toUserBasis([e.nativeEvent.offsetX, e.nativeEvent.offsetY]))
        return
      }
      if (targetName.startsWith("n")) {
        start(e)
        if (activeMode === Mode.edit) {
          pendingEdit.current = e.target as SVGElement
        } else {
          const nodeIndex = parseInt(targetName.slice(1))
          newEdgeStart.current = nodeIndex
        }
      }
      if (targetName.startsWith("e") && activeMode === Mode.edit) {
        setElementToEdit(e.target as SVGElement)
      }
    },
    [activeMode, addNode, toUserBasis]
  )

  return (
    <g name="container" onPointerDown={pointerDownBackground}>
      <rect
        {...areaBBox}
        fillOpacity={0}
        name="background"
        id="backgroundrect"
      />
      {relativeEdges.map((edge, index) => (
        <Line
          key={index}
          p1={svgPoints[edge.start]}
          p2={svgPoints[edge.end]}
          name={`e${edge.start}-${edge.end}`}
          label={edge.label}
          width={edge.width}
          style={edge.style}
        />
      ))}
      {svgPoints.map((point, index) => {
        const node = nodes[index]
        if (node === undefined) {
          return null
        }
        return (
          <Circle
            key={index}
            position={point}
            name={`n${index}`}
            label={node.name}
            size={node.size}
            majorAxis={majorAxis}
          />
        )
      })}
      {newEdge === undefined ? null : (
        <>
          <Line p1={newEdge[0]} p2={newEdge[1]} name={"inputEdge"} />
          <Text position={newEdge[0]} content="❤️" />
          {newEdgeEnd.current === undefined ? null : (
            <Text position={newEdge[1]} content="❤️" />
          )}
        </>
      )}
    </g>
  )
}
