import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../store/hooks"
import {
  selectAccountInfo,
  selectLiveCategories,
  selectLiveStreams,
  selectPreferredBaseUrl,
} from "../store/app/selector"
import {
  AspectRatio,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
} from "@mui/joy"
import { Category, LiveStream } from "../services/XtremeCodesAPI.types"
import { KeyboardArrowRight } from "@mui/icons-material"
import { containerToMimeType, getLiveUrl } from "../services/utils"
import videojs from "video.js"
import Player from "video.js/dist/types/player"
import { VideoPlayer } from "../components/VideoPlayer"

export const LiveTV: FC = () => {
  const liveStreams = useAppSelector(selectLiveStreams)
  const liveStreamCategories = useAppSelector(selectLiveCategories)
  const accountInfo = useAppSelector(selectAccountInfo)
  const baseUrl = useAppSelector(selectPreferredBaseUrl)
  const [selectedStream, setSelectedStream] = useState<LiveStream | undefined>(
    undefined,
  )
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)
  const playerRef = useRef<Player | null>(null)

  console.log(liveStreams)

  useEffect(() => {
    const firstCategory = liveStreamCategories.find(
      (item) => item.category_id !== undefined,
    )
    setSelectedCategory(firstCategory)
    setSelectedStream(
      liveStreams.filter(
        (stream) => stream.category_id === firstCategory?.category_id,
      )[0],
    )
  }, [liveStreamCategories, liveStreams])

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
          src: getLiveUrl(
            baseUrl,
            accountInfo.user_info?.username ?? "",
            accountInfo.user_info?.password ?? "",
            `${selectedStream?.stream_id}`,
            "m3u8",
          ),
          type: containerToMimeType("m3u8"),
        },
      ],
    }
  }, [accountInfo, baseUrl, selectedStream])

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
                <ListItem key={liveStream.stream_id} sx={{ height: "100px" }}>
                  <ListItemDecorator></ListItemDecorator>
                  <ListItemButton
                    onClick={() => setSelectedStream(liveStream)}
                    selected={selectedStream === liveStream}
                  >
                    <AspectRatio
                      objectFit="cover"
                      variant="plain"
                      sx={{
                        width: "100px",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <img src={liveStream.stream_icon} alt="" />
                    </AspectRatio>
                    {liveStream.name}
                  </ListItemButton>
                  <ListItemContent></ListItemContent>
                </ListItem>
              ))}
            </List>
          </Sheet>
        </Grid>
      </Grid>
    </Box>
  )
}
