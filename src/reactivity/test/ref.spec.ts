import { effect } from '../effect'
import { reactive } from '../reactive'
import { isRef, ref, unRef, proxyRefs } from '../ref'
describe("ref", () => {
  it("happy path", () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  it("should be reactive", () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    // 触发 a 的 set 函数，
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)

    // same value should not trigger 
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })

  it("should make nested properties reactive", () => {
    const a = ref({
      count: 1,
    })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    // ref 复杂数据类型 触发 set 操作
    a.value.count = 2 
    expect(dummy).toBe(2)
  })

  it("isRef", () => {
    const a = ref(1)
    const b = reactive({
      name: '123'
    })
    const c = 2
    expect(isRef(a)).toBe(true)
    expect(isRef(b)).toBe(false)
    expect(isRef(1)).toBe(false)
    expect(isRef(c)).toBe(false)
  })

  it("unRef", () => {
    const a = ref(1)
    const c = 2
    expect(unRef(a)).toBe(1)
    expect(unRef(c)).toBe(2)
  })

  it("proxyRefs", () => {
    const user = {
      age: ref(1),
      name: "zhangsan",
    }
    const proxyUser = proxyRefs(user)

    //  get 
    expect(user.age.value).toBe(1)
    expect(proxyUser.name).toBe("zhangsan")
    expect(proxyUser.age).toBe(1)  // expect(proxyUser.age.value).toBe(1)  省去了value的操作
    


    // set  
    proxyUser.age = 20
    expect(proxyUser.age).toBe(20)
    expect(user.age.value).toBe(20)

    proxyUser.age = ref(20)
    expect(proxyUser.age).toBe(20)
    expect(user.age.value).toBe(20)

  })

})