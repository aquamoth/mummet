import { Tracked, Dictionary, DictionaryKey } from '../types'
import { track } from '../helpers'

export function addOrReplace<T extends object>(state: Dictionary<Tracked<T>, DictionaryKey>, entity: T, idField: keyof T) {
    const id = entity[idField]
    if (!isDictionaryKey(id))
        throw "idField does not point to a valid dictionary key"

    return {
        ...state,
        [id]: track(entity)
    }
}

export function setUnderlying<T extends object>(state: Dictionary<Tracked<T>, DictionaryKey>, entities: T[], idProp: keyof T) {
    const newState = {
        ...state
    };

    for (const entity of entities) {
        const id = entity[idProp]
        if (!isDictionaryKey(id))
            throw "idField does not point to a valid dictionary key"

        let current = updateUnchangedProperties(state[id], entity)
        if (hasSamePropertyValues(current, entity)) {
            current = entity;
        }

        newState[id] = {
            current,
            underlying: entity,
            loaded: state[id]?.loaded || null
        }
    }

    return newState
}

function isDictionaryKey(x: any): x is DictionaryKey {
    return typeof (x) === "number" || typeof (x) === "string"
}

function hasSamePropertyValues(current: object | null, underlying?: object | null) {
    if (current == null) return false
    if (underlying == null) return false

    return Object.keys(current).every(
        property => (current as any)[property] === (underlying as any)[property]
    )
}

function updateUnchangedProperties<T>(before: Tracked<T> | undefined, newItem: T): T | null {
    if (!before)
        return newItem;

    const current = before.current;
    const underlying = before.underlying;

    if (current == null) // null or undefined
        return underlying == null ? newItem : null;

    if (underlying == null)
        return current;

    const next: T = { ...(current as T) };

    Object.keys(newItem as object)
        .filter((property) => (current as any)[property] === (underlying as any)[property])
        .forEach((property) => {
            (next as any)[property] = (newItem as any)[property];
        });

    return next;
}
