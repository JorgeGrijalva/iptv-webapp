import { FC } from "react"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"
import { Box, Modal, ModalClose, Typography } from "@mui/joy"
import { VodInfoComponent } from "./VodInfoComponent"
import { isVod } from "../services/utils"
import { SeriesInfoComponent } from "./SeriesInfoComponent"

export interface MediaInfoModalProps {
  onClose: () => void
  stream: VodStream | SeriesStream
}

export const MediaInfoModal: FC<MediaInfoModalProps> = (props) => {
  const { onClose, stream } = props

  return (
    <Modal open={true} onClose={onClose}>
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
          <VodInfoComponent vod={stream} />
        ) : (
          <SeriesInfoComponent series={stream} />
        )}
      </Box>
    </Modal>
  )
}
