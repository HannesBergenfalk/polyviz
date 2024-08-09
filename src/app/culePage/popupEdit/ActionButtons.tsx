import { Button, IconButton, Stack } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { FC } from "react"

interface ActionButtonsProps {
  readonly deleteItem: VoidFunction
  readonly close: VoidFunction
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  deleteItem,
  close,
}) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <IconButton color="inherit" onClick={deleteItem}>
        <DeleteIcon />
      </IconButton>
      <Button
        color="secondary"
        onClick={close}
        sx={{ lineHeight: 1, textTransform: "none", alignItems: "center" }}
      >
        Close
      </Button>
    </Stack>
  )
}
