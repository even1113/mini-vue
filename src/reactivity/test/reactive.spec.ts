import { reactive } from '../reactive' 

describe('reactive', () => {
   it("happy test", () => {
      const original = {
         foo: 1,
         person: {
            age: 18
         }
      }
      const observed = reactive(original)
      expect(observed.foo).toBe(1)
   })
});