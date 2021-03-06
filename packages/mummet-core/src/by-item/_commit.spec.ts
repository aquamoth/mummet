import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { commit } from '.'

describe("save_actions", () => {
    describe("commit", () => {
        test("copies current to underlying", () => {
            const baseState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const state = deepFreeze({
                ...baseState,
                [2]: { ...baseState[2], current: { ...baseState[2].current, value: 'updated-2' } },
                [3]: { ...baseState[3], current: { ...baseState[3].current, value: 'updated-3' } },
            })

            const expected = {
                ...state,
                [2]: { current: state[2].current, underlying: state[2].current, loaded: state[2].loaded },
                [3]: { current: state[3].current, underlying: state[3].current, loaded: state[3].loaded }
            }

            const actual = commit(state, [2, 3])

            expect(actual).toStrictEqual(expected)
        })

        test("doesn't replace state if entity is missing", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' })
            })

            const actual = commit(state, [4])

            expect(actual).toBe(state)
        })

        test("doesn't replace state if entity is unchanged", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' })
            })

            const actual = commit(state, [1])

            expect(actual).toBe(state)
        })

        test("supports string keys", () => {
            const baseState = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
            })

            const state = deepFreeze({
                ...baseState,
                ['one']: { ...baseState['one'], current: { ...baseState['one'].current, value: 'updated-2' } },
            })

            const expected = {
                ...state,
                ['one']: { current: state['one'].current, underlying: state['one'].current, loaded: state['one'].loaded }
            }

            const actual = commit(state, ['one'])

            expect(actual).toStrictEqual(expected)
        })
    })
})
