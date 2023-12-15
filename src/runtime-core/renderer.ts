import { isObject } from '../shared/index'
import { createComponentInstance, setupComponent } from './component'
export function render(vnode, container) {
  patch(vnode, container)
}

/**
 * description: patch函数可以处理 Component类型 和 Element类型 的VNode
 * Component 会递归调用patch处理subTree
 * Element 会直接进行渲染
 * @param vnode 
 * @param container 
 */
export function patch(vnode, container) {
  // patch 去处理组件
  console.log('render--patch--fistline', vnode)
  const { type } = vnode
  if (typeof type === 'string') {
    processElement(vnode, container)
  } else if (isObject(type)) {
    processComponent(vnode, container)
  }
}
export function processElement(vnode, container) {
  mountElement(vnode, container)
}
export function mountElement(vnode, container) {
  const el = document.createElement(vnode.type)
  const { children } = vnode

  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(children, el)
  }

  // props
  const { props } = vnode
  for (const [key, value] of Object.entries(props)) {
    el.setAttribute(key, value)
  }
  container.append(el)
}

function mountChildren(children, el) {
  children.forEach((item) => {
    patch(item, el)
  })
}

export function processComponent(vnode, container) {
  mountComponent(vnode, container)
}

export function mountComponent(vnode: any, container) {
  // 根据vnode创建组件实例
  const instance = createComponentInstance(vnode)

  // 组件实例创建完成之后，需要初始化组件的一些状态
  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)
  console.log('renderer--subTree', instance, subTree)
  // subTree 可能是 Component 类型也可能是 Element 类型
  // 调用 patch 去处理 subTree
  // Element 类型则直接挂载
  patch(subTree, container)
}

