import {createSlice, createStore,PayloadAction} from "@reduxjs/toolkit"
import { addOrReplace } from "."
// import deepFreeze from "deep-freeze"
import { track } from './helpers'
import { Dictionary, Tracked } from "./types"

type EntityType ={id: number, value: number}

describe("redux toolkit", ()=>{
    describe("addOrUpdate a WritableDraft", () => {
        const initialState: Dictionary<Tracked<EntityType>> =  { [4]: track({ id: 4, value: 41 }) }
        
        const slice = createSlice({ 
            name: 'myslice', 
            initialState, 
            reducers:{
                inc(v, action: PayloadAction<number>) {
                    const original = v[action.payload]?.current
                    const next = { 
                        id: action.payload, 
                        value: (original?.value || 0 ) + 1 
                    }

                    return addOrReplace(v, next, 'id')
                }
            }
        })
        
        test('addOrUpdate existing item', ()=>{
            const store = createStore(slice.reducer)
            
            store.dispatch(slice.actions.inc(4))
    
            const actual = store.getState()
            expect(actual[4].current?.value).toBe(42)
        })
        
        test('addOrUpdate missing item', ()=>{
            const store = createStore(slice.reducer)
            
            store.dispatch(slice.actions.inc(5))
    
            const actual = store.getState()
            expect(actual[5].current?.value).toBe(1)
        })

    })
})
