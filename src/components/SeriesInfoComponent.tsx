import { FC } from "react"
import { SeriesStream } from "../services/XtremeCodesAPI.types"

export interface SeriesInfoProps {
  series: SeriesStream
}

export const SeriesInfoComponent: FC<SeriesInfoProps> = (props) => {
  return <div>hello</div>
}
