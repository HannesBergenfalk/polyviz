import { FC, useEffect, useState } from "react"

import { CuleList } from "./CuleList"
import { Header } from "./Header"
import { CuleBaseData } from "../types"
import { listenCuleMaps } from "../firebase/operations"

export const NavLoader: FC = () => {
  const [data, setData] = useState<Array<CuleBaseData>>()
  useEffect(() => listenCuleMaps(setData), [])
  if (data === undefined) {
    return null
  }
  return (
    <>
      <Header />
      <CuleList data={data} />
    </>
  )
}
