export type XtremeCodesConfig = {
  baseUrl: string
  auth: XtremeCodesAuth
}

export type XtremeCodesAuth = {
  username: string
  password: string
}

export interface AccountInfo {
  active_cons?: number // actually string
  allowed_output_formats?: string[]
  auth?: number
  created_at?: number // string act
  exp_date?: number // string act
  is_trial?: number // actually string
  max_connections?: number // actually string
  message?: string
  password?: string
  status?: string
  username?: string
}

export interface Category {
  category_id?: number // actually string
  category_name?: string
  parent_id?: number
}

export interface Stream {
  added?: string
  category_id?: number
  category_ids?: number[]
  custom_sid?: string
  direct_source?: string
  is_adult?: number
  name?: string
  num?: number
  stream_icon?: string
  stream_id?: number
  stream_type?: string // live or movie or ?
}

export interface LiveStream extends Stream {
  epg_channel_id?: string
  tv_archive?: number
  tv_archive_duration?: number
}

export interface VodStream extends Stream {
  container_extension?: string
  rating?: number
  rating_5based?: number
  tmdb?: string
  trailer?: string
}

export interface SeriesStream {
  category_id?: number
  category_ids?: number[]
  num?: number
  name?: string
  series_id?: number
  cover?: string
  plot?: string
  cast?: string
  director?: string
  genre?: string
  releaseDate?: string
  last_modified?: string
  rating?: number
  rating_5based?: number
  backdrop_path?: string[]
  youtube_trailer?: string
  tmdb?: string
  episode_run_time?: number
}

// todo: finish this
export interface VodInfo {
  info?: {
    actors?: string
    age?: string
  }
  movie_data?: VodStream
}
