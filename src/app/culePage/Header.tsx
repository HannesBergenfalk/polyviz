import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { FC, useCallback, useState } from "react"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined"
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined"
import { useCuleContext } from "./CuleContext"
import { Link as RouterLink } from "@tanstack/react-router"
import { CenterPopUp } from "../tools/CenterPopup"
import { Settings } from "./Settings"

export const Header: FC = () => {
  const {
    data: { title },
  } = useCuleContext()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const closeSettings = () => setSettingsOpen(false)
  const onPrint = useCallback(() => {
    window.print()
  }, [])

  const altPrint = useCallback(() => {
    const svgEl = document.getElementById("drawing")
      .children[0] as SVGSVGElement
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    const printString = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Print polycule</title>
        <style>
        body {
          display: flex;
          align-items: center;
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        </style>
      </head>
      <body>
      <div>
        ${svgEl.outerHTML}
        <div>
      </body>
    </html>`

    const hiddenFrame = document.createElement("iframe")
    hiddenFrame.srcdoc = printString
    document.body.appendChild(hiddenFrame)
    hiddenFrame.contentWindow.print()
    //document.body.removeChild(hiddenFrame)
  }, [])

  const onSave = useCallback(() => {
    const svgEl = document.getElementById("drawing")
      .children[0] as SVGSVGElement
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    const obj = svgEl.outerHTML
    const blob = new Blob([obj], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const vLink = document.createElement("a")
    vLink.href = url
    vLink.download = title
    vLink.click()
  }, [title])
  return (
    <AppBar position="fixed">
      <Toolbar variant="regular" sx={{ gap: 2 }}>
        <IconButton size="large" color="inherit" component={RouterLink} to="/">
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography
          variant={"h5"}
          sx={{ margin: "auto", textAlign: "center" }}
          fontFamily={"Tahoma"}
          letterSpacing={"0.05em"}
        >
          {title}
        </Typography>
        <IconButton size="large" color="inherit" onClick={onSave}>
          <SaveAltOutlinedIcon />
        </IconButton>
        <IconButton size="large" color="inherit" onClick={onPrint}>
          <PrintOutlinedIcon />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
          onClick={() => setSettingsOpen(true)}
        >
          <SettingsOutlinedIcon />
        </IconButton>
        <CenterPopUp open={settingsOpen} close={closeSettings}>
          <Settings close={closeSettings} />
        </CenterPopUp>
      </Toolbar>
    </AppBar>
  )
}
