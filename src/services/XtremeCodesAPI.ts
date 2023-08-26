import queryString from "query-string"
import {
  AccountInfo,
  Category,
  LiveStream,
  SeriesStream,
  VodStream,
  XtremeCodesConfig,
} from "./XtremeCodesAPI.types"

export class XtremeCodesAPI {
  private static async execute(
    config: XtremeCodesConfig,
    action?: string,
    filter?: { [key: string]: string },
  ): Promise<any> {
    const query = { ...config.auth, action, ...filter }
    const response = await fetch(
      `${config.baseUrl}/player_api.php?${queryString.stringify(query)}`,
    )

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      return Promise.reject(new Error(message))
    }

    const jsonRes = await response.json()

    if (
      action &&
      jsonRes.hasOwnProperty("user") &&
      jsonRes.user.hasOwnProperty("status") &&
      jsonRes.user_info.status === "Disabled"
    ) {
      return Promise.reject(new Error("account disabled"))
    }

    return Promise.resolve(jsonRes)
  }

  public static async getAccountInfo(
    config: XtremeCodesConfig,
  ): Promise<AccountInfo> {
    const response = await this.execute(config)

    const userInfo: AccountInfo = response.user_info

    if (userInfo.auth === 0) {
      return Promise.reject(new Error("authentication error"))
    }

    return Promise.resolve(userInfo)
  }

  public static getLiveStreamCategories(
    config: XtremeCodesConfig,
  ): Promise<Category[]> {
    return this.execute(config, "get_live_categories")
  }

  public static getVODStreamCategories(
    config: XtremeCodesConfig,
  ): Promise<Category[]> {
    return this.execute(config, "get_vod_categories")
  }

  public static getSeriesStreamCategories(
    config: XtremeCodesConfig,
  ): Promise<Category[]> {
    return this.execute(config, "get_series_categories")
  }

  public static getLiveStreams(
    config: XtremeCodesConfig,
    categoryId?: number,
  ): Promise<LiveStream[]> {
    if (categoryId === undefined) {
      return this.execute(config, "get_live_streams")
    }

    return this.execute(config, "get_live_streams", {
      category_id: categoryId.toString(),
    })
  }

  public static getVODStreams(
    config: XtremeCodesConfig,
    categoryId?: number,
  ): Promise<VodStream[]> {
    if (categoryId === undefined) {
      return this.execute(config, "get_vod_streams")
    }

    return this.execute(config, "get_vod_streams", {
      category_id: categoryId.toString(),
    })
  }

  public static getSeriesStreams(
    config: XtremeCodesConfig,
    categoryId?: number,
  ): Promise<SeriesStream[]> {
    if (categoryId === undefined) {
      return this.execute(config, "get_series")
    }

    return this.execute(config, "get_series", {
      category_id: categoryId.toString(),
    })
  }

  // left off here types
  public static async getVODInfo(
    config: XtremeCodesConfig,
    id: number,
  ): Promise<any> {
    const response = await this.execute(config, "get_vod_info", {
      vod_id: id.toString(),
    })

    if (!response.info || response.info.length === 0) {
      return Promise.reject(new Error(`vod with id: ${id} not found`))
    }

    return Promise.resolve(response)
  }

  public static async getSeriesInfo(
    config: XtremeCodesConfig,
    id: number,
  ): Promise<any> {
    const response = await this.execute(config, "get_series_info", {
      series_id: id.toString(),
    })

    if (!response.info || response.info.length === 0) {
      return Promise.reject(new Error(`series with id: ${id} not found`))
    }

    return Promise.resolve(response)
  }

  public static getEPGForLivetream(
    config: XtremeCodesConfig,
    id: number,
    limit: number,
  ): Promise<any> {
    return this.execute(config, "get_short_epg", {
      stream_id: id.toString(),
      limit: limit.toString(),
    })
  }

  public static getAllEPGForLiveStream(
    config: XtremeCodesConfig,
    id: number,
  ): Promise<any> {
    return this.execute(config, "get_simple_data_table", {
      stream_id: id.toString(),
    })
  }

  public static async getAllEPG(config: XtremeCodesConfig): Promise<any> {
    const query = { ...config.auth }
    const response = await fetch(
      `${config.baseUrl}/xmltv.php?${queryString.stringify(query)}`,
    )

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`
      return Promise.reject(new Error(message))
    }

    const jsonRes = await response.json()

    return Promise.resolve(jsonRes)
  }
}
