import { Typography } from "@mui/joy"
import { FC, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { MediaCarousel } from "../components/MediaCarousel"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"
import { MediaInfoModal } from "../components/MediaInfoModal"

export const SearchResults: FC = () => {
  const [searchParams] = useSearchParams()
  const { vodStreams, seriesStreams } = useAppSelector(selectAppState)
  const [selectedTitle, setSelectedTitle] = useState<
    (VodStream | SeriesStream) | undefined
  >(undefined)

  const query = searchParams.get("query")

  const onStreamClick = (stream: VodStream | SeriesStream) => {
    setSelectedTitle(stream)
  }

  return (
    <>
      {selectedTitle && (
        <MediaInfoModal
          onClose={() => setSelectedTitle(undefined)}
          stream={selectedTitle}
        />
      )}
      <div style={{ overflow: "auto" }}>
        {query && (
          <>
            <div style={{ height: 315 }}>
              <Typography
                level="title-lg"
                justifyContent="center"
                display="flex"
              >
                Movies
              </Typography>
              <MediaCarousel
                items={vodStreams.filter((stream) =>
                  stream.name
                    ?.toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase()),
                )}
                onStreamClick={onStreamClick}
                key={query}
              />
            </div>
            <div style={{ height: 315 }}>
              <Typography
                level="title-lg"
                justifyContent="center"
                display="flex"
              >
                Series
              </Typography>
              <MediaCarousel
                items={seriesStreams.filter((stream) =>
                  stream.name
                    ?.toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase()),
                )}
                onStreamClick={onStreamClick}
                key={query}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
