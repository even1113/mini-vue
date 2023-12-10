'use strict';

const isObject = (value) => {
    return value !== null && typeof value === "object";
};

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type
    };
    return component;
}
function setupComponent(instance) {
    // TODO
    // initProps() 
    // initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    // 这里的component为什么等于instance.type？？
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        // setupResult可能是function 也可能是object
        // 如果是function， 那么将它作为组件的render函数
        // 如果是object，那么将它注入到组件的上下文中
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // TODO 
    // 目前只处理了，setupResult是ojbect的情况
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

function render(vnode, container) {
    patch(vnode, container);
}
/**
 * description: patch函数可以处理 Component类型 和 Element类型 的VNode
 * Component 会递归调用patch处理subTree
 * Element 会直接进行渲染
 * @param vnode
 * @param container
 */
function patch(vnode, container) {
    // patch 去处理组件
    console.log(vnode);
    const { type } = vnode;
    if (typeof type === 'string') {
        processElement(vnode, container);
    }
    else if (isObject(type)) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const el = document.createElement(vnode.type);
    const { children } = vnode;
    if (typeof children === 'string') {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        mountChildren(children, el);
    }
    // props
    const { props } = vnode;
    for (const [key, value] of Object.entries(props)) {
        el.setAttribute(key, value);
    }
    container.append(el);
}
function mountChildren(children, el) {
    children.forEach((item) => {
        patch(item, el);
    });
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    // 根据vnode创建组件实例
    const instance = createComponentInstance(vnode);
    // 组件实例创建完成之后，需要初始化组件的一些状态
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // subTree 可能是 Component 类型也可能是 Element 类型
    // 调用 patch 去处理 subTree
    // Element 类型则直接挂载
    patch(subTree, container);
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // component -> vnode
            // vnode patch render
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
