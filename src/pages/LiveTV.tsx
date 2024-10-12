import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../store/hooks"
import { selectLiveCategories, selectLiveStreams } from "../store/app/selector"
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
} from "@mui/joy"
import { Category, LiveStream } from "../services/XtremeCodesAPI.types"
import { KeyboardArrowRight } from "@mui/icons-material"
import { containerToMimeType } from "../services/utils"
import videojs from "video.js"
import Player from "video.js/dist/types/player"
import { VideoPlayer } from "../components/VideoPlayer"
import { ChannelCard } from "../components/ChannelCard"
import { useSearchParams } from "react-router-dom"
import { useChannelUrl } from "../components/useMediaUrl"

export const LiveTV: FC = () => {
  const liveStreams = useAppSelector(selectLiveStreams)
  const liveStreamCategories = useAppSelector(selectLiveCategories)
  const [selectedStream, setSelectedStream] = useState<LiveStream | undefined>(
    undefined,
  )
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)
  const [searchParams, setSearchParams] = useSearchParams()
  const playerRef = useRef<Player | null>(null)
  const url = useChannelUrl(selectedStream?.stream_id ?? 0, "m3u8")

  console.log(liveStreams)
  console.log(selectedStream)

  const channelId = searchParams.get("channel")

  useEffect(() => {
    const firstCategory = liveStreamCategories.find(
      (item) => item.category_id !== undefined,
    )

    if (channelId) {
      const stream = liveStreams.find(
        (stream) => stream.stream_id === Number(channelId),
      )
      if (stream) {
        setSelectedStream(stream)
        const category = liveStreamCategories.find(
          (category) => category.category_id === stream.category_id,
        )
        if (category) setSelectedCategory(category)
        else setSelectedCategory(firstCategory)
      }
      return
    }

    setSelectedCategory(firstCategory)

    setSelectedStream(
      liveStreams
        .filter((stream) => stream.category_id === firstCategory?.category_id)
        .find((item) => item !== undefined),
    )
  }, [channelId, liveStreamCategories, liveStreams])

  const onStreamClick = (stream: LiveStream) => {
    if (stream.stream_id === undefined) return

    setSearchParams((prev) => {
      prev.set("channel", stream.stream_id!.toString())
      return prev
    })
  }

  const categoryLiveStreams = useCallback(() => {
    return liveStreams.filter(
      (stream) => stream.category_id === selectedCategory?.category_id,
    )
  }, [liveStreams, selectedCategory])

  const videoJsOptions = useCallback(() => {
    return {
      autoplay: true,
      preload: "true",
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: url,
          type: containerToMimeType("m3u8"),
        },
      ],
    }
  }, [url])

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

  return (
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
          <VideoPlayer options={videoJsOptions()} onReady={handlePlayerReady} />
        </Grid>
        <Grid>
          <Sheet>
            <List
              variant="outlined"
              orientation="horizontal"
              sx={{
                //minWidth: 240,
                //width: 200,
                //height: "30%",
                borderRadius: "sm",
                overflow: "auto",
              }}
            >
              {liveStreamCategories.map((category) => (
                <ListItem key={category.category_id}>
                  <ListItemButton
                    onClick={() => setSelectedCategory(category)}
                    selected={selectedCategory === category}
                  >
                    <ListItemContent>{category.category_name}</ListItemContent>
                    <KeyboardArrowRight />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List
              variant="outlined"
              orientation="vertical"
              sx={{ borderRadius: "sm", overflow: "auto", maxHeight: "500px" }}
            >
              {categoryLiveStreams().map((liveStream) => (
                <ListItem key={liveStream.stream_id}>
                  <ListItemContent>
                    <Grid
                      container
                      sx={{
                        "--Grid-borderWidth": "1px",
                        borderTop: "var(--Grid-borderWidth) solid",
                        //borderLeft: "var(--Grid-borderWidth) solid",
                        borderBottom: "var(--Grid-borderWidth) solid",
                        borderColor: "divider",
                        "& > div": {
                          borderRight: "var(--Grid-borderWidth) solid",
                          //borderBottom: "var(--Grid-borderWidth) solid",
                          borderColor: "divider",
                        },
                        gap: 0,
                      }}
                    >
                      <Grid sm={2}>
                        <ChannelCard
                          stream={liveStream}
                          onStreamClick={(stream) => onStreamClick(liveStream)}
                        />
                      </Grid>
                      <Grid sm={10}>
                        <div>stuff here</div>
                      </Grid>
                    </Grid>
                  </ListItemContent>
                </ListItem>
              ))}
            </List>
          </Sheet>
        </Grid>
      </Grid>
    </Box>
  )
}
