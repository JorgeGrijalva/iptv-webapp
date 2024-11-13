import { FC, useMemo, useState } from "react"
import {
  LiveStream,
  SeriesStream,
  VodStream,
} from "../services/XtremeCodesAPI.types"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { Box, IconButton } from "@mui/joy"
import { MediaCard } from "./MediaCard"
import { isLive, isSeries } from "../services/utils"
import { ChannelCard } from "./ChannelCard"

export interface MediaCarouselProps {
  items: (VodStream | SeriesStream | LiveStream)[]
  onStreamClick: (stream: VodStream | SeriesStream | LiveStream) => void
}

export const MediaCarousel: FC<MediaCarouselProps> = (props) => {
  const { items, onStreamClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.up("sm"))
  const ismdScreen = useMediaQuery(theme.breakpoints.up("md"))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
  const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"))

  const itemsPerView = useMemo(() => {
    if (isXtraLargeScreen) return 20
    if (isLargeScreen) return 15
    if (ismdScreen) return 7
    if (isSmScreen) return 7
    return 10
  }, [isLargeScreen, isSmScreen, isXtraLargeScreen, ismdScreen])

  const handleNext = () => {
    setCurrentIndex((prev) => 
      Math.min(prev + itemsPerView, items.length - itemsPerView)
    )
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerView, 0))
  }

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView)
  const canGoNext = currentIndex + itemsPerView < items.length
  const canGoPrev = currentIndex > 0

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: { xs: "0 8px", sm: "0 16px" },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xl: `repeat(${itemsPerView}, 1fr)`,
            lg: `repeat(${itemsPerView}, 1fr)`,
            md: `repeat(${itemsPerView}, 1fr)`,
            sm: `repeat(${itemsPerView}, 1fr)`,
            xs: `repeat(${itemsPerView}, 1fr)`,
          },
          gap: { xs: 1, sm: 1.5, md: 2 },
          transition: "transform 0.3s ease",
        }}
      >
        {visibleItems.map((item) => (
          <MediaCard 
            isMobile={isSmScreen}
            key={isSeries(item) ? item.series_id : item.stream_id}
            stream={item}
            onStreamClick={onStreamClick}
          />
        ))}
      </Box>

      {canGoPrev && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.7)",
            "&:hover": { background: "rgba(0,0,0,0.9)" }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      {canGoNext && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.7)",
            "&:hover": { background: "rgba(0,0,0,0.9)" }
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}
    </Box>
  )
}
