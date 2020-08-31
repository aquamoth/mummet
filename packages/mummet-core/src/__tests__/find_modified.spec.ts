import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { update, remove, findModified } from '..'

describe("filter_actions", () => {
    describe("findModified", () => {
        test("returns entities where current != underlying", () => {
            const baseState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const state = update(baseState, 2, e => ({ id: 2, value: 'edited_value' }))

            const actual = findModified(state);

            expect(actual).toStrictEqual([state[2]])
        })

        test("doesn't return deleted entities", () => {
            const baseState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const state = remove(baseState, 2)

            const actual = findModified(state);

            expect(actual).toStrictEqual([])
        })
    })
})
