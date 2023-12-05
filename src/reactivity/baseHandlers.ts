import { extend, isObject } from "../shared"
import { track, trigger } from "./effect"
import { ReactiveFlags, reactive, readonly } from "./reactive"

function createGetter(isReadOnly = false, shallow = false) {
  return function get(target, key) {

    // 实现 isReactive / isReadonly
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadOnly
    } else if (key === ReactiveFlags.IS_READONYL) {
      return isReadOnly
    }

    const res = Reflect.get(target, key)

    // 实现shallowReadonly: 创建只读的响应式对象，但只有第一层对象是响应式的，内层的对象都是普通对象
    if (shallow) {
      return res
    }

    // 实现reactive 和 readonly 嵌套对象
    if (isObject(res)) {
      return isReadOnly ? readonly(res) : reactive(res)
    }

    // 实现isReadOnly: 如果 isReadOnly 为 true 那么直接返回res，否则进入track开始收集依赖
    if (!isReadOnly) {
      // 收集依赖
      track(target, key)
    }
    return res
  } 
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // 触发依赖
    trigger(target, key)
    return res
  }
}

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

export const mutableHandlers = {
  get,
  set,
}

export const readonlyHandlers =  {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key} can't be set`)
    return true
  },
}

// export const shallowReactiveHandlers = {
//   get: shallowReadonlyGet, 
//   set(target, key, value) {
//     console.warn(`key:${key} can't be set`)
//     return true
//   },
// }

// 高级写法：
export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
})