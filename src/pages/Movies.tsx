import { FC, useCallback, useMemo, useRef, useState } from "react"
import { selectAppState } from "../store/app/selector"
import { useAppSelector } from "../store/hooks"
import { VodStream } from "../services/XtremeCodesAPI.types"
import {
  Box,
  Card,
  CardContent,
  CardCover,
  IconButton,
  Link,
  Modal,
  ModalClose,
  Typography,
} from "@mui/joy"
import { useVirtualizer } from "@tanstack/react-virtual"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { VodInfoComponent } from "../components/VodInfoComponent"

export const Movies: FC = () => {
  const { vodStreams, vodCategories } = useAppSelector(selectAppState)
  const [currentMovie, setCurrentMovie] = useState<VodStream | undefined>(
    undefined,
  )
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: vodCategories.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 5,
    paddingEnd: 50,
  })

  const onMovieClick = (movie: VodStream) => {
    console.log(movie)
    setCurrentMovie(movie)
  }

  console.log(rowVirtualizer.getVirtualItems())

  return (
    <>
      {currentMovie && (
        <Modal open={!!currentMovie} onClose={() => setCurrentMovie(undefined)}>
          <Box
            sx={{
              minWidth: 300,
              borderRadius: "md",
              p: 3,
            }}
          >
            <ModalClose variant="outlined" />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              justifyContent="center"
              display="flex"
            >
              {currentMovie?.name}
            </Typography>
            <VodInfoComponent vod={currentMovie} />
          </Box>
        </Modal>
      )}
      <div
        ref={parentRef}
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "100%",
          maxWidth: "100%",
          overflow: "auto",
          position: "relative",
          //overflow: "hidden",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
            //overflow: "auto",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const category = vodCategories[virtualItem.index]
            return (
              <div
                key={virtualItem.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: `${virtualItem.size}px`,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Typography
                  level="title-lg"
                  justifyContent="center"
                  display="flex"
                >
                  {category.category_name}
                </Typography>
                <MovieCarousel
                  items={vodStreams
                    .filter(
                      (stream) => stream.category_id === category.category_id,
                    )
                    .sort((a, b) => (b.added ?? 0) - (a.added ?? 0))}
                  onStreamClick={onMovieClick}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

interface MovieCarouselProps {
  items: VodStream[]
  onStreamClick: (stream: VodStream) => void
}

const MovieCarousel: FC<MovieCarouselProps> = (props) => {
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

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xl: "32px 1fr 1fr 1fr 1fr 1fr 32px",
          lg: "32px 1fr 1fr 1fr 1fr 32px",
          md: "32px 1fr 1fr 1fr 32px",
          sm: "20px minmax(100px, 1fr) minmax(100px, 1fr) 20px",
          xs: "20px minmax(100px, 1fr) 20px",
        },
        gridTemplateRows: "1fr",
        flexGrow: 1,
        columnGap: 5,
        rowGap: 5,
        wrap: "nowrap",
        width: "100%",
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
      >
        <ArrowBackIcon />
      </IconButton>
      {pageItems.map((item) => (
        <Card
          sx={{
            margin: 1,
            height: 300,
            flexGrow: 1,
            "&:hover": {
              boxShadow: "md",
              outline: "#fff solid 2px",
              backgroundColor:
                "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
            },
          }}
          key={item.stream_id}
        >
          <CardCover>
            <img src={item.stream_icon} loading="lazy" alt="" />
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
      <IconButton
        variant="outlined"
        size="sm"
        onClick={handleClickNext}
        sx={{ marginY: 5, marginRight: 5, display: "inline-flex" }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  )
}
