export interface Tracked<T> {
    current: T | null,
    underlying: T | null,
    loaded: T | null
}

export type Dictionary<V, K extends string | number = number> = {
    [id in K]: V
}
