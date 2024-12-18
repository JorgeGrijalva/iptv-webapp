import { FC, useEffect, useRef } from "react"
import videojs from "video.js"
import Player from "video.js/dist/types/player"
import "video.js/dist/video-js.css"

export interface VideoPlayerProps {
  options: any
  onReady?: (player: Player) => void
}

export const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const { options, onReady } = props
  const videoRef = useRef<HTMLDivElement | null>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      if (!videoRef.current) return

      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js")

      videoElement.classList.add("vjs-big-play-centered")
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready")
        onReady && onReady(player)
      }))

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current

      if (player.currentSrc() === options.sources[0].src) {
        videojs.log("not changed source")
        return
      }
      //player.autoplay(options.autoplay)
      player.options(options)
      player.updateSourceCaches_(options.sources)
      player.poster(options.poster)
      player.src(options.sources)
      //player.src(options.url)
      //player.load()
    }
  }, [videoRef, options, onReady])

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  )
}
