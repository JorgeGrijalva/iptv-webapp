import { IconButton, Input, Typography } from "@mui/joy"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import { FC, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { urls } from "../services/urls"
import queryString from "query-string"

export const SearchInput: FC = () => {
  const [query, setQuery] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      event.stopPropagation()
      onSearch()
    }
  }

  const onSearch = () => {
    console.log("searching " + query)
    if (location.pathname !== urls.search) {
      navigate({
        pathname: urls.search,
        search: queryString.stringify({ query }),
      })

      return
    }

    setSearchParams((prev) => {
      prev.set("query", query)
      return prev
    })
  }

  return (
    <Input
      size="sm"
      variant="outlined"
      placeholder="Search anything…"
      startDecorator={<SearchRoundedIcon color="primary" />}
      endDecorator={
        <IconButton variant="outlined" color="neutral" onClick={onSearch}>
          <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
            Enter
          </Typography>
        </IconButton>
      }
      sx={{
        flexBasis: "500px",
        display: {
          //xs: "none",
          sm: "flex",
        },
        boxShadow: "sm",
      }}
      onKeyDown={onKeyDown}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
