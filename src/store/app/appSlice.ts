import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  AccountInfo,
  Category,
  LiveStream,
  SeriesStream,
  VodStream,
  XtremeCodesConfig,
} from "../../services/XtremeCodesAPI.types"
import {
  fetchAccountInfo,
  fetchLiveStreamCategories,
  fetchLiveStreams,
  fetchSeriesStreamCategories,
  fetchSeriesStreams,
  fetchVODStreamCategories,
  fetchVODStreams,
  loadApp,
} from "./thunks"
import { localStorageSet } from "../../services/utils"
import { STORAGE_KEY } from "../../services/constants"

export interface AppState {
  status: "needsLoad" | "needsAuth" | "ready"
  apiConfig: XtremeCodesConfig
  search: string
  accountInfo: AccountInfo
  vodCategories: Category[]
  liveCategories: Category[]
  seriesCategories: Category[]
  liveStreams: LiveStream[]
  vodStreams: VodStream[]
  seriesStreams: SeriesStream[]
}

const initialState: AppState = {
  status: "needsLoad",
  apiConfig: { baseUrl: "", auth: { username: "", password: "" } },
  search: "",
  accountInfo: {},
  vodCategories: [],
  liveCategories: [],
  seriesCategories: [],
  liveStreams: [],
  vodStreams: [],
  seriesStreams: [],
}

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setApiConfig: (state, action: PayloadAction<XtremeCodesConfig>) => {
      state.apiConfig = action.payload
      localStorageSet(
        STORAGE_KEY.API_CONFIG,
        JSON.stringify(state.apiConfig),
      ).catch(console.error)
    },
    setAppStatus: (
      state,
      action: PayloadAction<"needsLoad" | "needsAuth" | "ready">,
    ) => {
      state.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApp.fulfilled, (state, action) => {
        state.apiConfig = action.payload.apiConfig
        state.liveCategories = action.payload.liveCategories
        state.vodCategories = action.payload.vodCategories
        state.seriesCategories = action.payload.seriesCategories
        state.liveStreams = action.payload.liveStreams
        state.vodStreams = action.payload.vodStreams
        state.seriesStreams = action.payload.seriesStreams
        state.status = "ready"
      })
      .addCase(loadApp.rejected, (state, action) => {
        state.status = "needsAuth"
        console.log(action.error)
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.accountInfo = action.payload
      })
      .addCase(fetchLiveStreamCategories.fulfilled, (state, action) => {
        state.liveCategories = action.payload

        localStorageSet(
          STORAGE_KEY.LIVE_CATEGORIES,
          JSON.stringify(state.liveCategories),
        ).catch(console.error)
      })
      .addCase(fetchVODStreamCategories.fulfilled, (state, action) => {
        state.vodCategories = action.payload

        localStorageSet(
          STORAGE_KEY.VOD_CATEGORIES,
          JSON.stringify(state.vodCategories),
        ).catch(console.error)
      })
      .addCase(fetchSeriesStreamCategories.fulfilled, (state, action) => {
        state.seriesCategories = action.payload

        localStorageSet(
          STORAGE_KEY.SERIES_CATEGORIES,
          JSON.stringify(state.seriesCategories),
        ).catch(console.error)
      })
      .addCase(fetchLiveStreams.fulfilled, (state, action) => {
        state.liveStreams = action.payload

        localStorageSet(
          STORAGE_KEY.LIVE_STREAMS,
          JSON.stringify(state.liveStreams),
        ).catch(console.error)
      })
      .addCase(fetchVODStreams.fulfilled, (state, action) => {
        state.vodStreams = action.payload

        localStorageSet(
          STORAGE_KEY.VOD_STREAMS,
          JSON.stringify(state.vodStreams),
        ).catch(console.error)
      })
      .addCase(fetchSeriesStreams.fulfilled, (state, action) => {
        state.seriesStreams = action.payload

        localStorageSet(
          STORAGE_KEY.SERIES_STREAMS,
          JSON.stringify(state.seriesStreams),
        ).catch(console.error)
      })
  },
})

export const { setApiConfig, setAppStatus } = appSlice.actions

export default appSlice.reducer
