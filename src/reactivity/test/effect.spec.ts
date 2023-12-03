import { effect } from '../effect'
import { reactive } from '../reactive' 

describe('effect', () => {
   it("happy test", () => {
      const obj = reactive({
         age: 10
      }) 
      let nextAge
   })

   it("return runner when call effect", () => {
      let foo = 10
      const runner = effect(() => {
         foo++
         return "foo"
      })
      // expect(foo).toBe(11)
      const result = runner()
      expect(foo).toBe(11)
      expect(result).toBe("foo")
   })

   // it("stop", () => {
   //    const obj = reactive({foo: 1})
   //    const runner = effect(() => {
   //       obj.foo++
   //    })

   // })
});
