import { Backdrop, Popover } from "@mui/material"
import { FC, PropsWithChildren } from "react"

interface CenterPopUpProps {
  readonly open: boolean
  readonly close: VoidFunction
}
export const CenterPopUp: FC<PropsWithChildren<CenterPopUpProps>> = ({
  children,
  open,
  close,
}) => {
  return (
    <Backdrop open={open}>
      <Popover
        id={"add"}
        open={open}
        anchorEl={document.getElementById("app")}
        onClose={close}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        {children}
      </Popover>
    </Backdrop>
  )
}
