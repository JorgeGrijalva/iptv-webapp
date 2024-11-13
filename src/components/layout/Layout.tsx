import { Box, BoxProps, Sheet } from "@mui/joy"

function Root(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          bgcolor: "background.appBody",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #000000, #1a1a1a)",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

function Header(props: BoxProps) {
  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          p: {
            xs: 2,
            sm: 3,
          },
          gap: 2,
          background: "rgba(17, 25, 40, 0.95)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

function Main(props: BoxProps) {
  return (
    <Box
      component="main"
      className="Main"
      {...props}
      sx={[
        {
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          overflow: "auto",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  )
}

function SideDrawer({
  onClose,
  ...props
}: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> }) {
  return (
    <Box
      {...props}
      sx={[
        { position: "fixed", zIndex: 1200, width: "100%", height: "100%" },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box
        role="button"
        onClick={onClose}
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
        }}
      />
      <Sheet
        sx={{
          minWidth: {
            xs: "85%",
            sm: "320px",
          },
          height: "100%",
          p: {
            xs: 2,
            sm: 3,
          },
          background: "rgba(17, 25, 40, 0.95)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {props.children}
      </Sheet>
    </Box>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Root,
  Header,
  Main,
  SideDrawer,
}
