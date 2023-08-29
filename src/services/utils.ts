import { get, set } from "idb-keyval"
import { SeriesStream, VodStream } from "./XtremeCodesAPI.types"

export const localStorageSet = (key: string, data: string): Promise<void> => {
  return set(key, data)
}

export const localStorageGet = (
  key: string,
): Promise<string | null | undefined> => {
  return get(key)
}

export const getDateForTimestamp = (seconds: number): Date => {
  return new Date(seconds * 1000)
}

export const isVod = (
  stream: VodStream | SeriesStream,
): stream is VodStream => {
  return (stream as VodStream).stream_id !== undefined
}

export const containerToMimeType = (container: string): string => {
  switch (container) {
    case "mkv":
      return "webm"
    case "avi":
      return "x-msvideo"
    case "3gp":
      return "3gpp"
    case ".mpg":
    case "mpeg":
      return "mpeg"
    case "ogg":
    case "ogv":
      return "ogg"
    default:
      return container
  }
}
