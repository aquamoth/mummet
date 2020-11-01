import { Tracked, Dictionary } from '../types'
import { track } from '../helpers'

export function addOrReplace<T>(state: Dictionary<Tracked<T>>, entity: T, idField: keyof (T)) {
    const id = +entity[idField];
    return {
        ...state,
        [id]: track(entity)
    }
}

export function setUnderlying<T>(state: Dictionary<Tracked<T>>, entities: T[], idProp: keyof (T)) {
    const newState = {
        ...state
    };

    for (const entity of entities) {
        const id = +entity[idProp]

        newState[id] = {
            current: updateUnchangedProperties(state[id], entity),
            underlying: entity,
            loaded: state[id]?.loaded || null
        }
    }

    return newState


    function updateUnchangedProperties(before: Tracked<T>, newItem: T) {
        if (!before)
            return newItem;

        const current = before.current
        const underlying = before.underlying

        if (current === null)
            return underlying === null ? newItem : null;

        if (underlying === null)
            return current;

        const next = { ...current };

        Object.keys(newItem)
            .filter(property => current[property] === underlying[property])
            .forEach(property => {
                next[property] = newItem[property]
            })

        return next
    }
}
