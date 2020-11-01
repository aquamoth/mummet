import { Tracked, Dictionary } from './types'

export function findModified<T>(state: Dictionary<Tracked<T>>) {
    return Object.keys(state)
        .map(id => state[+id])
        .filter(e => e.current !== null)
        .filter(e => e.current !== e.underlying)
}

export function findRemoved<T>(state: Dictionary<Tracked<T>>): T[] {
    return Object.keys(state)
        .map(id => state[+id]!)
        .filter(e => e.current === null)
        .filter(e => e.underlying !== null)
        .map(e => e.underlying!)
}

export function find<T>(state: Dictionary<Tracked<T>>, callback: (e: Tracked<T>) => boolean) {
    return Object.keys(state)
        .map(id => state[+id])
        .filter(callback)
}
