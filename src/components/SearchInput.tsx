import { IconButton, Input, Typography, Box } from "@mui/joy"
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
    if (!query.trim()) return
    
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
      size="lg"
      variant="soft"
      placeholder="Buscar películas, series o canales..."
      startDecorator={
        <SearchRoundedIcon 
          sx={{ 
            color: "#4facfe",
            fontSize: { xs: "1.4rem", sm: "1.6rem" }
          }} 
        />
      }
      endDecorator={
        <IconButton 
          variant="solid"
          onClick={onSearch}
          sx={{
            background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
            boxShadow: "0 3px 15px rgba(79, 172, 254, 0.4)",
            padding: { xs: "8px 16px", sm: "10px 20px" },
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 20px rgba(79, 172, 254, 0.6)",
            },
          }}
        >
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 1 
          }}>
            <SearchRoundedIcon sx={{ 
              fontSize: { xs: "1.2rem", sm: "1.4rem" },
              color: "white"
            }} />
            <Typography 
              fontWeight="lg" 
              fontSize={{ xs: "0.875rem", sm: "1rem" }}
              sx={{ 
                color: "white",
                display: { xs: "none", sm: "block" }
              }}
            >
              Buscar
            </Typography>
          </Box>
        </IconButton>
      }
      sx={{
        flexBasis: { xs: "100%", sm: "300px", md: "400px", lg: "500px" },
        display: "flex",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        fontSize: { xs: "0.875rem", sm: "1rem" },
        color: "rgba(255, 255, 255, 0.8)",
        "& .MuiInput-input": {
          padding: { xs: "12px 16px", sm: "14px 18px" },
        },
        "&:hover": {
          borderColor: "rgba(79, 172, 254, 0.4)",
          background: "rgba(255, 255, 255, 0.08)",
        },
        "&:focus-within": {
          borderColor: "#4facfe",
          boxShadow: "0 0 0 3px rgba(79, 172, 254, 0.25)",
          background: "rgba(255, 255, 255, 0.1)",
        },
      }}
      onKeyDown={onKeyDown}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
