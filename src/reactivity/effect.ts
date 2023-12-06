import { extend } from "../shared"

let activeEffect //定义全局变量获取到effect
export class ReactiveEffect {
  private _fn: any
  public scheduler: Function | undefined

  constructor(fn, scheduler?: Function) {
    this._fn = fn
    this.scheduler = scheduler
  }
  
  run() {
    if (!this._fn) return 
    activeEffect = this // 将ReactiveEffect实例赋给全局变量activeEffect
    return this._fn()  // “runner” 把 fn 的执行结果返回出去
  }
}

// 实现track
const targetMap = new Map()
export function track(target, key) {
  let depMaps = targetMap.get(target)
  if (!depMaps) {
    depMaps = new Map()
    targetMap.set(target, depMaps)
  }
  let dep = depMaps.get(key)
  if (!dep) {
    dep = new Set()
    depMaps.set(key, dep)
  }

  trackEffects(dep)

}

// 实现 dep 收集依赖
export function trackEffects(dep) {
    if(dep.has(activeEffect)) return 
    dep.add(activeEffect)
}

// 实现trigger
export function trigger(target, key) {
  let depMap = targetMap.get(target)
  let dep = depMap.get(key)
  triggerEffects(dep)
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

/**
 *  effect 函数接受一个函数作为第一个参数，接受scheduler作为第二个参数，当effec执行的时候只会返回一个runner函数
 *  runner 函数执行的时候，会将传入进来的fn执行一遍，并将fn执行的结果返回出去
 * @param fn 
 * @param options 
 * @returns 
 */
export function effect(fn: any, options: any = {}) {
  const _effect = new ReactiveEffect(fn , options.scheduler)
  extend(_effect, options)

  _effect.run() // 执行一遍effect中的fn函数，但不接受fn的返回值

  const runner = _effect.run.bind(_effect)

  return runner  // 其实是为了返回一个函数才需要使用bind的，但是bind又需要绑定一个this指向，为了让this指向当前实例所以传入的是当前实例
}
