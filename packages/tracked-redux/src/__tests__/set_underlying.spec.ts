import deepFreeze from "deep-freeze"
import { track, setUnderlying, updateProperty } from '..'

test("setUnderlying adds new entities as not loaded", () => {
    const state = deepFreeze({
        [1]: track({ id: 1, value: 'original' }),
        [2]: track({ id: 2, value: 'original' }),
        [3]: track({ id: 3, value: 'original' }),
    })

    const entities = [
        { id: 4, value: 'updated-4' },
        { id: 5, value: 'updated-5' }
    ]
    const expected = {
        ...state,
        [4]: { current: entities[0], loaded: null, underlying: entities[0] },
        [5]: { current: entities[1], loaded: null, underlying: entities[1] }
    }

    const actual = setUnderlying(state, entities, 'id')

    expect(actual).toStrictEqual(expected)
})

test("setUnderlying keeps loaded state", () => {
    const state = deepFreeze({
        [1]: track({ id: 1, value: 'original' }),
        [2]: track({ id: 2, value: 'original' }),
        [3]: track({ id: 3, value: 'original' }),
    })

    const entity = { id: 2, value: 'updated-4' }
    const expected = {
        ...state,
        [2]: { current: entity, loaded: state[2].loaded, underlying: entity },
    }

    const actual = setUnderlying(state, [entity], 'id')

    expect(actual).toStrictEqual(expected)
})

test("setUnderlying keeps current changes", () => {
    type E = { id: number, value: string | null, extra: string }
    const baseState = deepFreeze({
        [1]: track({ id: 1, value: 'original-value', extra: 'original-extra' } as E),
        [2]: track({ id: 2, value: 'original-value', extra: 'original-extra' } as E),
        [3]: track({ id: 3, value: null, extra: 'original-extra' } as E),
    })
    const state = updateProperty(baseState, 2, 'value', 'updated-value')

    const update2 = { id: 2, value: 'new-underlying-value', extra: 'new-underlying-extra' }
    const update3 = { id: 3, value: 'new-underlying-value', extra: 'new-underlying-extra' }

    const expected = {
        ...state,
        [2]: {
            current: { ...state[2].current, extra: update2.extra },
            loaded: state[2].loaded,
            underlying: update2
        },
        [3]: {
            current: update3,
            loaded: state[3].loaded,
            underlying: update3
        }
    }

    const actual = setUnderlying(state, [update2, update3], 'id')

    expect(actual).toStrictEqual(expected)
})

test("setUnderlying honors removed entities", () => {
    const state = deepFreeze({
        [1]: { current: null, loaded: null, underlying: { id: 1, value: 'original-value', extra: 'original-extra' } },
        [2]: { current: null, loaded: { id: 2, value: 'original-value', extra: 'original-extra' }, underlying: null },
    })

    const underlying1 = { id: 1, value: 'new-underlying-value', extra: 'new-underlying-extra' }
    const underlying2 = { id: 2, value: 'new-underlying-value', extra: 'new-underlying-extra' }

    const expected = {
        [1]: {
            ...state[1],
            underlying: underlying1
        },
        [2]: {
            ...state[2],
            current: underlying2,
            underlying: underlying2
        }
    }

    const actual = setUnderlying(state, [underlying1, underlying2], 'id')

    expect(actual).toStrictEqual(expected)
})

test("setUnderlying honors added entities", () => {
    const addedEntity = { id: 1, value: "IRRELEVANT", extra: "IRRELEVANT" };
    const state = deepFreeze({
        [1]: { current: addedEntity, loaded: addedEntity, underlying: null }
    })

    const entity = { id: 1, value: 'new-underlying-value', extra: 'new-underlying-extra' }

    const expected = {
        [1]: {
            current: addedEntity,
            loaded: addedEntity,
            underlying: entity
        },

    }

    const actual = setUnderlying(state, [entity], 'id')

    expect(actual).toStrictEqual(expected)
})
