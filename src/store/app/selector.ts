import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

export const selectAppState = (state: RootState) => state.app

export const selectAppStatus = createSelector(
  selectAppState,
  (app) => app.status,
)

export const selectAccountInfo = createSelector(
  selectAppState,
  (app) => app.accountInfo,
)

export const selectLiveStreams = createSelector(
  selectAppState,
  (app) => app.liveStreams,
)

export const selectVodStreams = createSelector(
  selectAppState,
  (app) => app.vodStreams,
)

export const selectSeriesStreams = createSelector(
  selectAppState,
  (app) => app.seriesStreams,
)

export const selectLiveCategories = createSelector(
  selectAppState,
  (app) => app.liveCategories,
)

export const selectVodCategories = createSelector(
  selectAppState,
  (app) => app.vodCategories,
)

export const selectSeriesCategories = createSelector(
  selectAppState,
  (app) => app.seriesCategories,
)

export const selectWatchlist = createSelector(
  selectAppState,
  (app) => app.watchlist,
)

export const selectPreferredBaseUrl = createSelector(
  selectAccountInfo,
  (accountInfo) =>
    `${accountInfo.server_info?.server_protocol}://${accountInfo.server_info?.url}:${accountInfo.server_info?.port}`,
)
