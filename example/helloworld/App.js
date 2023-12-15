import { h } from '../../lib/even-mini-vue.esm.js'
export const App = {
  render() {
    return h('div', {
      id: 'root',
      class: ['success']
    }, [
      h('p', { class: 'blue' }, 'even'),
      h('p', { class: 'red' }, 'what is this'),
      h('p', { class: 'yellow' }, 'this is mini vue'),
      h('p', { class: 'pink' }, this.msg),
    ])
  },
  setup() {
    return {
      msg: 'hello world - hhhh'
    }
  }
}