import { createComponentInstance, setupComponent } from './component'
export function render(vnode, container) {
  patch(vnode, container)
}

export function patch(vnode, container) {
  // patch 去处理组件
  processComponent(vnode, container)
}

export function processComponent(vnode, container) {
  mountComponent(vnode)
}

export function mountComponent(vnode: any) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
}