import { FC, useCallback } from "react"
import { useCuleContext } from "./CuleContext"
import { DrawArea } from "./DrawArea"
import { Coord } from "media-overlay-library"
import { SvgControl } from "./svgComponents/SvgControl"
import { LineStyle } from "../types"
import { uddEdge, uddNode } from "../firebase/operations"

export const CuleGraph: FC = () => {
  const { data } = useCuleContext()

  const addNewEdge = useCallback(
    (n1: number, n2: number) => {
      uddEdge({
        culeId: data.id,
        from: data.nodes[n1].id,
        to: data.nodes[n2].id,
        width: 1.5,
        style: LineStyle.solid,
      })
    },
    [data]
  )
  const addNewNode = useCallback(
    (position: Coord) => {
      uddNode({
        position,
        name: (Math.random() + 1).toString(36).substring(7),
        culeId: data.id,
        size: 5,
      })
    },
    [data]
  )
  return (
    <DrawArea>
      <SvgControl addEdge={addNewEdge} addNode={addNewNode} />
    </DrawArea>
  )
}
