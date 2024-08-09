import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useCuleContext } from "../CuleContext"
import { useAutoState } from "../../tools/autoState"
import { NameInput } from "./NameInput"
import { Stack } from "@mui/material"
import { SliderField } from "./SliderField"
import { LineStyleSelect } from "./LineStyleSelect"
import { CuleEdge, LineStyle } from "../../types"
import { ActionButtons } from "./ActionButtons"
import { deleteEdge, uddEdge } from "../../firebase/operations"

interface EdgeAttributes {
  readonly label: string
  readonly width: number
  readonly style: LineStyle
}

export const EdgeEdit: FC<{ readonly nI1: number; readonly nI2: number }> = ({
  nI1,
  nI2,
}) => {
  const {
    data,
    update: { setEdgeWidthOveride, setElementToEdit },
  } = useCuleContext()
  const edgeData = useMemo(() => {
    const id1 = data.nodes[nI1].id
    const id2 = data.nodes[nI2].id
    return data.edges.find(
      (edge) => edge.from === id1 && edge.to === id2
    ) as CuleEdge
  }, [nI1, nI2, data])
  const [state, update] = useAutoState<EdgeAttributes>({
    label: edgeData.label ?? "",
    width: edgeData.width,
    style: edgeData.style,
  })
  useEffect(() => {
    setEdgeWidthOveride(state.width)
  }, [state.width])
  const submit = useCallback(() => {
    uddEdge({
      culeId: data.id,
      ...edgeData,
      style: state.style,
      width: state.width,
      ...(state.label === "" ? {} : { label: state.label }),
    })
  }, [edgeData, state])
  const timeoutRef = useRef(-1)
  useEffect(() => {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      submit()
    }, 1500)
  }, [state.label, state.width])
  useEffect(() => {
    submit()
  }, [state.style])
  useEffect(() => {
    return () => {
      setEdgeWidthOveride(null)
    }
  }, [])
  const removeEdge = useCallback(() => {
    deleteEdge(data.id, edgeData.id)
    setElementToEdit(null)
  }, [edgeData])
  return (
    <Stack direction={"column"} gap={2} sx={{ p: 3 }}>
      <NameInput
        value={state.label}
        setValue={update.setLabel}
        required={false}
        label="Label"
      />
      <SliderField
        min={0.1}
        max={5}
        step={0.1}
        value={state.width}
        setValue={update.setWidth}
        label="Width"
      />
      <LineStyleSelect value={state.style} setValue={update.setStyle} />
      <ActionButtons
        deleteItem={removeEdge}
        close={() => setElementToEdit(null)}
      />
    </Stack>
  )
}
