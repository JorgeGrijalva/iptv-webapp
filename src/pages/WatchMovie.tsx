import { FC, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { VideoPlayer } from "../components/VideoPlayer"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import { VodStream } from "../services/XtremeCodesAPI.types"
import Player from "video.js/dist/types/player"
import videojs from "video.js"

export const WatchMovie: FC = (props) => {
  const { id } = useParams()
  const { accountInfo, vodStreams } = useAppSelector(selectAppState)
  const [stream, setStream] = useState<VodStream | undefined>(undefined)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    const stream = vodStreams.find((stream) => stream.stream_id === Number(id))

    if (!stream) return

    setStream(stream)
  }, [id, vodStreams])

  const url = `${accountInfo.server_info?.server_protocol}://${accountInfo.server_info?.url}:${accountInfo.server_info?.port}/movie/${accountInfo.user_info?.username}/${accountInfo.user_info?.password}/${id}.${stream?.container_extension}`

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: url,
        type: `video/${stream?.container_extension}`,
      },
    ],
  }

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting")
    })

    player.on("dispose", () => {
      videojs.log("player will dispose")
    })
  }

  return (
    <>
      {stream && (
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      )}
      {!stream && <div>There was an error loadig that title</div>}
    </>
  )
}
