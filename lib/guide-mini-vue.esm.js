function setupComponent(instance) {
    // TODO
    // initProps() initSlots()
    setupStatefulComponent();
}
function setupStatefulComponent(instance) {
    throw new Error("Function not implemented.");
}

function render(vnode, container) {
    patch();
}
function patch(vnode, container) {
    // patch 去处理组件
    processComponent();
}
function processComponent(vnode, container) {
    mountComponent();
}
function mountComponent(vnode) {
    setupComponent();
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            render();
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
