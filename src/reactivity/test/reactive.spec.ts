import { effect } from '../effect';
import { reactive } from '../reactive' 

describe('reactive', () => {
   it("happy test", () => {
      const original = {
         foo: 1,
         person: {
            age: 18
         }
      }
      let calls = 0
      effect(() => {
         calls++
         original.foo
      })
      effect(() => {
         calls++
         original.foo
      })
      const observed = reactive(original)
      expect(observed.foo).toBe(1)
      expect((calls)).toBe(2)

      const user = reactive({ age: 10 });

      let nextAge = 0;
      effect(() => {
        // 收集依赖
        nextAge = user.age + 1;
      })
      // 测试 fn 是否首次执行
      expect(nextAge).toBe(11);
      
      // 触发依赖
      user.age++;
      // 测试触发依赖
      expect(nextAge).toBe(12);
  
   })
});