import { FC, useRef, useState } from "react"
import { SeriesStream } from "../services/XtremeCodesAPI.types"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import { useVirtualizer } from "@tanstack/react-virtual"
import { MediaCarousel } from "../components/MediaCarousel"
import { Box, Modal, ModalClose, Typography } from "@mui/joy"
import { SeriesInfoComponent } from "../components/SeriesInfoComponent"

export const TVSeries: FC = (props) => {
  const { seriesCategories, seriesStreams } = useAppSelector(selectAppState)
  const [currentSeries, setCurrentSeries] = useState<SeriesStream | undefined>(
    undefined,
  )
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: seriesCategories.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 5,
    paddingEnd: 50,
  })

  const onSeriesClick = (series: SeriesStream) => {
    console.log(series)
    setCurrentSeries(series)
  }

  return (
    <>
      {currentSeries && (
        <Modal
          open={!!currentSeries}
          onClose={() => setCurrentSeries(undefined)}
        >
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
              {currentSeries?.name}
            </Typography>
            <SeriesInfoComponent series={currentSeries} />
          </Box>
        </Modal>
      )}
      <div
        ref={parentRef}
        style={{
          //width: "100%",
          height: "100%",
          //maxHeight: "100%",
          //maxWidth: "100%",
          overflow: "auto",
          position: "relative",
          margin: -16,
          //overflow: "hidden",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
            //overflow: "auto",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const category = seriesCategories[virtualItem.index]
            return (
              <div
                key={virtualItem.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: `${virtualItem.size}px`,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Typography
                  level="title-lg"
                  justifyContent="center"
                  display="flex"
                >
                  {category.category_name}
                </Typography>
                <MediaCarousel
                  items={seriesStreams.filter(
                    (stream) => stream.category_id === category.category_id,
                  )}
                  onStreamClick={onSeriesClick}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
