import { styled } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import { TextField } from "@mui/material"
import { Dispatch, FC, SetStateAction } from "react"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  color: theme.palette.grey[600],
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

export const SearchBar: FC<{
  searchString: string
  setSearchString: Dispatch<SetStateAction<string>>
}> = ({ searchString, setSearchString }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  )
}
