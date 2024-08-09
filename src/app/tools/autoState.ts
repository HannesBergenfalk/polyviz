import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react"

type SetterArg<T> = T | ((prev: T) => T)
export type SettersOf<S extends {}> = {
    [K in keyof S as `set${Capitalize<string & K>}`]-?: (arg: SetterArg<S[keyof S]>) => void
}
const isFunc = <T>(v: SetterArg<T>): v is (prev: T) => T => typeof v === 'function'
const capitalize = (k: string) => k.slice(0, 1).toUpperCase() + k.slice(1)
const createSetters = <S extends {}>(example: S, stateSetter: Dispatch<SetStateAction<S>>) => {
    const setters: Partial<SettersOf<S>> = {}
    for (const key of Object.keys(example)) {
        const fieldSetter = (arg: SetterArg<S[keyof S]>) => {
            if (isFunc(arg)) {
                stateSetter(prev => ({ ...prev, [key]: arg(prev[key]) }))
            } else {
                stateSetter(prev => ({ ...prev, [key]: arg }))
            }
        }
        const setKey = `set${capitalize(key)}`
        setters[setKey] = fieldSetter
    }
    return setters as SettersOf<S>
}

export const useAutoState = <T>(initial: T): [T, SettersOf<T>, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState<T>(initial)
    const fieldSettersRef = useRef(createSetters(initial, setState))
    //const fieldSetters = useMemo(() => createSetters(initial, setState), [])
    return [state, fieldSettersRef.current, setState]
}
