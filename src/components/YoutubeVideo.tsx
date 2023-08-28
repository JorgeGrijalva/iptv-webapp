import { FC } from "react"

export interface YoutubeVideoProps {
  id: string
}

export const YoutubeVideo: FC<YoutubeVideoProps> = (props) => {
  const { id } = props

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        paddingTop: "56.25%",
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?si=p5bOlROHFbkRXQw-`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </div>
  )
}
