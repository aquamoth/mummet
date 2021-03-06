import { Tracked, Dictionary } from '../types'

export function commit<T>(state: Dictionary<Tracked<T>>, ids: (number|string)[]) {
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

export function rollback<T>(state: Dictionary<Tracked<T>>, id: number|string, underlying: T, before?: T) {
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
