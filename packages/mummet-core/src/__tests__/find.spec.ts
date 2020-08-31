import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { find } from '..'

describe("filter_actions", () => {
    describe("find", () => {
        test("filters by callback", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'find' }),
                [2]: track({ id: 2, value: 'not' }),
                [3]: track({ id: 3, value: 'find' }),
            })

            const actual = find(state, e => e.current?.value === 'find');

            expect(actual).toStrictEqual([state[1], state[3]])
        })
    })
})
