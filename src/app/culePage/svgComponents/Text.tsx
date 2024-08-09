import { Coord } from "media-overlay-library"
import { FC } from "react"

interface TextProps {
  position: Coord
  content: string
}

export const Text: FC<TextProps> = ({ position, content }) => {
  return (
    <text
      x={position[0]}
      y={position[1]}
      textAnchor="middle"
      alignmentBaseline="middle"
      pointerEvents="none"
      style={{
        fontFamily: "Arial",
        userSelect: "none",
      }}
    >
      {content}
    </text>
  )
}
