import { Tracked, Dictionary } from "./types"

export function track<T>(entity: T): Tracked<T> {
    return { loaded: entity, underlying: entity, current: entity };
}

export function addOrReplace<T>(state: Dictionary<Tracked<T>>, entity: T, idField: keyof (T)) {
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


export function restore_underlying<T>(state: Dictionary<Tracked<T>>, id: number, underlying: T, before?: T) {
    if (!(id in state))
        return state;

    const entity = state[id];

    if (before && entity.underlying !== before)
        return state;

    return {
        ...state,
        [id]: { ...entity, underlying }
    };
}

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

        if (current === null){
            if(underlying === null){
                return newItem;
            }
            else {
                return null;
            }
        }
        else if(underlying === null){
            return current;
        }
        else{

            const next = { ...current };

            Object.keys(newItem)
                .filter(property => current[property] === underlying[property])
                .forEach(property => {
                    next[property] = newItem[property]
                })
    
            return next

        }
    }
}

//TODO: findAll, findModified, filterModified, findDeleted, addWithKeepChanges, updateUnchangedProperties
