import deepFreeze from "deep-freeze"
import { track, restore_underlying } from '..'

test("restore_underlying sets underlying value", () => {
    const baseState = deepFreeze({
        [1]: track({ id: 1, value: 'original' }),
        [2]: track({ id: 2, value: 'original' }),
        [3]: track({ id: 3, value: 'original' }),
    })

    const updatedEntity = { ...baseState[2], underlying: { id: 2, value: 'updated-2' } }

    const state = deepFreeze({
        ...baseState,
        [2]: updatedEntity,
    })

    const actual = restore_underlying(state, 2, baseState[2].underlying)

    expect(actual).toStrictEqual(baseState)
})


test("restore_underlying doesn't update if underlying value has changed", () => {
    const baseState = deepFreeze({
        [1]: track({ id: 1, value: 'original' }),
        [2]: track({ id: 2, value: 'original' }),
        [3]: track({ id: 3, value: 'original' }),
    })

    const updatedEntity = { ...baseState[2], underlying: { id: 2, value: 'updated-2' } }

    const state = deepFreeze({
        ...baseState,
        [2]: updatedEntity,
    })

    const actual = restore_underlying(state, 2, baseState[2].underlying, { ...updatedEntity.underlying })

    expect(actual).toBe(state)
})

test("restore_underlying returns the same state if the entity is missing", () => {
    const state = deepFreeze({
        [1]: track({ id: 1, value: 'IRRELEVANT' }),
    })

    const actual = restore_underlying(state, 2, { id: 2, value: 'IRRELEVANT' })

    expect(actual).toBe(state)
})