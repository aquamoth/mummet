import {Tracked} from "./types"

export function makeTracked<T>(entity: T): Tracked<T> {
    return { loaded: entity, underlying: entity, current: entity };
}