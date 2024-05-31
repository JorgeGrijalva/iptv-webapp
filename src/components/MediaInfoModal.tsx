import { FC, useState } from "react"
import {
  SeriesEpisode,
  SeriesStream,
  VodStream,
} from "../services/XtremeCodesAPI.types"
import { Box, Button, Modal, ModalClose, Typography } from "@mui/joy"
import { VodInfoComponent } from "./VodInfoComponent"
import { isVod } from "../services/utils"
import { SeriesInfoComponent } from "./SeriesInfoComponent"
import { useNavigate } from "react-router-dom"
import { urls } from "../services/urls"

export interface MediaInfoModalProps {
  onClose: () => void
  stream: VodStream | SeriesStream
}

export const MediaInfoModal: FC<MediaInfoModalProps> = (props) => {
  const { onClose, stream } = props
  const navigate = useNavigate()
  const [selectedEpisode, setSelectedEpisode] = useState<
    SeriesEpisode | undefined
  >(undefined) // for series only

  const onClickWatch = () => {
    if (isVod(stream)) {
      if (stream.stream_id === undefined) return

      navigate(urls.movieWatch.replace(":id", stream.stream_id.toString()))
    } else {
      if (stream.series_id === undefined) return

      navigate(urls.seriesWatch.replace(":id", stream.series_id.toString()))
    }
  }

  return (
    <Modal open={true} onClose={onClose} sx={{ overflow: "auto" }}>
      <Box
        sx={{
          minWidth: 300,
          borderRadius: "md",
          p: 3,
        }}
      >
        <ModalClose variant="outlined" />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          justifyContent="center"
          display="flex"
        >
          {stream?.name}
        </Typography>
        {isVod(stream) ? (
          <VodInfoComponent
            vod={stream}
            playButton={
              <Button variant="solid" color="success" onClick={onClickWatch}>
                Play
              </Button>
            }
          />
        ) : (
          <SeriesInfoComponent
            series={stream}
            playButton={
              <Button variant="solid" color="success" onClick={onClickWatch}>
                Play
              </Button>
            }
            selectedEpisode={selectedEpisode}
            onSelectEpisode={(episode) => setSelectedEpisode(episode)}
          />
        )}
      </Box>
    </Modal>
  )
}
