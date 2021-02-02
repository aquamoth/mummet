import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { addOrUpdate } from './user_actions'

describe("user_actions", () => {
    
    describe("addOrUpdate", () => {
        test("insert current entity with no underlying", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })
            const entity = deepFreeze({ id: 4, value: 'added' })
            const expected = { 
                ...state, 
                [4]: { current: entity, loaded: null, underlying: null } 
            }

            const actual = addOrUpdate(state, entity, 'id')

            expect(actual).toStrictEqual(expected)
        })

        test("replaces current entity keeping its underlying", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })
            const entity = deepFreeze({ id: 2, value: 'added' })
            const expected = { 
                ...state, 
                [2]: { ...state[2], current: entity } 
            }

            const actual = addOrUpdate(state, entity, 'id')

            expect(actual).toStrictEqual(expected)
        })
    })
})