import { Tracked, Dictionary } from '../types'
import { track } from '../helpers'

export function addOrReplace<T extends object>(state: Dictionary<Tracked<T>>, entity: T, idField: keyof T) {
    const id = entity[idField] as any as number|string
    return {
        ...state,
        [id]: track(entity)
    }
}

export function setUnderlying<T extends object>(state: Dictionary<Tracked<T>>, entities: T[], idProp: keyof T) {
    const newState = {
        ...state
    };

    for (const entity of entities) {
        const id = entity[idProp] as any as number|string

        newState[id] = {
            current: updateUnchangedProperties(state[id], entity),
            underlying: entity,
            loaded: state[id]?.loaded || null
        }
    }

    return newState


    function updateUnchangedProperties(before: Tracked<T> | undefined, newItem: T): T | null {
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
}
