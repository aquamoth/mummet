export interface Tracked<T> {
    current: T,
    underlying: T,
    loaded: T
}