import { createElement as h } from 'react'
import AppProviders from './AppProviders'
import AppRouter from './AppRouter'

function App() {
  return h(AppProviders, null, h(AppRouter))
}

export default App
