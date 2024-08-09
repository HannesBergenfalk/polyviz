import { FC, useEffect, useState } from "react"
import { CuleProvider } from "./CuleContext"
import { CuleData } from "../types"
import { Header } from "./Header"
import { CuleGraph } from "./CuleGraph"
import { ToolBar } from "./ToolBar"
import { PopupEditContainer } from "./popupEdit/PopupEditContainer"
import { AutoGraphButton } from "./AutoGraphButton"
import { NewNode } from "./NewNode"
import { getCuleMapData } from "../firebase/operations"

export const CuleLoader: FC<{ culeId: string }> = ({ culeId }) => {
  const [data, setData] = useState<CuleData>()
  useEffect(() => {
    getCuleMapData(culeId).then((res) => {
      setData(res as unknown as CuleData)
    })
  }, [])
  if (data === undefined) {
    return null
  }
  return (
    <CuleProvider data={data}>
      <Header />
      <CuleGraph />
      <ToolBar />
      <AutoGraphButton />
      <PopupEditContainer />
      <NewNode />
    </CuleProvider>
  )
}
