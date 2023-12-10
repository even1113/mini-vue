export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type
  }

  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps() 
  // initSlots()
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  // 这里的component为什么等于instance.type？？
  const component = instance.type
  const { setup } = component

  if (setup) {
    const setupResult = setup()
    // setupResult可能是function 也可能是object
    // 如果是function， 那么将它作为组件的render函数
    // 如果是object，那么将它注入到组件的上下文中
    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance, setupResult: any) {
  // TODO 
  // 目前只处理了，setupResult是ojbect的情况
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const Component = instance.type

  instance.render = Component.render
}

