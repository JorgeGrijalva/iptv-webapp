import {
  selectAccountInfo,
  selectPreferredBaseUrl,
} from "../store/app/selector"
import { useAppSelector } from "../store/hooks"

export function useVodUrl(vodId: number, extension: string) {
  const accountInfo = useAppSelector(selectAccountInfo)
  const baseUrl = useAppSelector(selectPreferredBaseUrl)

  return `${baseUrl}/movie/${accountInfo.user_info?.username}/${accountInfo.user_info?.password}/${vodId}.${extension}`
}

export function useEpisodeUrl(episodeStreamId: number, extension: string) {
  const accountInfo = useAppSelector(selectAccountInfo)
  const baseUrl = useAppSelector(selectPreferredBaseUrl)

  return `${baseUrl}/series/${accountInfo.user_info?.username}/${accountInfo.user_info?.password}/${episodeStreamId}.${extension}`
}

export function useChannelUrl(channelId: number, format: string) {
  const accountInfo = useAppSelector(selectAccountInfo)
  const baseUrl = useAppSelector(selectPreferredBaseUrl)

  return `${baseUrl}/live/${accountInfo.user_info?.username}/${accountInfo.user_info?.password}/${channelId}.${format}`
}
