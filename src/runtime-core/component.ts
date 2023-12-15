export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {}
  }
  // console.log('component', component)
  return component
}

export function setupComponent(instance) {
  // TODO
  // initProps() 
  // initSlots()
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  // 这里的component为什么等于instance.type？？=> createVnode的时候只传递了第一个参数
  const component = instance.type

  instance.proxy = new Proxy({}, {
    get(target, key) {
      const { setupState } = instance
      if ( key in setupState) {
        return setupState[key]
      }
    },
  })


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

  // 处理完组件的自身绑定的状态后，去处理subTree的
  finishComponentSetup(instance)
}

function finishComponentSetup(instance) {
  const component = instance.type
  instance.render = component.render
}

