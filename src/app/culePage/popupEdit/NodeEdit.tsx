import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useCuleContext } from "../CuleContext"
import { useAutoState } from "../../tools/autoState"
import { NameInput } from "./NameInput"
import { Stack } from "@mui/material"
import { SliderField } from "./SliderField"
import { LineStyle } from "../../types"
import { ActionButtons } from "./ActionButtons"
import { deleteNode, uddNode } from "../../firebase/operations"

interface NodeAttributes {
  readonly label: string
  readonly radius: number
  readonly lineStyle: LineStyle
}

export const NodeEdit: FC<{
  readonly nodeIndex: number
}> = ({ nodeIndex }) => {
  const {
    data,
    update: { setElementToEdit, setNodeSizeOveride },
  } = useCuleContext()
  const nodeData = useMemo(() => data.nodes[nodeIndex], [nodeIndex, data])
  const [state, update] = useAutoState<NodeAttributes>({
    label: nodeData.name,
    radius: nodeData.size,
    lineStyle: LineStyle.solid,
  })
  useEffect(() => {
    setNodeSizeOveride(state.radius)
  }, [state.radius, setNodeSizeOveride])
  const timeoutRef = useRef(-1)
  useEffect(() => {
    window.clearTimeout(timeoutRef.current)
    if (state.label !== "") {
      timeoutRef.current = window.setTimeout(() => {
        uddNode({
          culeId: data.id,
          ...nodeData,
        })
      }, 1500)
    }
  }, [state.label, state.radius, data.nodes])
  const removeNode = useCallback(() => {
    deleteNode(data.id, nodeData.id)
    setElementToEdit(null)
  }, [nodeData, data])
  useEffect(() => {
    return () => {
      setNodeSizeOveride(null)
    }
  }, [])
  return (
    <Stack direction={"column"} gap={2} sx={{ p: 3 }}>
      <NameInput
        value={state.label}
        setValue={update.setLabel}
        required={true}
      />
      <SliderField
        min={1}
        max={25}
        value={state.radius}
        setValue={update.setRadius}
        label="Size"
      />
      <ActionButtons
        deleteItem={removeNode}
        close={() => setElementToEdit(null)}
      />
    </Stack>
  )
}
