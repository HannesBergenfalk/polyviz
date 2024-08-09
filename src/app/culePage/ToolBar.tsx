import {
  Paper,
  SvgIcon,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  styled,
  alpha,
  ToggleButtonProps,
} from "@mui/material"
import { FC } from "react"
import { useCuleContext } from "./CuleContext"
import { Mode } from "../types"

const AddNodeIcon: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m11 21l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4t-1.225-2.175T1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.55T11 5.1q.85-1 2.025-1.55T15.5 3q2.025 0 3.4 1.138T20.775 7H18.65q-.45-1-1.325-1.5T15.5 5q-1.275 0-2.2.688T11.575 7.5h-1.15Q9.65 6.375 8.662 5.688T6.5 5q-1.425 0-2.463.988T3 8.474q0 .825.35 1.675t1.25 1.963t2.45 2.6T11 18.3q.65-.575 1.525-1.325t1.4-1.25l.225.225l.488.488l.487.487l.225.225q-.55.5-1.4 1.238t-1.5 1.312zm7-4v-3h-3v-2h3V9h2v3h3v2h-3v3z"
      ></path>
    </svg>
  </SvgIcon>
)

const EditIcon: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.952 3.048a3.58 3.58 0 0 0-5.06 0L3.94 15a3.1 3.1 0 0 0-.825 1.476L2.02 21.078a.75.75 0 0 0 .904.903l4.601-1.096a3.1 3.1 0 0 0 1.477-.825l11.95-11.95a3.58 3.58 0 0 0 0-5.06m-4 1.06a2.078 2.078 0 1 1 2.94 2.94L19 7.939L16.06 5zM15 6.062L17.94 9l-10 10c-.21.21-.474.357-.763.426l-3.416.814l.813-3.416c.069-.29.217-.554.427-.764z"
      ></path>
    </svg>
  </SvgIcon>
)

const GoldButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => {
  const gold = theme.palette.augmentColor({
    color: {
      main: "#fcbd00",
    },
    name: "gold",
  })
  return {
    "&.Mui-selected": {
      color: gold.contrastText,
      backgroundColor: gold.main,
      "&:hover": {
        backgroundColor: alpha(gold.main, 0.8),
      },
    },
    "&:hover": {
      backgroundColor: alpha(gold.main, 0.8),
    },
  }
})

export const ToolBar: FC = () => {
  const { state, update } = useCuleContext()

  const handleSet = (_event, newValue: number) => {
    if (newValue !== null) {
      update.setActiveMode(newValue)
    }
  }
  return (
    <Box sx={{ position: "absolute", bottom: 40, left: 20 }}>
      <Paper elevation={3}>
        <ToggleButtonGroup
          value={state.activeMode}
          exclusive
          onChange={handleSet}
        >
          <GoldButton value={Mode.add}>
            <AddNodeIcon />
          </GoldButton>
          <GoldButton value={Mode.edit}>
            <EditIcon />
          </GoldButton>
        </ToggleButtonGroup>
      </Paper>
    </Box>
  )
}

/*
GraphIcon
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M200 152a31.84 31.84 0 0 0-19.53 6.68l-23.11-18A31.65 31.65 0 0 0 160 128c0-.74 0-1.48-.08-2.21l13.23-4.41A32 32 0 1 0 168 104c0 .74 0 1.48.08 2.21l-13.23 4.41A32 32 0 0 0 128 96a32.6 32.6 0 0 0-5.27.44L115.89 81A32 32 0 1 0 96 88a32.6 32.6 0 0 0 5.27-.44l6.84 15.4a31.92 31.92 0 0 0-8.57 39.64l-25.71 22.84a32.06 32.06 0 1 0 10.63 12l25.71-22.84a31.91 31.91 0 0 0 37.36-1.24l23.11 18A31.65 31.65 0 0 0 168 184a32 32 0 1 0 32-32m0-64a16 16 0 1 1-16 16a16 16 0 0 1 16-16M80 56a16 16 0 1 1 16 16a16 16 0 0 1-16-16M56 208a16 16 0 1 1 16-16a16 16 0 0 1-16 16m56-80a16 16 0 1 1 16 16a16 16 0 0 1-16-16m88 72a16 16 0 1 1 16-16a16 16 0 0 1-16 16"></path></svg>

*/
