import deepFreeze from "deep-freeze"
import { makeTracked, overwrite } from '..'

test("makeTracked", () => {
    const entity = {};

    const actual = makeTracked(entity)

    expect(actual.current).toBe(entity)
    expect(actual.underlying).toBe(entity)
    expect(actual.loaded).toBe(entity)
})


test("overwrite replaces existing entity", () => {
    const state = deepFreeze({
        [1]: makeTracked({ id: 1, value: 'original' }),
        [2]: makeTracked({ id: 2, value: 'original' }),
        [3]: makeTracked({ id: 3, value: 'original' }),
    })
    const entity = deepFreeze({ id: 2, value: 'changed' })
    const expected = { ...state, [2]: makeTracked(entity) }
    
    const actual = overwrite(state, entity, 'id')

    expect(actual).toEqual(expected)
})


test("overwrite adds new entity", () => {
    const state = deepFreeze({
        [1]: makeTracked({ id: 1, value: 'original' }),
        [2]: makeTracked({ id: 2, value: 'original' }),
        [3]: makeTracked({ id: 3, value: 'original' }),
    })
    const entity = deepFreeze({ id: 4, value: 'changed' })
    const expected = { ...state, [4]: makeTracked(entity) }

    const actual = overwrite(state, entity, 'id')

    expect(actual).toEqual(expected)
})