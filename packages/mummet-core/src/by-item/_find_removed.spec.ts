import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { remove, findRemoved } from '.'

describe("filter_actions", () => {
    describe("findRemoved", () => {
        test("returns entities where current == null", () => {
            const baseState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const state = remove(baseState, 2)

            const actual = findRemoved(state);

            expect(actual).toStrictEqual([state[2].underlying])
        })
 
        test("supports string keys", () => {
            const baseState = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
                ['two']: track({ id: 'two', value: 'original' }),
            })

            const state = remove(baseState, 'two')

            const actual = findRemoved(state);

            expect(actual).toStrictEqual([state['two'].underlying])
        })
    })
})
