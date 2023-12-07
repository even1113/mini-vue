import { render } from "./renderer"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // component -> vnode
      // vnode path render

      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    }
  }
}