import { effect } from '../effect'
import { reactive } from '../reactive' 

describe('effect', () => {
   it("happy test", () => {
      const obj = reactive({
         age: 10
      }) 
      let nextAge
      effect(() => {
         nextAge = obj.age + 1
      })
      expect(nextAge).toBe(11)

      obj.age++
      expect(nextAge).toBe(12)

   })
});