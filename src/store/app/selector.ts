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

export const selectPreferredBaseUrl = createSelector(
  selectAccountInfo,
  (accountInfo) =>
    `${accountInfo.server_info?.server_protocol}://${accountInfo.server_info?.url}:${accountInfo.server_info?.port}`,
)
