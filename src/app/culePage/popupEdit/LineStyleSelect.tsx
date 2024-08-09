import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material"
import { FC } from "react"
import { LineStyle } from "../../types"

const LineIcon: FC<{ style: LineStyle }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="200px" viewBox="0 0 200 7">
    <line
      stroke="currentColor"
      strokeWidth={2}
      x1={2}
      x2={198}
      y1={3.5}
      y2={3.5}
      strokeDasharray={
        style === LineStyle.solid
          ? undefined
          : style === LineStyle.dashed
          ? "9 3"
          : "2 3"
      }
    />
  </svg>
)

interface LineStyleSelectProps {
  readonly value: LineStyle
  readonly setValue: (_: LineStyle) => void
}

export const LineStyleSelect: FC<LineStyleSelectProps> = ({
  value,
  setValue,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as LineStyle)
  }
  return (
    <Box>
      <Typography>Line style</Typography>
      <Select
        value={value.toString()}
        onChange={handleChange}
        size="small"
        color="secondary"
      >
        <MenuItem value={LineStyle.solid}>
          <LineIcon style={LineStyle.solid} />
        </MenuItem>
        <MenuItem value={LineStyle.dashed}>
          <LineIcon style={LineStyle.dashed} />
        </MenuItem>
        <MenuItem value={LineStyle.dotted}>
          <LineIcon style={LineStyle.dotted} />
        </MenuItem>
      </Select>
    </Box>
  )
}
