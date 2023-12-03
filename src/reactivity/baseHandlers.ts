import { track, trigger } from "./effect"

function createGetter(isReadOnly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
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
const set = createGetter()
const readonlyGet = createGetter(true)

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