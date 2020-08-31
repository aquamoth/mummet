import fn from ".."

test("hello world", ()=>{
    expect(fn("world")).toBe("Hello world")
})