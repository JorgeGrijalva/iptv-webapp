import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import {
  SeriesEpisode,
  SeriesStream,
} from "../../services/XtremeCodesAPI.types"
import Player from "video.js/dist/types/player"
import { useAppSelector } from "../../store/hooks"
import {
  selectAppState,
  selectPreferredBaseUrl,
} from "../../store/app/selector"
import { VideoPlayer } from "../../components/VideoPlayer"
import videojs from "video.js"
import { Grid, Typography } from "@mui/joy"
import { SeriesInfoComponent } from "../../components/SeriesInfoComponent"
import { containerToMimeType } from "../../services/utils"

export const WatchSeries: FC = () => {
  const { id } = useParams()
  const { accountInfo, seriesStreams } = useAppSelector(selectAppState)
  const [stream, setStream] = useState<SeriesStream | undefined>(undefined)
  const [selectedEpisode, setSelectedEpisode] = useState<
    SeriesEpisode | undefined
  >(undefined)
  const playerRef = useRef<Player | null>(null)
  const baseUrl = useAppSelector(selectPreferredBaseUrl)

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
          src: `${baseUrl}/series/${accountInfo.user_info?.username}/${accountInfo.user_info?.password}/${selectedEpisode?.id}.${selectedEpisode?.container_extension}`,
          type: `video/${containerToMimeType(
            selectedEpisode?.container_extension ?? "",
          )}`,
        },
      ],
      poster: selectedEpisode?.info?.movie_image,
    }
  }, [accountInfo, baseUrl, selectedEpisode])

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
        <div
          style={{
            flexGrow: 1,
            justifyContent: "center",
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr",
            overflow: "auto",
            height: "100%",
            width: "100%",
          }}
        >
          <Grid xs={12} sm={12} justifyContent="center" alignContent="center">
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
        </div>
      )}
      {!stream && <div>There was an error loadig that title</div>}
    </>
  )
}
