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
    icon: <LiveTvIcon fontSize="small" />,
    text: "Live TV",
  },
  {
    url: urls.movies,
    icon: <TheatersIcon fontSize="small" />,
    text: "Movies",
  },
  {
    url: urls.tvShows,
    icon: <TvIcon fontSize="small" />,
    text: "TV Shows",
  },
  {
    url: urls.watchlist,
    icon: <BookmarkBorderIcon fontSize="small" />,
    text: "Watchlist",
  },
  {
    url: urls.home,
    icon: <HomeIcon fontSize="small" />,
    text: "Profile",
  },
]

export const NavigatorSidebar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListSubheader>
          Browse
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ "--IconButton-size": "24px", ml: "auto" }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            "& .JoyListItemButton-root": { p: "8px" },
          }}
        >
          {navigationItems.map((item) => (
            <ListItem key={item.url}>
              <ListItemButton
                selected={location.pathname === item.url}
                onClick={() => navigate(item.url)}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
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
    <>
      <List
        role="menubar"
        orientation="horizontal"
        size="sm"
        sx={{
          "--List-radius": "8px",
          "--List-padding": "4px",
          "--List-gap": "8px",
          "--ListItem-gap": "0px",
          display: { xs: "none", sm: "none", md: "inline-flex" },
        }}
      >
        {navigationItems.map((item) => (
          <ListItem role="none" key={item.url}>
            <ListItemButton
              role="menuitem"
              selected={location.pathname === item.url}
              onClick={() => navigate(item.url)}
            >
              <ListItemDecorator>{item.icon}</ListItemDecorator>
              {item.text}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}
