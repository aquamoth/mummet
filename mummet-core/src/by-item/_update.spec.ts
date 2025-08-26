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

            const actual = update(state, 2, _e => ({ id: 2, value: entity.value }))

            expect(actual).toStrictEqual(expected)
        })

        test("doesn't add missing entities", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
            })

            const actual = update(state, 2, _e => ({ id: 2, value: 'IRRELEVANT' }))

            expect(actual).toBe(state)
        })

        test("doesn't change state if entity is not modified", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const actual = update(state, 2, _e => _e)

            expect(actual).toBe(state)
        })

        test("restores underlying if current properties are the same", () =>{
            const expectedState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const middleState = update(expectedState, 2, e => (e && { id: e.id, value: 'updated' }))
            const actualState = update(middleState, 2, e => (e && { id: e.id, value: 'original' }))

            Object.keys(expectedState).forEach(key =>{
                expect(expectedState[key].current).toStrictEqual(actualState[key].current)
            })
        })

        test("supports string keys", () => {
            const state = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
            })
            const entity = deepFreeze({ id: 'one', value: 'changed' })
            const expected = { ...state, ['one']: { ...state['one'], current: entity } }

            const actual = update(state, 'one', _e => ({ id: 'one', value: entity.value }))

            expect(actual).toStrictEqual(expected)
        })
    })

    describe("updateProperty", () => {
        test("updates by property name", () => {
            const state = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const expected = update(state, 2, _e => ({ id: 2, value: 'next' }));

            const actual = updateProperty(state, 2, 'value', 'next');

            expect(actual).toStrictEqual(expected)
        })

        test("restores underlying if current properties are the same", () => {
            const expectedState = deepFreeze({
                [1]: track({ id: 1, value: 'original' }),
                [2]: track({ id: 2, value: 'original' }),
                [3]: track({ id: 3, value: 'original' }),
            })

            const middleState = update(expectedState, 2, _e => ({ id: 2, value: 'next' }));

            const actualState = updateProperty(middleState, 2, 'value', 'original');

            Object.keys(expectedState).forEach(key =>{
                expect(expectedState[key].current).toStrictEqual(actualState[key].current)
            })
        })

        test("supports string keys", () => {
            const state = deepFreeze({
                ['one']: track({ id: 'one', value: 'original' }),
                ['two']: track({ id: 'two', value: 'original' }),
            })

            const expected = update(state, 'two', _e => ({ id: 'two', value: 'next' }));

            const actual = updateProperty(state, 'two', 'value', 'next');

            expect(actual).toStrictEqual(expected)
        })
    })
})
