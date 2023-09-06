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

export const getVodUrl = (
  baseUrl: string,
  username: string,
  password: string,
  filename: string,
) => {
  return `${baseUrl}/movie/${username}/${password}/${filename}`
}

export const getEpisodeUrl = (
  baseUrl: string,
  username: string,
  password: string,
  filename: string,
) => {
  return `${baseUrl}/series/${username}/${password}/${filename}`
}

export const getLiveUrl = (
  baseUrl: string,
  username: string,
  password: string,
  id: string,
  format: string,
) => {
  return `${baseUrl}/live/${username}/${password}/${id}.${format}`
}

export const containerToMimeType = (container: string): string => {
  switch (container) {
    case "mkv":
      return "video/webm"
    case "mp4":
    case "mov":
    case "m4v":
      return "video/mp4"
    case "avi":
      return "video/x-msvideo"
    case "3gp":
      return "video/3gpp"
    case "mpg":
    case "mpeg":
      return "video/mpeg"
    case "ogg":
    case "ogv":
    case "opus":
      return "video/ogg"
    case "mpd":
      return "application/dash+xml"
    case "m3u8":
      return "application/x-mpegURL"
    default:
      return `video/${container}`
  }
}
