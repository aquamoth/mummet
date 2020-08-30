import deepFreeze from "deep-freeze"
import { track } from '../helpers'
import { updateProperty, refreshLoaded } from '..'

describe("refreshLoaded", ()=>{
    test("sets the current state as loaded", () => {
        const baseState = deepFreeze({
            [1]: track({ id: 1, value: 'original' }),
            [2]: track({ id: 2, value: 'original' }),
            [3]: track({ id: 3, value: 'original' }),
        })
    
        const state = updateProperty(baseState, 2, 'value', 'changed');
    
        const expected = { ...state, [2]: { ...state[2], loaded: state[2].current } }
    
        const actual = refreshLoaded(state)
    
        expect(actual).toStrictEqual(expected)
    })
    
    test("doesn't update entities that hasn't changed", () => {
        const baseState = deepFreeze({
            [1]: track({ id: 1, value: 'original' }),
            [2]: track({ id: 2, value: 'original' }),
            [3]: track({ id: 3, value: 'original' }),
        })
    
        const state = updateProperty(baseState, 2, 'value', 'changed');
    
        const actual = refreshLoaded(state)
    
        expect(actual[1]).toBe(baseState[1])
    })
    
    test("doesn't change any state if unchanged", () => {
        const baseState = deepFreeze({
            [1]: track({ id: 1, value: 'original' }),
            [2]: track({ id: 2, value: 'original' }),
            [3]: track({ id: 3, value: 'original' }),
        })
    
        const actual = refreshLoaded(baseState)
    
        expect(actual).toBe(baseState)
    })
})
