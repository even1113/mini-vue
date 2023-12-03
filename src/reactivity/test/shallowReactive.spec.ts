import { isReadonly, shallowReaonly } from "../reactive"

describe("shallowReaonly", () => {
  it("inner should not be reactived", () => {
    const obj = shallowReaonly({
      foo: {
        name: "zyw"
      }
    })
    expect(isReadonly(obj)).toBe(true)
    expect(isReadonly(obj.foo)).toBe(false)
  })

  it("warn when call set", () => {
    console.warn = jest.fn()
    const obj = shallowReaonly({foo: 1})
    obj.foo++
    expect(console.warn).toBeCalled()
  })

})