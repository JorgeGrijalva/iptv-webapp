import { FC, useState } from "react"
import { SeriesStream } from "../services/XtremeCodesAPI.types"
import { useAppSelector } from "../store/hooks"
import { selectAppState } from "../store/app/selector"
import { MediaInfoModal } from "../components/MediaInfoModal"
import { MediaVirtualizedList } from "../components/MediaVirtualizedList"

export const TVSeries: FC = () => {
  const { seriesCategories, seriesStreams } = useAppSelector(selectAppState)
  const [currentSeries, setCurrentSeries] = useState<SeriesStream | undefined>(
    undefined,
  )

  const onSeriesClick = (series: SeriesStream) => {
    console.log(series)
    setCurrentSeries(series)
  }

  return (
    <>
      {currentSeries && (
        <MediaInfoModal
          onClose={() => setCurrentSeries(undefined)}
          stream={currentSeries}
        />
      )}
      <MediaVirtualizedList
        categories={seriesCategories}
        streams={seriesStreams}
        onStreamClick={onSeriesClick}
      />
    </>
  )
}
