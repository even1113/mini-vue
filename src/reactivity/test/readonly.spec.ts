import { readonly } from "../reactive"

describe("readonly", () => {
  it("readonly", () => {
    const obj = {foo: 1}
    const wrapped = readonly(obj)
    expect(wrapped).not.toBe(obj)
  })

  it("warn when call set", () => {
    console.warn = jest.fn()
    const obj = readonly({foo: 1})
    obj.foo++
    expect( console.warn ).toBeCalled()
  })

})