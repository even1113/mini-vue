import { computed } from "../computed";
import { reactive } from "../reactive";

describe('computed', () => {

  // ref .value 缓存
  it("happy path", () => {
    const user = reactive({
      age: 10
    })
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(10)  // computed返回的值 再加上.value 可以访问到内部值
  })

  it("should compute lazily", () => {
    const value = reactive({
      foo: 1
    })
    const getter = jest.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)

    // lazy : 没有执行cValue.value 的时候 getter是不会执行的
    expect(getter).not.toHaveBeenCalled()

    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute until needed
    value.foo = 2
    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(1) // getter 再次被执行

  })
});