import { FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Link,
  Sheet,
  Typography,
  styled,
} from "@mui/joy"
import { getDateForTimestamp } from "../services/utils"
import {
  fetchAccountInfo,
  fetchLiveStreamCategories,
  fetchLiveStreams,
  fetchSeriesStreamCategories,
  fetchSeriesStreams,
  fetchVODStreamCategories,
  fetchVODStreams,
} from "../store/app/thunks"
import { removeAccount } from "../store/app/appSlice"

export const Dashboard: FC = () => {
  const [state, setState] = useState<"loading" | "ready">("ready")
  const {
    accountInfo,
    liveStreams,
    vodStreams,
    seriesStreams,
    watchlist,
    lastFetchedAccountInfo,
  } = useAppSelector(selectAppState)
  const dispatch = useAppDispatch()

  console.log(accountInfo)

  const refreshInfo = () => {
    dispatch(fetchAccountInfo({}))
  }

  const refreshPlaylist = async () => {
    setState("loading")
    try {
      await Promise.all([
        dispatch(fetchLiveStreamCategories()).unwrap(),
        dispatch(fetchVODStreamCategories()).unwrap(),
        dispatch(fetchSeriesStreamCategories()).unwrap(),
        dispatch(fetchLiveStreams()).unwrap(),
        dispatch(fetchVODStreams()).unwrap(),
        dispatch(fetchSeriesStreams()).unwrap(),
      ])
    } catch (e) {
      console.log(e)
    }
    setState("ready")
  }

  const deleteAccount = () => {
    dispatch(removeAccount())
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflow: "auto",
        paddingBottom: 5,
        background: "linear-gradient(to bottom, #000000, #1a1a1a)",
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: {
            xs: "95%",
            sm: "90%",
          },
          margin: {
            xs: "10px auto",
            sm: "20px auto",
          },
          background: "rgba(17, 25, 40, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: {
              xs: 2,
              sm: 4,
            },
          }}
        >
          <Typography
            level="h2"
            sx={{
              background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              mb: 4,
              fontWeight: 700,
              fontSize: {
                xs: "1.75rem",
                sm: "2.125rem",
              },
              textAlign: "center",
            }}
          >
            Tu Cuenta
          </Typography>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: {
                xs: "12px",
                sm: "20px",
              },
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <StyledItem>
              <Typography level="title-sm" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Usuario
              </Typography>
              <Typography 
                level="body-lg" 
                sx={{ 
                  color: "white",
                  fontSize: {
                    xs: "0.875rem",
                    sm: "1rem",
                  }
                }}
              >
                {accountInfo.user_info?.username}
              </Typography>
            </StyledItem>

            {/* Repite el patrón para los demás campos */}
          </div>

          <Sheet
            sx={{
              width: "100%",
              maxWidth: "800px",
              mt: {
                xs: 2,
                sm: 4,
              },
              p: {
                xs: 1,
                sm: 2,
              },
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "xl",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "1fr 1fr 1fr 1fr",
              },
              gap: {
                xs: 1,
                sm: 2,
              },
            }}
          >
            <StatsBox
              title="Canales en Vivo"
              value={liveStreams.length}
              gradient="linear-gradient(45deg, #FF512F 30%, #F09819 90%)"
            />
            <StatsBox
              title="Películas"
              value={vodStreams.length}
              gradient="linear-gradient(45deg, #1FA2FF 30%, #12D8FA 90%)"
            />
            <StatsBox
              title="Series"
              value={seriesStreams.length}
              gradient="linear-gradient(45deg, #4776E6 30%, #8E54E9 90%)"
            />
            <StatsBox
              title="Mi Lista"
              value={watchlist.length}
              gradient="linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)"
            />
          </Sheet>

          <ButtonGroup
            spacing={2}
            sx={{
              mt: {
                xs: 2,
                sm: 4,
              },
              gap: {
                xs: 1,
                sm: 2,
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <Button
              variant="solid"
              color="danger"
              onClick={deleteAccount}
              sx={{
                background: "linear-gradient(45deg, #FF512F 30%, #F09819 90%)",
                boxShadow: "0 3px 15px rgba(255, 81, 47, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 20px rgba(255, 81, 47, 0.6)",
                },
              }}
            >
              Cerrar Sesión
            </Button>
            <Button
              variant="solid"
              loading={state === "loading"}
              loadingPosition="start"
              onClick={refreshPlaylist}
              sx={{
                background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
                boxShadow: "0 3px 15px rgba(79, 172, 254, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 20px rgba(79, 172, 254, 0.6)",
                },
              }}
            >
              Actualizar Lista
            </Button>
          </ButtonGroup>

          <Typography
            level="body-sm"
            sx={{
              mt: 3,
              color: "rgba(255,255,255,0.7)",
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            Última actualización:
            {" " + new Date(lastFetchedAccountInfo).toLocaleTimeString()}
            <Link
              sx={{
                color: "#4facfe",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={refreshInfo}
            >
              Actualizar Información
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

const StyledItem = styled(Sheet)(() => ({
  padding: "16px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}))

interface StatsBoxProps {
  title: string
  value: number
  gradient: string
}

const StatsBox: FC<StatsBoxProps> = ({ title, value, gradient }) => (
  <Sheet
    sx={{
      p: {
        xs: 1,
        sm: 2,
      },
      borderRadius: "xl",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Typography
      level="body-xs"
      sx={{
        color: "rgba(255,255,255,0.7)",
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
        },
      }}
    >
      {title}
    </Typography>
    <Typography
      level="h3"
      sx={{
        background: gradient,
        backgroundClip: "text",
        textFillColor: "transparent",
        fontWeight: 700,
        fontSize: {
          xs: "1.5rem",
          sm: "2rem",
        },
      }}
    >
      {value}
    </Typography>
  </Sheet>
)
