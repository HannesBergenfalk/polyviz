import { SvgIcon, IconButton } from "@mui/material"
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react"
import { Sort } from "../types"

const ByAlpha: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M13 7H3m7 5H3m5 5H3"
        ></path>
        <path
          fill="currentColor"
          d="M11.316 16.692a.75.75 0 1 0 1.368.616zM16.5 7l.684-.308a.75.75 0 0 0-1.368 0zm3.816 10.308a.75.75 0 1 0 1.368-.616zm-.952-3.944l.684-.308zm-5.728-.75a.75.75 0 0 0 0 1.5zm-.952 4.694l4.5-10l-1.368-.616l-4.5 10zm9-.616l-1.636-3.636l-1.368.615l1.636 3.637zm-1.636-3.636l-2.864-6.364l-1.368.616l2.864 6.363zm-.684-.442h-5.728v1.5h5.728z"
        ></path>
      </g>
    </svg>
  </SvgIcon>
)

const ByTime: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" d="M10 7H2m6 5H2m8 5H2"></path>
        <circle cx="17" cy="12" r="5"></circle>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 10v1.846L18 13"
        ></path>
      </g>
    </svg>
  </SvgIcon>
)

const Down: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 4v16m0 0l6-6m-6 6l-6-6"
      ></path>
    </svg>
  </SvgIcon>
)

const Up: FC = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 20V4m0 0l6 6m-6-6l-6 6"
      ></path>
    </svg>
  </SvgIcon>
)

export const SortButton: FC<{
  sortMode: Sort
  setSortMode: Dispatch<SetStateAction<Sort>>
}> = ({ sortMode, setSortMode }) => {
  const cycleMode = useCallback(() => {
    if (sortMode === 3) {
      setSortMode(0)
    } else {
      setSortMode((m) => m + 1)
    }
  }, [sortMode])
  return (
    <IconButton onClick={cycleMode}>
      {sortMode !== 0 ? null : (
        <>
          <Up />
          <ByTime />
        </>
      )}
      {sortMode !== 1 ? null : (
        <>
          <Up />
          <ByAlpha />
        </>
      )}
      {sortMode !== 2 ? null : (
        <>
          <Down />
          <ByAlpha />
        </>
      )}
      {sortMode !== 3 ? null : (
        <>
          <Down />
          <ByTime />
        </>
      )}
    </IconButton>
  )
}
