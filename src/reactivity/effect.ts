let affectEffect //定义全局变量获取到effect
class ReactiveEffect {
  private _fn: any

  constructor(fn, public schedule?) {
    this._fn = fn
  }
  run() {
    affectEffect = this // 将ReactiveEffect实例赋给全局变量affectEffect
    return this._fn()  // “runner” 把执行结果返回出去
  }
}

/**
 *  effect 函数接受一个函数作为第一个参数，接受schedule作为第二个参数，当effec执行的时候只会返回一个runner函数
 *  runner 函数执行的时候，会将传入进来的fn执行一遍，并将fn执行的结果返回出去
 * @param fn 
 * @param options 
 * @returns 
 */
export function effect(fn: any, options: any = {}) {
  const _effect = new ReactiveEffect(fn , options.schedule)
  const runner =  _effect.run.bind(_effect)  // 把方法返回出去，相当于返回了runner函数，但是指针需要指向当前effect实例
  return runner  // return _effect.run 如果不写bind的话，调用这个函数时的调用者就是window对象了
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
  dep.add(affectEffect)
}

// 实现trigger
export function trigger(target, key) {
  let depMap = targetMap.get(target)
  let effects = depMap.get(key)
  for (const effect of effects) {

    if (effect.schedule) {
      effect.schedule()
    } else {
      effect.run()
    }
  }
}