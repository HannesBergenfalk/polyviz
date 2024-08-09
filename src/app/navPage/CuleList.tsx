import { FC, forwardRef, useMemo, useState } from "react"
import { CuleData, Sort } from "../types"
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "@tanstack/react-router"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { SearchBar } from "./SearchBar"
import { SortButton } from "./SortButton"
import { AddButton } from "./AddButton"

interface ListItemLinkProps extends Pick<RouterLinkProps, "to" | "params"> {
  primary: string
}
const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
  itemProps,
  ref
) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />
})
const ListItemLink: FC<ListItemLinkProps> = ({ primary, to, params }) => (
  <ListItemButton component={Link} to={to} params={params} divider>
    <ListItemText primary={primary} />
  </ListItemButton>
)

type Cule = Pick<CuleData, "id" | "title">

const SORTS: Record<Sort, (a: Cule, b: Cule) => number> = {
  [Sort.time]: (a, b) => -1,
  [Sort.timeReversed]: (a, b) => 1,
  [Sort.alpha]: (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1
    }
    return 0
  },
  [Sort.alphaReversed]: (a, b) => {
    if (b.title.toLowerCase() < a.title.toLowerCase()) {
      return -1
    }
    if (b.title.toLowerCase() > a.title.toLowerCase()) {
      return 1
    }
    return 0
  },
}

export const CuleList: FC<{
  readonly data: ReadonlyArray<Cule>
}> = ({ data }) => {
  const [sortMode, setSortMode] = useState(Sort.time)
  const [searchString, setSearchString] = useState("")
  const filteredAndSorted = useMemo(() => {
    return data
      .filter((c) => c.title.toLowerCase().includes(searchString))
      .sort(SORTS[sortMode])
  }, [data, sortMode, searchString])
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"))
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Stack direction={"row"} p={2} alignItems={"flex-end"}>
        <SortButton sortMode={sortMode} setSortMode={setSortMode} />
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <AddButton />
      </Stack>
      <List
        sx={{
          maxHeight: bigScreen ? "calc(100vh - 156px)" : "calc(100vh - 120px)",
          overflowY: "auto",
        }}
      >
        {filteredAndSorted.map(({ id, title }) => (
          <ListItem key={id} sx={{ paddingY: 0 }}>
            <ListItemLink
              primary={title}
              to={"/cule/$culeId" as ""}
              params={{ culeId: id }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
