import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { find } from '.'
import { Dictionary, Tracked } from "../types"

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
 
        test("supports string keys", () => {
            const state: Dictionary<Tracked<{ id: string, value: string}>, string> = deepFreeze({
                ['one']: track({ id: 'one', value: 'find' }),
                ['two']: track({ id: 'two', value: 'not' }),
                ['three']: track({ id: 'three', value: 'find' }),
            })

            const actual = find(state, e => e.current?.value === 'find');

            expect(actual).toStrictEqual([state['one'], state['three']])
        })
    })
})
