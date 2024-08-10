import { Box, Button, Stack, TextField } from "@mui/material"
import { FC, useCallback, useState } from "react"
import { CenterPopUp } from "../tools/CenterPopup"
import { useCuleContext } from "./CuleContext"
import { uddNode } from "../firebase/operations"

export const NewNode: FC = () => {
  const {
    state: { newNodePosition },
    update: { setNewNodePosition },
    data,
  } = useCuleContext()
  const [input, setInput] = useState("")
  const onSubmit = useCallback(() => {
    if (input === "" || newNodePosition === null) {
      return
    }
    setNewNodePosition(null)
    setInput("")
    uddNode({
      culeId: data.id,
      position: newNodePosition,
      name: input,
      size: 5,
    })
  }, [input])
  const open = newNodePosition !== null
  return (
    <CenterPopUp open={open} close={() => setNewNodePosition(null)}>
      <Box p={2}>
        <TextField
          color="secondary"
          name="title"
          label={"Name"}
          required={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.code === "Enter" ? onSubmit() : null)}
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
  )
}
