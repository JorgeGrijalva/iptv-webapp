import { Typography, Box, Chip } from "@mui/joy"
import { FC, useCallback, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MediaCarousel } from "../components/MediaCarousel"
import { useAppSelector } from "../store/hooks"
import {
  selectLiveStreams,
  selectSeriesStreams,
  selectVodStreams,
} from "../store/app/selector"
import {
  LiveStream,
  SeriesStream,
  VodStream,
} from "../services/XtremeCodesAPI.types"
import { MediaInfoModal } from "../components/MediaInfoModal"
import { isLive } from "../services/utils"
import { urls } from "../services/urls"
import queryString from "query-string"

export const SearchResults: FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const seriesStreams = useAppSelector(selectSeriesStreams)
  const vodStreams = useAppSelector(selectVodStreams)
  const liveStreams = useAppSelector(selectLiveStreams)
  const [selectedTitle, setSelectedTitle] = useState<
    (VodStream | SeriesStream) | undefined
  >(undefined)

  const query = searchParams.get("query")

  const onStreamClick = (stream: VodStream | SeriesStream | LiveStream) => {
    if (isLive(stream)) {
      navigate({
        pathname: urls.liveTv,
        search: queryString.stringify({ channel: stream.stream_id }),
      })
    } else setSelectedTitle(stream)
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

  const filteredChannels = useCallback(() => {
    if (!query) return []

    return liveStreams.filter((stream) =>
      stream.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    )
  }, [liveStreams, query])

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflow: "auto",
        paddingBottom: 5,
        background: "linear-gradient(to bottom, #000000, #1a1a1a)",
      }}
    >
      {selectedTitle && (
        <MediaInfoModal
          onClose={() => setSelectedTitle(undefined)}
          stream={selectedTitle}
        />
      )}
      <Box
        sx={{
          padding: {
            xs: 2,
            sm: 4,
          },
        }}
      >
        {query && (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography
                level="h2"
                sx={{
                  background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  mb: 3,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: {
                    xs: "1.75rem",
                    sm: "2.125rem",
                  },
                }}
              >
                Resultados de búsqueda
              </Typography>
              <Typography
                level="body-sm"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                }}
              >
                Búsqueda para: "{query}"
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                level="title-lg"
                sx={{
                  color: "white",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Películas
                <Chip
                  size="sm"
                  variant="soft"
                  sx={{
                    background: "rgba(79, 172, 254, 0.15)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {filteredMovies().length}
                </Chip>
              </Typography>
              {filteredMovies().length > 0 ? (
                <MediaCarousel
                  items={filteredMovies()}
                  onStreamClick={onStreamClick}
                  key={query}
                />
              ) : (
                <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                  No se encontraron resultados
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                level="title-lg"
                sx={{
                  color: "white",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Series
                <Chip
                  size="sm"
                  variant="soft"
                  sx={{
                    background: "rgba(79, 172, 254, 0.15)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {filteredSeries().length}
                </Chip>
              </Typography>
              {filteredSeries().length > 0 ? (
                <MediaCarousel
                  items={filteredSeries()}
                  onStreamClick={onStreamClick}
                  key={query}
                />
              ) : (
                <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                  No se encontraron resultados
                </Typography>
              )}
            </Box>

            <Box>
              <Typography
                level="title-lg"
                sx={{
                  color: "white",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Canales
                <Chip
                  size="sm"
                  variant="soft"
                  sx={{
                    background: "rgba(79, 172, 254, 0.15)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {filteredChannels().length}
                </Chip>
              </Typography>
              {filteredChannels().length > 0 ? (
                <MediaCarousel
                  items={filteredChannels()}
                  onStreamClick={onStreamClick}
                  key={query}
                />
              ) : (
                <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
                  No se encontraron resultados
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
