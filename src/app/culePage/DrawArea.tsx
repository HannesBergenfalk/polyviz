import { Foundation, Liner } from "media-overlay-library"
import { FC, PropsWithChildren } from "react"
import { Box, useTheme, useMediaQuery } from "@mui/material"

export const DrawArea: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme()
  const big = useMediaQuery(theme.breakpoints.up("sm"))
  //const portrait = window.outerHeight > window.outerWidth
  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        height: big ? "calc(100vh - 64px)" : "calc(99vh - 100px)",
        width: "100vw",
        top: "64px", // media query?
        overflow: "hidden",
      }}
    >
      <Box>
        <Foundation
          userBasis={[
            [0, 0],
            [100, 100],
          ]}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
          }}
          id="drawing"
        >
          <Liner>{children}</Liner>
        </Foundation>
      </Box>
    </Box>
  )
}
