import * as React from "react"
import renderer from "react-test-renderer"
import Textbox from "../textbox"

test("Renders empty", () => {
    const component = renderer.create(<Textbox value={""} underlyingValue={""} />)

    const testInstance = component.root
    expect(testInstance.findByType(Textbox).props.value).toBe("")
    expect(testInstance.findByType(Textbox).props.underlyingValue).toBe("")

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})