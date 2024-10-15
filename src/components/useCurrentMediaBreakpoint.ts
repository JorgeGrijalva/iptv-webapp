import { Breakpoint, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

export function useCurrentMediaBreakpoint(): Breakpoint {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"))

  if (isSmall) return "sm"

  if (isMedium) return "md"

  if (isLarge) return "lg"

  return "sm"
}
