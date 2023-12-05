import { effect } from '../effect'
import { reactive } from '../reactive' 

describe('effect', () => {
   it("happy test", () => {
      const obj = reactive({
         age: 10
      }) 
      let nextAge
   })

   it("should return runner when call effect", () => {
      let foo = 10
      const runner = effect(() => {
         foo++
         return "foo"
      })
      // 测试1: 首次执行 effect 时，执行一次fn
      expect(foo).toBe(11)
      const r = runner()
      // 测试2: 执行runner时，再次执行fn
      expect(foo).toBe(12)
      // 测试3: 执行runner 后，返回fn的返回值
      expect(r).toBe("foo")
   })

   // it("stop", () => {
   //    const obj = reactive({foo: 1})
   //    const runner = effect(() => {
   //       obj.foo++
   //    })

   // })
});
