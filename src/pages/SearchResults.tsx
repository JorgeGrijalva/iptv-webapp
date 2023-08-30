import { Typography } from "@mui/joy"
import { FC, useCallback, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { MediaCarousel } from "../components/MediaCarousel"
import { useAppSelector } from "../store/hooks"
import { selectSeriesStreams, selectVodStreams } from "../store/app/selector"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"
import { MediaInfoModal } from "../components/MediaInfoModal"

export const SearchResults: FC = () => {
  const [searchParams] = useSearchParams()
  const seriesStreams = useAppSelector(selectSeriesStreams)
  const vodStreams = useAppSelector(selectVodStreams)
  const [selectedTitle, setSelectedTitle] = useState<
    (VodStream | SeriesStream) | undefined
  >(undefined)

  const query = searchParams.get("query")

  const onStreamClick = (stream: VodStream | SeriesStream) => {
    setSelectedTitle(stream)
  }

  const filteredSeries = useCallback(() => {
    if (!query) return []

    return seriesStreams.filter((stream) =>
      stream.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    )
  }, [query, seriesStreams])

  const filteredMovies = useCallback(() => {
    if (!query) return []

    return vodStreams.filter((stream) =>
      stream.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    )
  }, [query, vodStreams])

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
                items={filteredMovies()}
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
                items={filteredSeries()}
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
