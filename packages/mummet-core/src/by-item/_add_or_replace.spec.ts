import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { addOrReplace } from '.'

describe("server_actions", () => {
    describe("addOrReplace", () => {
        test("replaces existing entity", () => {
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


        test("adds new entity", () => {
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

        test("supports string keys", () => {
            const state = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
            })
            const entity = deepFreeze({ id: 'two', value: 'changed' })
            const expected = { ...state, ['two']: track(entity) }

            const actual = addOrReplace(state, entity, 'id')

            expect(actual).toStrictEqual(expected)
        })
    })
})
