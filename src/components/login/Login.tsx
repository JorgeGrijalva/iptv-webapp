import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from "@mui/joy"
import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { setApiConfig, setAppStatus } from "../../store/app/appSlice"
import {
  fetchAccountInfo,
  fetchLiveStreamCategories,
  fetchLiveStreams,
  fetchSeriesStreamCategories,
  fetchSeriesStreams,
  fetchVODStreamCategories,
  fetchVODStreams,
} from "../../store/app/thunks"

export const Login: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<"idle" | "pending" | "loading">("idle")

  const proxyUrl = import.meta.env.VITE_PROXY_URL || '/api'

  const canSubmit = [username, password].every(Boolean) && status === "idle"

  const handleSubmit = async () => {
    if (!username || username.length === 0) {
      setError("Username must be provided")
      return
    }

    if (!password || password.length === 0) {
      setError("Password must be provided")
      return
    }

    setStatus("pending")

    const config = {
      baseUrl: proxyUrl,
      auth: {
        username,
        password,
      },
    }

    try {
      await dispatch(fetchAccountInfo({ config })).unwrap()
    } catch (e) {
      setError("There was an error logging in")
      setStatus("idle")
      return
    }

    setStatus("loading")
    dispatch(setApiConfig(config))

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

    dispatch(setAppStatus("ready"))
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #000000, #1a1a1a)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 
            "radial-gradient(circle at 50% 50%, rgba(45, 85, 255, 0.1), transparent 50%)",
          animation: "pulse 8s infinite",
        },
      }}
    >
      <Sheet
        sx={{
          width: {
            xs: "90%",
            sm: 400,
          },
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "xl",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          background: "rgba(17, 25, 40, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
        variant="outlined"
      >
        <div>
          <Typography
            level="h2"
            component="h1"
            sx={{
              background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              mb: 0.5,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            ¡Bienvenido!
          </Typography>
          <Typography
            level="body-sm"
            sx={{ 
              color: "rgba(255,255,255,0.7)",
              mb: 3,
              textAlign: "center"
            }}
          >
            Inicia sesión para continuar
          </Typography>
        </div>

        {error && error.length > 0 && (
          <Alert
            color="danger"
            variant="soft"
            sx={{
              borderRadius: "xl",
              backgroundColor: "rgba(211, 47, 47, 0.15)",
              border: "1px solid rgba(211, 47, 47, 0.3)",
            }}
          >
            {error}
          </Alert>
        )}

        <FormControl>
          <FormLabel sx={{ color: "rgba(255,255,255,0.8)" }}>Usuario</FormLabel>
          <Input
            name="username"
            type="username"
            placeholder="Tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "--Input-focusedThickness": "2px",
              "--Input-focusedHighlight": "rgba(79, 172, 254, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel sx={{ color: "rgba(255,255,255,0.8)" }}>Contraseña</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "--Input-focusedThickness": "2px",
              "--Input-focusedHighlight": "rgba(79, 172, 254, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        </FormControl>

        <Button
          loading={status !== "idle"}
          loadingPosition="start"
          onClick={handleSubmit}
          disabled={!canSubmit}
          sx={{
            mt: 1,
            background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "xl",
            border: "none",
            color: "#000",
            boxShadow: "0 3px 15px rgba(79, 172, 254, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 5px 20px rgba(79, 172, 254, 0.6)",
            },
            "&:disabled": {
              background: "rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {status === "idle" && "Iniciar sesión"}
          {status === "pending" && "Verificando..."}
          {status === "loading" && "Cargando datos..."}
        </Button>
      </Sheet>
    </Box>
  )
}
