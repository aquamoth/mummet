import * as React from "react"
import renderer from "react-test-renderer"

import fn from ".."

test("hello world", ()=>{
    expect(fn("world")).toBe("Hello world")
})

test("React test component", ()=>{
    const component = renderer.create(<div>Test</div>)
    
    // const testInstance = component.root
    // expect(testInstance.findByType(div).props.text).toBe("Test")
    
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})