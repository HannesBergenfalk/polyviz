import { SvgIcon, styled } from "@mui/material"
import { FC, useCallback } from "react"
import { useCuleContext } from "./CuleContext"
import Fab from "@mui/material/Fab"
import { buildGraph } from "./graphviz/buildGraph"
import { parseGraph } from "./graphviz/parseGraph"
import { bulkUpdateNodes } from "../firebase/operations"

const GraphIcon: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M200 152a31.84 31.84 0 0 0-19.53 6.68l-23.11-18A31.65 31.65 0 0 0 160 128c0-.74 0-1.48-.08-2.21l13.23-4.41A32 32 0 1 0 168 104c0 .74 0 1.48.08 2.21l-13.23 4.41A32 32 0 0 0 128 96a32.6 32.6 0 0 0-5.27.44L115.89 81A32 32 0 1 0 96 88a32.6 32.6 0 0 0 5.27-.44l6.84 15.4a31.92 31.92 0 0 0-8.57 39.64l-25.71 22.84a32.06 32.06 0 1 0 10.63 12l25.71-22.84a31.91 31.91 0 0 0 37.36-1.24l23.11 18A31.65 31.65 0 0 0 168 184a32 32 0 1 0 32-32m0-64a16 16 0 1 1-16 16a16 16 0 0 1 16-16M80 56a16 16 0 1 1 16 16a16 16 0 0 1-16-16M56 208a16 16 0 1 1 16-16a16 16 0 0 1-16 16m56-80a16 16 0 1 1 16 16a16 16 0 0 1-16-16m88 72a16 16 0 1 1 16-16a16 16 0 0 1-16 16"
      ></path>
    </svg>
  </SvgIcon>
)

const RefreshIcon: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M88 104H40a8 8 0 0 1-8-8V48a8 8 0 0 1 16 0v28.69l14.63-14.63A95.43 95.43 0 0 1 130 33.94h.53a95.36 95.36 0 0 1 67.07 27.33a8 8 0 0 1-11.18 11.44a79.52 79.52 0 0 0-55.89-22.77h-.45a79.56 79.56 0 0 0-56.14 23.43L59.31 88H88a8 8 0 0 1 0 16m128 48h-48a8 8 0 0 0 0 16h28.69l-14.63 14.63a79.56 79.56 0 0 1-56.13 23.43h-.45a79.52 79.52 0 0 1-55.89-22.77a8 8 0 1 0-11.18 11.44a95.36 95.36 0 0 0 67.07 27.33h.52a95.43 95.43 0 0 0 67.36-28.12L208 179.31V208a8 8 0 0 0 16 0v-48a8 8 0 0 0-8-8"
      ></path>
    </svg>
  </SvgIcon>
)

const PurpleFab = styled(Fab)(({ theme }) => {
  const purple = theme.palette.augmentColor({
    color: {
      main: "#340C46",
    },
    name: "purple",
  })
  return {
    backgroundColor: purple.light,
    color: purple.contrastText,
    "&:hover": {
      backgroundColor: purple.main,
    },
  }
})

export const AutoGraphButton: FC = () => {
  const { data } = useCuleContext()
  const onClick = useCallback(async () => {
    const seed = Math.round(Math.random() * 10)
    const res = await parseGraph(buildGraph(data, seed))
    bulkUpdateNodes(
      data.id,
      data.nodes.map((n, i) => ({
        ...n,
        position: res[n.id][0],
        size: res[n.id][1],
      }))
    )
  }, [data])
  return (
    <PurpleFab
      onClick={onClick}
      variant={"extended"}
      sx={{ position: "absolute", bottom: 40, right: 20 }}
    >
      <GraphIcon />
      <RefreshIcon />
    </PurpleFab>
  )
}
