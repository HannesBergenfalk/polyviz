import { Coord, FoundationContext } from "media-overlay-library"
import { FC, SVGAttributes, useEffect, useState } from "react"
import { Text } from "./Text"
import { useCuleContext } from "../CuleContext"

interface CircleProps {
  position: Coord
  name: string
  label: string
  size: number
  majorAxis: number
}

export const Circle: FC<SVGAttributes<SVGCircleElement> & CircleProps> = ({
  position,
  label,
  name,
  majorAxis,
  size,
  ...rest
}) => {
  const {
    state: { nodeSizeOveride, elementToEdit },
  } = useCuleContext()
  const [radius, setRadius] = useState((size / 200) * majorAxis)
  useEffect(() => {
    setRadius((size / 200) * majorAxis)
  }, [size, majorAxis])
  useEffect(() => {
    if (
      elementToEdit !== null &&
      elementToEdit.getAttribute("name") === name &&
      nodeSizeOveride !== null
    ) {
      setRadius((nodeSizeOveride / 200) * majorAxis)
    }
  }, [nodeSizeOveride, elementToEdit, majorAxis])

  return (
    <>
      <circle
        {...rest}
        r={radius}
        name={name}
        cx={position[0]}
        cy={position[1]}
        fill={"white"}
        stroke={"black"}
        strokeWidth={2}
      />
      <Text position={position} content={label} />
    </>
  )
}
