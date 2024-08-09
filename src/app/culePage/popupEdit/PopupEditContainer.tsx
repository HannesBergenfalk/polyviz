import Popover from "@mui/material/Popover"
import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { useCuleContext } from "../CuleContext"
import { Backdrop } from "@mui/material"
import { NodeEdit } from "./NodeEdit"
import { EdgeEdit } from "./EdgeEdit"

interface PopoverVirtualElement {
  nodeType: 1
  getBoundingClientRect: () => DOMRect
}

type positions = "top" | "bottom"

type ElementData =
  | { readonly open: false }
  | {
      readonly open: true
      readonly type: "node"
      readonly index: number
      readonly name: string
      readonly hasRoom: boolean
    }
  | {
      readonly open: true
      readonly type: "edge"
      readonly index1: number
      readonly index2: number
      readonly name: string
      readonly hasRoom: boolean
    }

export const PopupEditContainer: FC = () => {
  const blockClose = useRef(false)

  const {
    state: { elementToEdit },
    update: { setElementToEdit },
  } = useCuleContext()

  useEffect(() => {
    if (elementToEdit !== null) {
      blockClose.current = true
      window.setTimeout(() => (blockClose.current = false), 500)
    }
  }, [elementToEdit])

  const handleClose = useCallback(() => {
    if (!blockClose.current) {
      setElementToEdit(null)
    }
  }, [])

  const anchor = useMemo<PopoverVirtualElement | null>(() => {
    if (elementToEdit !== null) {
      const rect = elementToEdit.getBoundingClientRect()
      return {
        nodeType: 1,
        getBoundingClientRect: () => rect,
      }
    }
    return null
  }, [elementToEdit])
  const data = useMemo<ElementData>(() => {
    if (elementToEdit === null) {
      return { open: false }
    }
    const name = elementToEdit.getAttribute("name")
    const hasRoom =
      anchor.getBoundingClientRect().bottom + 250 < window.innerHeight
    if (name.startsWith("e")) {
      const [si1, si2] = name.slice(1).split("-")
      const index1 = parseInt(si1)
      const index2 = parseInt(si2)
      return { name, open: true, hasRoom, type: "edge", index1, index2 }
    }
    const index = parseInt(name.slice(1))
    return { name, open: true, hasRoom, type: "node", index }
  }, [elementToEdit, anchor])

  const open = data.open
  const id = data.open ? data.name : undefined

  const vpos: [positions, positions] =
    data.open && data.hasRoom ? ["top", "bottom"] : ["bottom", "top"]

  return (
    <Backdrop open={open}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: vpos[1],
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: vpos[0],
          horizontal: "center",
        }}
      >
        {!data.open ? null : data.type === "node" ? (
          <NodeEdit nodeIndex={data.index} />
        ) : (
          <EdgeEdit nI1={data.index1} nI2={data.index2} />
        )}
      </Popover>
    </Backdrop>
  )
}
