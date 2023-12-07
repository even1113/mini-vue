export function createComponentInstance(vnode: any) {
  const component = {
    vnode
  }

  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps() initSlots()
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  throw new Error("Function not implemented.")
}

