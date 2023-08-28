import { Link } from "@mui/joy"
import { FC } from "react"

export interface VideoPlayerProps {
  url: string
  poster: string
}

export const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const { url, poster } = props

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <video
        src={url}
        controls
        poster={poster}
        style={{ objectFit: "contain" }}
      >
        Sorry, your browser doesn't support playing this video format, but don't
        worry, you can
        <Link href={url}>download it</Link>
        and watch it with your favorite video player!
      </video>
    </div>
  )
}
