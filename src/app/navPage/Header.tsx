import { AppBar, Toolbar, Typography, styled } from "@mui/material"
import { FC } from "react"

const PurpleFab = styled(Typography)(({ theme }) => {
  const purple = theme.palette.augmentColor({
    color: {
      main: "#340C46",
    },
    name: "purple",
  })
  return {
    fontFamily: "Verdana Tahoma",
  }
})

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        <Typography
          variant={"h5"}
          sx={{ margin: "auto", textAlign: "center" }}
          fontFamily={"Verdana, Tahoma"}
          letterSpacing={"0.1em"}
        >
          Polyviz
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
