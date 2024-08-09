import {
  Box,
  Button,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { FC, useCallback, useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import { CenterPopUp } from "../tools/CenterPopup"
import Fab from "@mui/material/Fab"
import { uddCule } from "../firebase/operations"

export const AddButton: FC = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const onSubmit = useCallback(() => {
    if (input === "") {
      return
    }
    setOpen(false)
    setInput("")
    uddCule({ title: input })
  }, [input])
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"))
  return (
    <>
      <CenterPopUp open={open} close={() => setOpen(false)}>
        <Box p={2}>
          <TextField
            color="secondary"
            name="title"
            label={"Name"}
            required={true}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Stack direction={"row-reverse"} mt={2}>
            <Button
              disabled={input === ""}
              color="secondary"
              variant={"contained"}
              sx={{ textTransform: "none" }}
              onClick={onSubmit}
            >
              Ok
            </Button>
          </Stack>
        </Box>
      </CenterPopUp>
      <Fab
        onClick={() => setOpen(true)}
        color="secondary"
        sx={
          bigScreen
            ? { marginLeft: "auto" }
            : { position: "absolute", bottom: 40, right: 20 }
        }
      >
        <AddIcon />
      </Fab>
    </>
  )
}
