import { Box } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"
import { NameInput } from "./popupEdit/NameInput"
import { ActionButtons } from "./popupEdit/ActionButtons"
import { useCuleContext } from "./CuleContext"
import { deleteCule, uddCule } from "../firebase/operations"

export const Settings: FC<{ readonly close: VoidFunction }> = ({ close }) => {
  const {
    data: { title, id },
  } = useCuleContext()
  const [input, setInput] = useState(title)
  const timeoutRef = useRef(-1)
  useEffect(() => {
    window.clearTimeout(timeoutRef.current)
    if (input !== "") {
      timeoutRef.current = window.setTimeout(() => {
        uddCule({ culeId: id, title: input })
      }, 1500)
    }
  }, [input, id])
  return (
    <Box p={2}>
      <NameInput
        required={true}
        value={input}
        setValue={setInput}
        small={false}
      />
      <Box m={1} />
      <ActionButtons deleteItem={() => deleteCule(id)} close={close} />
    </Box>
  )
}
