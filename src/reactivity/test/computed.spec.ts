import { computed } from "../computed"
import { effect } from "../effect";
import { reactive } from "../reactive"

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

    expect(cValue.value).toBe(1)  // 初始化执行一次
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(1)

    // should not compute until needed
    value.foo = 2
    expect(getter).toHaveBeenCalledTimes(1) 

    // now it should compute
    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2) 
    
    // should not compute again
    cValue.value
    expect(getter).toHaveBeenCalledTimes(2)

    // 测试value的响应式,scheduler
    let calls = 0
    let dummy = 0
    const options = {
      scheduler: () => {
        console.log('12')
      }
    }
    effect(() => {
      calls++
      dummy = value.foo
    }, options)
    expect(calls).toBe(1) // 初始化响应式的时候，会执行fn（因为要初始化全局变量activeEffect实现后续的依赖追踪）
    expect(dummy).toBe(2)

    value.foo = 3  // 当实现了响应式中之后，再次修改响应式的值，进入scheduler而不是fn
    expect(calls).toBe(1)
    expect(dummy).toBe(2)

  })
});