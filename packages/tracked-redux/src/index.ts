import {Tracked} from "./types"

type Dictionary<T> = {
    [id: number]: T
}

export function makeTracked<T>(entity: T): Tracked<T> {
    return { loaded: entity, underlying: entity, current: entity };
}

export function overwrite<T>(state: Dictionary<Tracked<T>>, entity: T, idField: keyof(T)): Dictionary<Tracked<T>> {
    const id = +entity[idField];
    return {
        ...state, 
        [id]: makeTracked(entity)
    }
}