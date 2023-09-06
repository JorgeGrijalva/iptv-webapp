import { Box, CssBaseline, CssVarsProvider, IconButton } from "@mui/joy"
import Layout from "./components/layout/Layout"
import { ColorSchemeToggle } from "./components/common/ColorSchemeToggle"
import { useEffect, useState } from "react"
import { Navigator } from "./components/layout/Navigator"
import { Route, Routes } from "react-router-dom"
import { urls } from "./services/urls"
import { Dashboard } from "./pages/Dashboard"
import { LiveTV } from "./pages/LiveTV"
import { selectAppStatus } from "./store/app/selector"
import { loadApp } from "./store/app/thunks"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { Login } from "./components/login/Login"
import { Loading } from "./components/layout/Loading"
import { Movies } from "./pages/Movies"
import { WatchMovie } from "./pages/movies/WatchMovie"
import { TVSeries } from "./pages/TVSeries"
import { WatchSeries } from "./pages/shows/WatchSeries"
import { SearchInput } from "./components/SearchInput"
import { SearchResults } from "./pages/SearchResults"
import { Watchlist } from "./pages/Watchlist"

import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import MenuIcon from "@mui/icons-material/Menu"

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
              </Box>
              <SearchInput />
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
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <GroupRoundedIcon />
                </IconButton>
              </Box>
            </Layout.Header>
            <Layout.SideNav>
              <Navigator />
            </Layout.SideNav>
            <Layout.Main sx={{ height: "100vh", overflow: "hidden" }}>
              <Routes>
                <Route path={urls.home} element={<Dashboard />} />
                <Route path={urls.liveTv} element={<LiveTV />} />
                <Route path={urls.movies} element={<Movies />} />
                <Route path={urls.movieWatch} element={<WatchMovie />} />
                <Route path={urls.tvShows} element={<TVSeries />} />
                <Route path={urls.seriesWatch} element={<WatchSeries />} />
                <Route path={urls.search} element={<SearchResults />} />
                <Route path={urls.watchlist} element={<Watchlist />} />
              </Routes>
            </Layout.Main>
          </Layout.Root>
        </div>
      )}
    </CssVarsProvider>
  )
}

export default App
