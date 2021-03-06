import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { remove } from '.'

describe("user_actions", () => {
    describe("remove", () => {
        test("deletes current values", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })
            const expected = { ...state, [2]: { ...state[2], current: null, loaded: null } }

            const actual = remove(state, 2)

            expect(actual).toStrictEqual(expected)
        })

        test("purges new entities completely", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: { current: { id: 2, value: 'original' }, underlying: null, loaded: null },
                [3]: track({ id: 3, value: 'original' }),
            })

            const expected = {
                [1]: state[1],
                [3]: state[3]
            }

            const actual = remove(state, 2)

            expect(actual).toStrictEqual(expected)
        })

        test("doesn't change state if entity is missing", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
            })

            const actual = remove(state, 2)

            expect(actual).toBe(state)
        })

        test("supports string keys", () => {
            const state = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
                ['two']: track({ id: 'two', value: 'original' }),
            })
            const expected = { ...state, ['two']: { ...state['two'], current: null, loaded: null } }

            const actual = remove(state, 'two')

            expect(actual).toStrictEqual(expected)
        })
    })
})
