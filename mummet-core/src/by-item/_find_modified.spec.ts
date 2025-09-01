import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { update, remove, findModified } from '.'
import { Dictionary, Tracked } from "../types"

describe("filter_actions", () => {
    describe("findModified", () => {

        test("identifies an item that changed back and forth as unchanged", () =>{
            let state: Dictionary<Tracked<{id: number, value: string}>> = {
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            }

            state = update(state, 2, _e => ({ id: 2, value: 'edited_value' }))
            expect(findModified(state).length).toBe(1)

            state = update(state, 2, _e => ({ id: 2, value: 'original' }))
            expect(findModified(state).length).toBe(0)
        })

        test("returns entities where current != underlying", () => {
            const baseState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const state = update(baseState, 2, _e => ({ id: 2, value: 'edited_value' }))

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

        test("supports string keys", () => {
            const baseState = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
                ['two']: track({ id: 'two', value: 'original' }),
            })

            const state = update(baseState, 'two', _e => ({ id: 'two', value: 'edited_value' }))

            const actual = findModified(state);

            expect(actual).toStrictEqual([state['two']])
        })
    })
})
