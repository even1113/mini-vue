import {isReactive, isReadonly, reactive, readonly } from "../reactive"

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
    expect(console.warn).toBeCalled()
  })

  it("isReadonly or isReactive", () => {
    const obj1 = reactive({foo: 1})
    const obj2 = readonly({foo: 2})
    const commonObj = {name: 'zyw'}
    expect(isReactive(obj1)).toBe(true)
    expect(isReadonly(obj1)).toBe(false)

    expect(isReadonly(obj2)).toBe(true)
    expect(isReactive(commonObj)).toBe(false)

  })

  it("reactive nested", () => {
    const original = {
      foo: 1,
      person: {
         age: 18
      }
   }
   const observed1 = reactive(original)
   const observed2 = readonly(original)

   expect(isReactive(observed1.person)).toBe(true)
   expect(isReadonly(observed2.person)).toBe(true)

  })

})