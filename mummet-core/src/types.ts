export interface Tracked<T> {
    current: T | null,
    underlying: T | null,
    loaded: T | null
}

export type DictionaryKey = string | number

export type Dictionary<V, K extends DictionaryKey = number> = {
    [id in K]: V
}
