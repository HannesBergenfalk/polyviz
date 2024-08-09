import { TextField } from "@mui/material"
import { FC } from "react"

interface NameInputProps {
  readonly label?: string
  readonly required: boolean
  readonly value: string
  readonly small?: boolean
  readonly setValue: (_: string) => void
}

export const NameInput: FC<NameInputProps> = ({
  value,
  setValue,
  label = "Name",
  required,
  small = true,
}) => {
  return (
    <TextField
      name="label"
      color="secondary"
      label={label}
      required={required}
      value={value}
      size={small ? "small" : "medium"}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
