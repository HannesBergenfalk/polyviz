import { Coord, midPoints } from "media-overlay-library"
import { FC } from "react"
import { LineStyle } from "../../types"
import { useCuleContext } from "../CuleContext"

interface LineProps {
  p1: Coord
  p2: Coord
  name: string
  style?: LineStyle
  width?: number
  label?: string
}

export const Line: FC<LineProps> = ({
  p1,
  p2,
  name,
  width = 1.5,
  style = LineStyle.solid,
  label,
}) => {
  const {
    state: { edgeWidthOveride, elementToEdit },
  } = useCuleContext()
  const isFocus =
    elementToEdit !== null && elementToEdit.getAttribute("name") === name
  if (p1 === undefined || p2 === undefined) {
    console.warn("failed to draw edge", name)
    return null
  }
  const [midPoint] = midPoints([p1, p2])
  return (
    <>
      <line
        x1={p1[0]}
        y1={p1[1]}
        x2={p2[0]}
        y2={p2[1]}
        stroke={"black"}
        strokeWidth={
          isFocus && edgeWidthOveride !== null ? edgeWidthOveride : width
        }
        strokeDasharray={
          style === LineStyle.solid
            ? undefined
            : style === LineStyle.dashed
            ? "9 3"
            : "2 3"
        }
      />
      {label === undefined ? null : (
        <text
          x={midPoint[0]}
          y={midPoint[1]}
          textAnchor="middle"
          alignmentBaseline="middle"
          pointerEvents="none"
          stroke={"white"}
          strokeWidth={0.2}
          fontWeight={"bold"}
          fill={"black"}
          style={{
            userSelect: "none",
          }}
        >
          {label}
        </text>
      )}
      <line
        x1={p1[0]}
        y1={p1[1]}
        x2={p2[0]}
        y2={p2[1]}
        stroke={"black"}
        strokeOpacity={0}
        strokeWidth={20}
        name={name}
      />
    </>
  )
}
