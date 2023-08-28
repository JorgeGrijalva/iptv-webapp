import { FC, useCallback, useMemo, useState } from "react"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import {
  Box,
  Card,
  CardContent,
  CardCover,
  IconButton,
  Link,
  Typography,
} from "@mui/joy"
import { isVod } from "../services/utils"

export interface MediaCarouselProps {
  items: (VodStream | SeriesStream)[]
  onStreamClick: (stream: VodStream | SeriesStream) => void
}

export const MediaCarousel: FC<MediaCarouselProps> = (props) => {
  const { items, onStreamClick } = props
  const [currentPage, setCurrentPage] = useState(0)
  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.up("sm"))
  const ismdScreen = useMediaQuery(theme.breakpoints.up("md"))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
  const isXtraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"))

  const pageSize = useCallback(() => {
    if (isXtraLargeScreen) return 5
    if (isLargeScreen) return 4
    if (ismdScreen) return 3
    if (isSmScreen) return 2
    return 1
  }, [isLargeScreen, isSmScreen, isXtraLargeScreen, ismdScreen])

  const pageItems = useMemo(
    () =>
      items.slice(
        currentPage * pageSize(),
        currentPage * pageSize() + pageSize(),
      ),
    [currentPage, items, pageSize],
  )

  const handleClickPrev = () => {
    if (currentPage === 0) return

    setCurrentPage((prev) => prev - 1)
  }
  const handleClickNext = () => {
    const lastElementIndex = currentPage * pageSize() + pageSize()

    if (lastElementIndex >= items.length - 1) return

    setCurrentPage((prev) => prev + 1)
  }

  const hasNext = currentPage * pageSize() + pageSize() < items.length - 1

  const hasPrev = currentPage > 0

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        flexWrap: "nowrap",
        height: "90%",
        marginBottom: 5,
      }}
    >
      <IconButton
        variant="outlined"
        size="sm"
        onClick={handleClickPrev}
        sx={{
          marginY: 5,
          marginX: 0,
          display: "inline-flex",
          width: "auto",
          flexGrow: 0,
        }}
        disabled={!hasPrev}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xl: "1fr 1fr 1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            md: "1fr 1fr 1fr",
            sm: "minmax(100px, 1fr) minmax(100px, 1fr)",
            xs: "minmax(100px, 1fr)",
          },
          gridTemplateRows: "1fr",
          flexGrow: 1,
          columnGap: 5,
          rowGap: 5,
          wrap: "nowrap",
          width: "100%",
        }}
      >
        {pageItems.map((item) => (
          <Card
            sx={{
              margin: 1,
              flexGrow: 1,
              "&:hover": {
                boxShadow: "md",
                outline: "#fff solid 2px",
                backgroundColor:
                  "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
              },
            }}
            key={isVod(item) ? item.stream_id : item.series_id}
          >
            <CardCover>
              <img
                src={isVod(item) ? item.stream_icon : item.cover}
                loading="lazy"
                alt=""
              />
            </CardCover>
            <CardCover
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
              }}
            />
            <CardContent sx={{ justifyContent: "flex-end", height: 40 }}>
              <div style={{ display: "grid", gridTemplateRows: "30px 10px" }}>
                <Typography
                  level="title-lg"
                  textColor="#fff"
                  textOverflow="ellipsis"
                  overflow="clip"
                >
                  <Link
                    overlay
                    underline="none"
                    textColor="inherit"
                    textOverflow="ellipsis"
                    onClick={() => onStreamClick(item)}
                  >
                    {item.name}
                  </Link>
                </Typography>
                <Typography level="body-sm" textColor="neutral.300">
                  {item.rating}/10
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
      <IconButton
        variant="outlined"
        size="sm"
        onClick={handleClickNext}
        sx={{ marginY: 5, display: "inline-flex" }}
        disabled={!hasNext}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  )
}
