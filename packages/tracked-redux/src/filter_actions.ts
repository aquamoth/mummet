import { Tracked, Dictionary } from './types'

export function findModified<T>(state: Dictionary<Tracked<T>>){
    return Object.keys(state)
        .map(id => state[+id])
        .filter(e => e.current !== null)
        .filter(e => e.current !== e.underlying)
}
