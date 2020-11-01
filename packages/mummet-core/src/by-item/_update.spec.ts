import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { update, updateProperty } from '.'

describe("user_actions", () => {
    describe("update", () => {
        test("modifies current values", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })
            const entity = deepFreeze({ id: 2, value: 'changed' })
            const expected = { ...state, [2]: { ...state[2], current: entity } }

            const actual = update(state, 2, e => ({ id: 2, value: entity.value }))

            expect(actual).toStrictEqual(expected)
        })

        test("doesn't add missing enities", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
            })

            const actual = update(state, 2, e => ({ id: 2, value: 'IRRELEVANT' }))

            expect(actual).toBe(state)
        })

        test("doesn't change state if entity is not modified", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const actual = update(state, 2, e => e)

            expect(actual).toBe(state)
        })
    })

    describe("updateProperty", () => {
        test("updates by property name", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const expected = update(state, 2, e => ({ id: 2, value: 'next' }));

            const actual = updateProperty(state, 2, 'value', 'next');

            expect(actual).toStrictEqual(expected)
        })
    })
})
