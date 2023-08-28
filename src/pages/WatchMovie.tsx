import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { VideoPlayer } from "../components/VideoPlayer"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import { VodStream } from "../services/XtremeCodesAPI.types"

export const WatchMovie: FC = (props) => {
  const { id } = useParams()
  const { accountInfo, vodStreams } = useAppSelector(selectAppState)
  const [stream, setStream] = useState<VodStream | undefined>(undefined)

  useEffect(() => {
    const stream = vodStreams.find((stream) => stream.stream_id === Number(id))

    if (!stream) return

    setStream(stream)
  }, [id, vodStreams])

  const url = `${accountInfo.server_info?.server_protocol}://${accountInfo.server_info?.url}:${accountInfo.server_info?.port}/movie/${accountInfo.user_info?.username}/${accountInfo.user_info?.password}/${id}.${stream?.container_extension}`

  return (
    <>
      {stream && <VideoPlayer url={url} poster={stream.stream_icon || ""} />}
      {!stream && <div>There was an error loadig that title</div>}
    </>
  )
}
