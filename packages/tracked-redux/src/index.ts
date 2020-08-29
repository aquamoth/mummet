import { Tracked } from "./types"

type Dictionary<T> = {
    [id: number]: T
}

export function track<T>(entity: T): Tracked<T> {
    return { loaded: entity, underlying: entity, current: entity };
}

export function overwrite<T>(state: Dictionary<Tracked<T>>, entity: T, idField: keyof (T)): Dictionary<Tracked<T>> {
    const id = +entity[idField];
    return {
        ...state,
        [id]: track(entity)
    }
}

export function commit<T>(state: Dictionary<Tracked<T>>, ids: number[]) {
    let changed = false;

    ids.forEach(id => {
        if (id in state) {
            if (state[id].current !== state[id].underlying) {
                if (!changed) {
                    state = { ...state };
                    changed = true;
                }

                state[id] = { 
                    ...state[id], 
                    underlying: state[id].current 
                }
            }
        }
    })

    return state;
}