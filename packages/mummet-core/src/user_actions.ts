import { Tracked, Dictionary } from './types'
// import { track } from './helpers'

export function update<T>(state: Dictionary<Tracked<T>>, id: number, modify: (e: T | null) => T | null) {
    if (!(id in state))
        return state;

    const entity = state[id];
    const current = modify(entity.current);

    if (current === entity.current)
        return state;

    return {
        ...state,
        [id]: { ...entity, current }
    }
}

export function updateProperty<T>(state: Dictionary<Tracked<T>>, id: number, property: keyof (T), value: any) {
    return update(state, id, e => (e === null ? null : { ...e, [property]: value }))
}

export function remove<T>(state: Dictionary<Tracked<T>>, id: number) {
    if (!(id in state))
        return state;

    const entity = state[id]

    if (!entity.underlying) {
        state = { ...state }
        delete state[id]
        return state;
    }
    else {
        return {
            ...state,
            [id]: {
                ...entity,
                current: null,
                loaded: null
            }
        }
    }
}

export function refreshLoaded<T>(state: Dictionary<Tracked<T>>) {
    const newState = {};
    let changed = false;

    Object.keys(state).forEach(id => {
        let entity = state[+id];

        if (entity.current !== entity.loaded) {
            entity = { ...entity, loaded: entity.current }
            changed = true;
        }

        newState[+id] = entity
    })

    return changed ? newState : state;
}
