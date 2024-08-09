import { Slider, Box, Typography } from "@mui/material"
import { FC, useCallback } from "react"

interface SiderFieldProps {
  readonly value: number
  readonly setValue: (_: number) => void
  readonly label: string
  readonly min: number
  readonly max: number
  readonly step?: number
}

export const SliderField: FC<SiderFieldProps> = ({
  value,
  setValue,
  label,
  min,
  max,
  step,
}) => {
  const handleChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      setValue(newValue as number)
    },
    [setValue]
  )
  return (
    <Box>
      <Typography>{label}</Typography>
      <Slider
        color="secondary"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        size="small"
      />
    </Box>
  )
}
