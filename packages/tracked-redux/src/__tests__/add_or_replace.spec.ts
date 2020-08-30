import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { addOrReplace } from '..'

test("addOrReplace replaces existing entity", () => {
    const state = deepFreeze({
        [1]: track({ id: 1, value: 'original' }),
        [2]: track({ id: 2, value: 'original' }),
        [3]: track({ id: 3, value: 'original' }),
    })
    const entity = deepFreeze({ id: 2, value: 'changed' })
    const expected = { ...state, [2]: track(entity) }

    const actual = addOrReplace(state, entity, 'id')

    expect(actual).toStrictEqual(expected)
})


test("addOrReplace adds new entity", () => {
    const state = deepFreeze({
        [1]: track({ id: 1, value: 'original' }),
        [2]: track({ id: 2, value: 'original' }),
        [3]: track({ id: 3, value: 'original' }),
    })
    const entity = deepFreeze({ id: 4, value: 'changed' })
    const expected = { ...state, [4]: track(entity) }

    const actual = addOrReplace(state, entity, 'id')

    expect(actual).toStrictEqual(expected)
})