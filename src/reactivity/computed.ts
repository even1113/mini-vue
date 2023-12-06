import { ReactiveEffect } from "./effect"

class ComputedRefImpl {
  private _getter: any
  private _dirty: boolean
  private _value: any
  private _effect: any
  constructor(getter) {
    this._getter = getter
    this._dirty = true
    this._effect = new ReactiveEffect(getter, () => {
      if(!this._dirty){
        this._dirty = true
      }
    })
    
  }
  get value() {
    // 外部调用computed时， 会返回一个computed实例， 访问这个实例的value属性时会进入get value 这个函数 ，
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run()
    }

    return this._value
    
  }
}
export function computed(getter) {
  return new ComputedRefImpl(getter) 
}