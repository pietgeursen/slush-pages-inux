const {start, html, pull} = require('inu')
const {App, Domain, Action} = require('inux')

const INCREMENT = Symbol('increment')
const Increment = Action(INCREMENT)

const view = ({count}, dispatch) => html`
  <div>
    My count is ${count}  
    <button onclick=${() => dispatch(Increment())}>Bump</button>
  </div>
`
const counter = Domain({
  name: 'counter',
  init: () => ({model: {
    count: 1 
  }}),
  update: {
    [INCREMENT]: (model) => ({model: {count: model.count + 1}}) 
  },
  routes: [
    ['/', (params, model, dispatch) => view(model.counter, dispatch)] 
  ]

})

const app = App([
  counter
])

const main = document.querySelector('main')
const appEl = document.createElement('div')
main.appendChild(appEl)

const {views} = start(app)

pull(
  views(),
  pull.drain((view) => html.update(appEl, view))
)

console.log('welcome to <%= name %>')
