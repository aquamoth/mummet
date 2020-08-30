import { Tracked } from "./types"

export function track<T>(entity: T): Tracked<T> {
    return { loaded: entity, underlying: entity, current: entity };
}
