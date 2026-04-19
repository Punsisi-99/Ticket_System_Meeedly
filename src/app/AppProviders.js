import { createElement as h } from 'react'
import { TicketProvider } from '../store/TicketStore'

function AppProviders({ children }) {
  return h(TicketProvider, null, children)
}

export default AppProviders
