import { FC, useState } from "react"
import { selectAppState } from "../store/app/selector"
import { useAppSelector } from "../store/hooks"
import { VodStream } from "../services/XtremeCodesAPI.types"
import { MediaInfoModal } from "../components/MediaInfoModal"
import { MediaVirtualizedList } from "../components/MediaVirtualizedList"

export const Movies: FC = () => {
  const { vodStreams, vodCategories } = useAppSelector(selectAppState)
  const [currentMovie, setCurrentMovie] = useState<VodStream | undefined>(
    undefined,
  )

  const onMovieClick = (movie: VodStream) => {
    console.log(movie)
    setCurrentMovie(movie)
  }

  return (
    <>
      {currentMovie && (
        <MediaInfoModal
          onClose={() => setCurrentMovie(undefined)}
          stream={currentMovie}
        />
      )}
      <MediaVirtualizedList
        categories={vodCategories}
        streams={vodStreams}
        onStreamClick={onMovieClick}
      />
    </>
  )
}
