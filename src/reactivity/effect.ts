let affectEffect //定义全局变量获取到effect
class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    affectEffect = this // 将ReactiveEffect实例赋给全局变量affectEffect
    this._fn()
  }
}
export function effect(fn: any) {
  // fn
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

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

export function trigger(target, key) {
  let depMap = targetMap.get(target)
  let effects = depMap.get(key)
  for (const effect of effects) {
    effect.run()
  }
}