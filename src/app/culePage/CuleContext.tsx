import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react"
import { CuleControlState, CuleData, Mode } from "../types"
import { SettersOf, useAutoState } from "../tools/autoState"

interface CuleContextType {
  readonly data: CuleData
  readonly state: CuleControlState
  readonly update: SettersOf<CuleControlState>
}

const CuleContext = createContext<CuleContextType | null>(null)
const { Provider } = CuleContext
interface CuleContextProps {
  readonly data: CuleData
}
export const CuleProvider: FC<PropsWithChildren<CuleContextProps>> = ({
  children,
  data,
}) => {
  const [state, update] = useAutoState<CuleControlState>({
    elementToEdit: null,
    activeMode: data.nodes.length === 0 ? Mode.add : Mode.edit,
    edgeWidthOveride: null,
    nodeSizeOveride: null,
    newNodePosition: null,
    pan: [0, 0],
    zoom: 1,
  })
  const value = useMemo(() => ({ data, state, update }), [state, data, update])
  return <Provider value={value}>{children}</Provider>
}

export const useCuleContext = (): CuleContextType => {
  const contextValue = useContext(CuleContext)
  if (contextValue === null) {
    throw Error("not inside provider")
  }
  return contextValue
}
