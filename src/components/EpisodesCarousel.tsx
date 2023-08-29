import { FC, useCallback, useMemo, useState } from "react"
import { SeriesEpisode } from "../services/XtremeCodesAPI.types"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { Box, Card, CardContent, IconButton, Link, Typography } from "@mui/joy"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export interface EpisodesCarouselProps {
  episodes: SeriesEpisode[]
  activeEpisode?: SeriesEpisode
  onEpisodeClick: (episode: SeriesEpisode) => void
}

export const EpisodesCarousel: FC<EpisodesCarouselProps> = (props) => {
  const { episodes, onEpisodeClick, activeEpisode } = props
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
      episodes.slice(
        currentPage * pageSize(),
        currentPage * pageSize() + pageSize(),
      ),
    [currentPage, episodes, pageSize],
  )

  const handleClickPrev = () => {
    if (currentPage === 0) return

    setCurrentPage((prev) => prev - 1)
  }
  const handleClickNext = () => {
    const lastElementIndex = currentPage * pageSize() + pageSize()

    if (lastElementIndex >= episodes.length - 1) return

    setCurrentPage((prev) => prev + 1)
  }

  const hasNext = currentPage * pageSize() + pageSize() < episodes.length - 1

  const hasPrev = currentPage > 0

  console.log(episodes)

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
                backgroundColor:
                  "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
              },
              outline: activeEpisode === item ? "#fff solid 2px" : "",
            }}
            key={item.episode_num}
          >
            <CardContent>
              <div>
                <Typography
                  level="title-lg"
                  textOverflow="ellipsis"
                  overflow="clip"
                >
                  <Link
                    overlay
                    underline="none"
                    textColor="inherit"
                    textOverflow="ellipsis"
                    onClick={() => onEpisodeClick(item)}
                  >
                    {item.title}
                  </Link>
                </Typography>
              </div>
              <div
                style={{
                  height: "100%",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  display: "flex",
                }}
              >
                <Typography
                  level="body-sm"
                  textColor="neutral.300"
                  justifySelf="flex-end"
                  alignSelf="flex-end"
                  display="flex"
                >
                  S{item.season}:E{item.episode_num}
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
