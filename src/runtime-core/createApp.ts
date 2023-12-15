import { render } from "./renderer"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // component -> vnode
      // vnode patch render
      // console.log('mount', rootComponent)
      const vnode = createVNode(rootComponent)
      // console.log('mount', vnode)

      render(vnode, rootContainer)
    }
  }
}