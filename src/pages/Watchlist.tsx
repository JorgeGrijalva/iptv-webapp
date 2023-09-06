import {
  Box,
  Card,
  CardContent,
  CardCover,
  Grid,
  Link,
  Typography,
} from "@mui/joy"
import { FC, useCallback, useState } from "react"
import { useAppSelector } from "../store/hooks"
import {
  selectSeriesStreams,
  selectVodStreams,
  selectWatchlist,
} from "../store/app/selector"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"
import { isVod } from "../services/utils"
import { MediaInfoModal } from "../components/MediaInfoModal"

export const Watchlist: FC = () => {
  const watchlist = useAppSelector(selectWatchlist)
  const vodStreams = useAppSelector(selectVodStreams)
  const seriesStreams = useAppSelector(selectSeriesStreams)
  const [selectedStream, setSelectedStream] = useState<
    (VodStream | SeriesStream) | undefined
  >(undefined)

  const watchlistItems = useCallback(() => {
    const items: (VodStream | SeriesStream)[] = []

    for (const item of watchlist) {
      if (item.type === "vod") {
        const vod = vodStreams.find((element) => element.stream_id === item.id)
        if (vod) items.push(vod)
      } else {
        const series = seriesStreams.find(
          (element) => element.series_id === item.id,
        )
        if (series) items.push(series)
      }
    }

    return items
  }, [seriesStreams, vodStreams, watchlist])

  return (
    <>
      {selectedStream && (
        <MediaInfoModal
          onClose={() => setSelectedStream(undefined)}
          stream={selectedStream}
        />
      )}
      <Box
        sx={{ flexGrow: 1, overflow: "auto", height: "100%", paddingBottom: 5 }}
      >
        <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
          {watchlistItems().map((item, index) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={300}
            >
              <Card
                sx={{
                  height: 300,
                  margin: 1,
                  flexGrow: 1,
                  "&:hover": {
                    boxShadow: "md",
                    outline: "#fff solid 2px",
                    backgroundColor:
                      "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
                  },
                }}
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
                  <div
                    style={{ display: "grid", gridTemplateRows: "30px 10px" }}
                  >
                    <Typography level="title-lg" textColor="#fff" noWrap>
                      <Link
                        overlay
                        underline="none"
                        textColor="inherit"
                        textOverflow="ellipsis"
                        onClick={() => setSelectedStream(item)}
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
