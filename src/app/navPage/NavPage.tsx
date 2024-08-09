import { FC, useEffect, useState } from "react"

import { CuleList } from "./CuleList"
import { Header } from "./Header"
import { CuleData } from "../types"
import { getCuleMaps } from "../firebase/operations"

export const NavLoader: FC = () => {
  const [data, setData] = useState<Array<Pick<CuleData, "id" | "title">>>()
  useEffect(() => {
    getCuleMaps().then((res) => setData(res))
  }, [])
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
