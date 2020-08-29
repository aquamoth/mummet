export interface Tracked<T> {
    current: T,
    underlying: T,
    loaded: T
}

export type Dictionary<V, K extends string | number = number> = {
    [id in K]: V
}
