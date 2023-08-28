import { FC, useEffect, useState } from "react"
import { VodInfo, VodStream } from "../services/XtremeCodesAPI.types"
import { AspectRatio, Button, ButtonGroup, Grid, Typography } from "@mui/joy"
import { useAppDispatch } from "../store/hooks"
import { fetchVODInfo } from "../store/app/thunks"
import { YoutubeVideo } from "./YoutubeVideo"
import { useNavigate } from "react-router-dom"
import { urls } from "../services/urls"
import { Loading } from "./layout/Loading"

export interface VodInfoProps {
  vod: VodStream
}

export const VodInfoComponent: FC<VodInfoProps> = (props) => {
  const { vod } = props
  const [info, setInfo] = useState<VodInfo | undefined>(undefined)
  const [trailerVisible, setTrailerVisible] = useState(false)
  const [state, setState] = useState<"loading" | "ready" | "error">("loading")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!vod || !vod.stream_id) return

    dispatch(fetchVODInfo({ vodId: vod.stream_id }))
      .unwrap()
      .then((info) => {
        setInfo(info)
        setState("ready")
      })
      .catch((e) => {
        console.log(e)
        setState("error")
      })
  }, [dispatch, vod])

  if (state === "loading") return <Loading />

  const onClickWatch = () => {
    if (vod.stream_id === undefined) return

    navigate(urls.movieWatch.replace(":id", vod.stream_id.toString()))
  }

  const showTrailer = trailerVisible && info?.info?.youtube_trailer

  return (
    <Grid
      container
      spacing={1}
      columns={12}
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        marginTop: 5,
      }}
      overflow="auto"
    >
      <Grid
        xs={12}
        sm={12}
        md={5}
        justifyContent="center"
        alignContent="center"
      >
        {showTrailer && <YoutubeVideo id={info?.info?.youtube_trailer ?? ""} />}
        {!showTrailer && (
          <AspectRatio objectFit="contain" variant="plain">
            <img src={vod.stream_icon} alt={""} />
          </AspectRatio>
        )}
      </Grid>
      <Grid xs={12} sm={12} md={7}>
        {state === "ready" && (
          <div style={{ justifyContent: "center" }}>
            <Typography level="body-lg" marginBottom={1}>
              {info?.info?.plot}
            </Typography>
            <Typography>
              <b>Release Date:</b> {info?.info?.releasedate}
            </Typography>
            <Typography>
              <b>Duration:</b> {info?.info?.duration}
            </Typography>
            <Typography>
              <b>Genre:</b> {info?.info?.genre}
            </Typography>
            <Typography>
              <b>Cast:</b> {info?.info?.cast}
            </Typography>
            <ButtonGroup sx={{ margin: 5 }} spacing="0.5rem">
              <Button
                variant="solid"
                color="neutral"
                onClick={() => setTrailerVisible((prev) => !prev)}
              >
                Watch Trailer
              </Button>
              <Button variant="solid" color="primary">
                Add to Watchlist
              </Button>
              <Button variant="solid" color="success" onClick={onClickWatch}>
                Play
              </Button>
            </ButtonGroup>
          </div>
        )}
        {state === "error" && (
          <Typography level="body-lg" marginBottom={1}>
            There was an error loading that title
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
