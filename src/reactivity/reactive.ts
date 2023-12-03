import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONYL = "__v_isReadonly",
}
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
} 

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONYL]
} 

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

export function shallowReaonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers)

}
function createActiveObject(raw: any, baseHandlers: any) {
  return new Proxy(raw, baseHandlers)
}