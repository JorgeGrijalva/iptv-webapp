import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import {
  SeriesEpisode,
  SeriesStream,
} from "../../services/XtremeCodesAPI.types"
import Player from "video.js/dist/types/player"
import { useAppSelector } from "../../store/hooks"
import { selectSeriesStreams } from "../../store/app/selector"
import { VideoPlayer } from "../../components/VideoPlayer"
import videojs from "video.js"
import { Box, Grid, Typography } from "@mui/joy"
import { SeriesInfoComponent } from "../../components/SeriesInfoComponent"
import { containerToMimeType } from "../../services/utils"
import { useEpisodeUrl } from "../../components/useMediaUrl"

export const WatchSeries: FC = () => {
  const { id } = useParams()
  const seriesStreams = useAppSelector(selectSeriesStreams)
  const [stream, setStream] = useState<SeriesStream | undefined>(undefined)
  const [selectedEpisode, setSelectedEpisode] = useState<
    SeriesEpisode | undefined
  >(undefined)
  const playerRef = useRef<Player | null>(null)
  const url = useEpisodeUrl(
    selectedEpisode?.id ?? 0,
    selectedEpisode?.container_extension ?? "",
  )

  useEffect(() => {
    const stream = seriesStreams.find(
      (stream) => stream.series_id === Number(id),
    )

    if (!stream) return

    setStream(stream)
  }, [id, seriesStreams])

  const videoJsOptions = useCallback(() => {
    return {
      autoplay: false,
      preload: "none",
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: url,
          type: containerToMimeType(selectedEpisode?.container_extension ?? ""),
        },
      ],
      poster: selectedEpisode?.info?.movie_image,
    }
  }, [selectedEpisode, url])

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player

    player.on("error", (e: any) => {
      console.log(e)
    })

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting")
    })

    player.on("dispose", () => {
      videojs.log("player will dispose")
    })
  }

  const onSelectEpisode = (episode: SeriesEpisode) => {
    setSelectedEpisode(episode)
  }

  return (
    <>
      {stream && (
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            height: "100%",
            paddingBottom: 5,
          }}
        >
          <Grid container>
            <Grid xs={12} sm={12}>
              <Typography
                justifyContent="center"
                alignContent="center"
                textAlign="center"
              >
                {selectedEpisode?.title ?? stream.name}
              </Typography>
            </Grid>
            {selectedEpisode && (
              <Grid xs={12} sm={12}>
                <VideoPlayer
                  options={videoJsOptions()}
                  onReady={handlePlayerReady}
                />
              </Grid>
            )}
            <Grid>
              <SeriesInfoComponent
                series={stream}
                onSelectEpisode={onSelectEpisode}
                selectedEpisode={selectedEpisode}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {!stream && <div>There was an error loadig that title</div>}
    </>
  )
}
