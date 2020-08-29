import {makeTracked} from '..'

test("makeTracked", ()=>{
    const entity = {};

    const actual = makeTracked(entity)
    
    expect(actual.current).toBe(entity)
    expect(actual.underlying).toBe(entity)
    expect(actual.loaded).toBe(entity)
})