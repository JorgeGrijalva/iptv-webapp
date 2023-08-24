import { get, set } from "idb-keyval"

export const localStorageSet = (key: string, data: string): Promise<void> => {
  return set(key, data)
}

export const localStorageGet = (
  key: string,
): Promise<string | null | undefined> => {
  return get(key)
}
