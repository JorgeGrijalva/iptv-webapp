import { Box, Typography } from "@mui/joy"
import { FC, useEffect, useState } from "react"
import { VodInfoComponent } from "../components/VodInfoComponent"
import { useParams } from "react-router-dom"
import { VodStream } from "../services/XtremeCodesAPI.types"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"

export const AboutMovie: FC = (props) => {
  const { id } = useParams()
  const { vodStreams } = useAppSelector(selectAppState)
  const [currentMovie, setCurrentMovie] = useState<VodStream | undefined>(
    undefined,
  )

  useEffect(() => {
    const stream = vodStreams.find((stream) => stream.stream_id === Number(id))

    if (!stream) return

    setCurrentMovie(stream)
  }, [id, vodStreams])

  return (
    <Box>
      {currentMovie && (
        <>
          <Typography
            component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            justifyContent="center"
            display="flex"
          >
            {currentMovie.name}
          </Typography>
          <VodInfoComponent vod={currentMovie} />
        </>
      )}
      {!currentMovie && (
        <>
          <Typography
            component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            justifyContent="center"
            display="flex"
          >
            Movie not found!
          </Typography>
          <Typography level="body-lg" marginBottom={1} marginTop={5}>
            The movie with id {id} was not found. If you think this is an error,
            try reloading your playlists under Account Settings
          </Typography>
        </>
      )}
    </Box>
  )
}
