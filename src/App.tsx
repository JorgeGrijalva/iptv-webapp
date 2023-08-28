import {
  Box,
  CssBaseline,
  CssVarsProvider,
  IconButton,
  Input,
  Typography,
} from "@mui/joy"
import Layout from "./components/layout/Layout"
import { ColorSchemeToggle } from "./components/common/ColorSchemeToggle"
import { useEffect, useState } from "react"
import { Navigator } from "./components/layout/Navigator"
import { Route, Routes } from "react-router-dom"
import { urls } from "./services/urls"
import { Dashboard } from "./pages/Dashboard"
import { LiveTV } from "./pages/LiveTV"

import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import MenuIcon from "@mui/icons-material/Menu"
import { selectAppStatus } from "./store/app/selector"
import { loadApp } from "./store/app/thunks"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { Login } from "./components/login/Login"
import { Loading } from "./components/layout/Loading"
import { Movies } from "./pages/Movies"
import { AboutMovie } from "./pages/AboutMovie"
import { WatchMovie } from "./pages/WatchMovie"

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const status = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === "needsLoad") {
      dispatch(loadApp())
    }
  }, [dispatch, status])

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      {status === "needsAuth" && <Login />}
      {status === "needsLoad" && <Loading />}
      {status === "ready" && (
        <div style={{ overflow: "hidden", width: "100vw", height: "100vh" }}>
          {drawerOpen && (
            <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
              <Navigator />
            </Layout.SideDrawer>
          )}
          <Layout.Root
            sx={{
              ...(drawerOpen && {
                height: "100vh",
                overflow: "hidden",
              }),
            }}
          >
            <Layout.Header>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <IconButton
                  variant="outlined"
                  size="sm"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography component="h1" fontWeight="xl">
                  My TV App
                </Typography>
              </Box>
              <Input
                size="sm"
                variant="outlined"
                placeholder="Search anything…"
                startDecorator={<SearchRoundedIcon color="primary" />}
                endDecorator={
                  <IconButton variant="outlined" color="neutral">
                    <Typography
                      fontWeight="lg"
                      fontSize="sm"
                      textColor="text.icon"
                    >
                      ⌘ + k
                    </Typography>
                  </IconButton>
                }
                sx={{
                  flexBasis: "500px",
                  display: {
                    xs: "none",
                    sm: "flex",
                  },
                  boxShadow: "sm",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <ColorSchemeToggle />
                <IconButton
                  size="sm"
                  variant="soft"
                  sx={{ display: { sm: "inline-flex" } }}
                >
                  <GroupRoundedIcon />
                </IconButton>
              </Box>
            </Layout.Header>
            <Layout.SideNav>
              <Navigator />
            </Layout.SideNav>
            <Layout.Main>
              <Routes>
                <Route path={urls.home} element={<Dashboard />} />
                <Route path={urls.liveTv} element={<LiveTV />} />
                <Route path={urls.movies} element={<Movies />} />
                <Route path={urls.movieAbout} element={<AboutMovie />} />
                <Route path={urls.movieWatch} element={<WatchMovie />} />
              </Routes>
            </Layout.Main>
          </Layout.Root>
        </div>
      )}
    </CssVarsProvider>
  )
}

export default App
