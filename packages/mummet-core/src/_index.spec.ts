import * as api from './index'

describe('Public api', ()=> {

    test("Exports v0.3 methods", ()=> {
        expect(api.addOrReplace).toBeDefined()
        expect(api.commit).toBeDefined()
        expect(api.find).toBeDefined()
        expect(api.findModified).toBeDefined()
        expect(api.findRemoved).toBeDefined()
        expect(api.refreshLoaded).toBeDefined()
        expect(api.remove).toBeDefined()
        expect(api.rollback).toBeDefined()
        expect(api.setUnderlying).toBeDefined()
        expect(api.track).toBeDefined()
        expect(api.update).toBeDefined()
        expect(api.updateProperty).toBeDefined()
    })


    test("Exports v1.0 methods", ()=> {
        expect(api.addOrReplace).toBeDefined()
        expect(api.addOrUpdate).toBeDefined()
        expect(api.commit).toBeDefined()
        expect(api.find).toBeDefined()
        expect(api.findModified).toBeDefined()
        expect(api.findRemoved).toBeDefined()
        expect(api.refreshLoaded).toBeDefined()
        expect(api.remove).toBeDefined()
        expect(api.rollback).toBeDefined()
        expect(api.setUnderlying).toBeDefined()
        expect(api.track).toBeDefined()
        expect(api.update).toBeDefined()
        expect(api.updateProperty).toBeDefined()
    })
})
