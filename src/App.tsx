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
import { useState } from "react"
import { Navigator } from "./components/layout/Navigator"
import { Route, Routes } from "react-router-dom"
import { urls } from "./services/urls"
import { Dashboard } from "./pages/Dashboard"
import { LiveTV } from "./pages/LiveTV"

import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import MenuIcon from "@mui/icons-material/Menu"

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
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
                <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
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
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
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
          </Routes>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  )
}

export default App
