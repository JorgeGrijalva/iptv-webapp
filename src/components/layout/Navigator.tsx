import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
} from "@mui/joy"
import { FC } from "react"
import { urls } from "../../services/urls"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import HomeIcon from "@mui/icons-material/Home"
import LiveTvIcon from "@mui/icons-material/LiveTv"
import TheatersIcon from "@mui/icons-material/Theaters"
import TvIcon from "@mui/icons-material/Tv"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"

export const navigationItems = [
  {
    url: urls.liveTv,
    icon: <LiveTvIcon />,
    text: "TV en Vivo",
  },
  {
    url: urls.movies,
    icon: <TheatersIcon />,
    text: "Películas",
  },
  {
    url: urls.tvShows,
    icon: <TvIcon />,
    text: "Series",
  },
  {
    url: urls.watchlist,
    icon: <BookmarkBorderIcon />,
    text: "Mi Lista",
  },
  {
    url: urls.home,
    icon: <HomeIcon />,
    text: "Perfil",
  },
]

export const NavigatorSidebar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (url: string) => {
    navigate(url)
    // Emitir un evento personalizado para cerrar el drawer
    window.dispatchEvent(new CustomEvent('closeDrawer'))
  }

  return (
    <List 
      size="lg" 
      sx={{ 
        "--ListItem-radius": "16px",
        "--List-gap": "16px",
        padding: {
          xs: "32px 20px",
          sm: "40px 28px",
        },
        background: "rgba(17, 25, 40, 0.95)",
        borderRadius: { xs: 0, sm: "24px" },
        width: {
          xs: "100%",
          sm: "300px",
          md: "340px",
        },
        height: { xs: "100vh", sm: "auto" },
        overflow: "auto",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(4px)",
        border: { xs: "none", sm: "1px solid rgba(255, 255, 255, 0.1)" },
      }}
    >
      <ListItem nested>
        <ListSubheader
          sx={{
            color: "rgba(255,255,255,0.8)",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: {
              xs: "1.25rem",
              sm: "1.35rem",
            },
            padding: {
              xs: "12px 20px",
              sm: "16px 28px",
            },
            display: "flex",
            alignItems: "center",
            background: "transparent",
          }}
        >
          Explorar
          <IconButton
            size="lg"
            variant="plain"
            sx={{
              "--IconButton-size": {
                xs: "40px",
                sm: "48px",
              },
              ml: "auto",
              color: "#4facfe",
            }}
          >
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: "1.75rem" }} />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { 
              p: {
                xs: "20px",
                sm: "24px",
              },
              fontSize: {
                xs: "1.1rem",
                sm: "1.2rem",
              },
              color: "rgba(255,255,255,0.8)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "translateX(8px)",
              },
              "&.Mui-selected": {
                background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
                color: "white",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(79, 172, 254, 0.4)",
              },
            },
            "& .MuiListItemDecorator-root": {
              fontSize: {
                xs: "1.4rem",
                sm: "1.6rem",
              },
              minWidth: {
                xs: "40px",
                sm: "48px",
              },
            },
          }}
        >
          {navigationItems.map((item) => (
            <ListItem key={item.url}>
              <ListItemButton
                selected={location.pathname === item.url}
                onClick={() => handleNavigation(item.url)}
              >
                <ListItemDecorator sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemDecorator>
                <ListItemContent>{item.text}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ListItem>
    </List>
  )
}

export const NavigatorHeader: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <List
      role="menubar"
      orientation="horizontal"
      size="lg"
      sx={{
        "--List-radius": "16px",
        "--List-padding": "12px",
        "--List-gap": "12px",
        "--ListItem-gap": "8px",
        display: { xs: "none", sm: "none", md: "inline-flex" },
        background: "rgba(17, 25, 40, 0.95)",
        borderRadius: "24px",
        padding: {
          md: "8px 16px",
          lg: "12px 24px",
        },
        "& .JoyListItemButton-root": {
          fontSize: {
            md: "1rem",
            lg: "1.1rem",
          },
          padding: {
            md: "12px 20px",
            lg: "16px 24px",
          },
          color: "rgba(255,255,255,0.7)",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          "&.Mui-selected": {
            background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
            color: "white",
            fontWeight: 600,
          },
        },
      }}
    >
      {navigationItems.map((item) => (
        <ListItem role="none" key={item.url}>
          <ListItemButton
            role="menuitem"
            selected={location.pathname === item.url}
            onClick={() => navigate(item.url)}
          >
            <ListItemDecorator sx={{ color: "inherit" }}>
              {item.icon}
            </ListItemDecorator>
            {item.text}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
