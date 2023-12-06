import { unref } from "vue"
import { hasChanged, isObject } from "../shared"
import { trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"

/**
 * ref 接受 1 true “1” 这样的基本数据类的值
 * 但是proxy只能代理对象，于是对于传入的值将其改造成一个RefImpl的实例对象
 * 通过对这个对象进行get 和 set 操作进行拦截，达到的响应的目的
 */
class RefImpl {
  private _value: any
  private dep: any
  private _rawValue: any
  private _v_isRef = true
  constructor(value) {
    this._rawValue = value // 存储开始的值
    this._value = convert(value) // 如果不是响应式的对象需要转换成响应式的，如果只是普通数据类型的数据那么不管
    this.dep = new Set()
  }

  get value() {
    // 收集依赖
    trackEffects(this.dep)
    return this._value
  }

  set value(newValue) {
    // 触发依赖
    // 这里比较的是数据是 一个是proxy 一个是原始值 （ 受限于 Object.is() ），所以需要转换
    if (hasChanged(newValue, this._rawValue)) { // 判断当前值和原来的值是否相等 如果相等则不触发更新
      this._rawValue = newValue // 原始值也需要更新，因为下次新旧值对比的时候，拿的是_rawValue进行对比的
      this._value = convert(newValue)  // 注意需要修改value之后再去通知effect执行 
      triggerEffects(this.dep)
    }  
    
  }
}
export function convert(value) {
  return isObject(value) ? reactive(value) : value
}
export function ref(value) {
  return new RefImpl(value)
}
export function isRef(ref) {
  return !!ref._v_isRef  // 如果是ref那么自然会返回自己身上的_v_isRef属性值，如果不是的话那么会返回undefined 为了返回布尔值在前面加上!!
}
export function unRef(ref) { 
  return isRef(ref) ? ref.value : ref // 如果是ref 返回 ref.value 否则 返回 value本身
}
export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      // get : 如果是 ref 那么返回ref.value 否则 返回 value本身（基本数据类型）
      return unRef(Reflect.get(target, key))
    },
    set(target, key, value) {
      // 判断 当前对象属性值 和 传入的值 是否是ref
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}