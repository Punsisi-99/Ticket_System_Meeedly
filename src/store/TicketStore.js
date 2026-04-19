import { createContext, createElement as h, useContext, useReducer } from 'react'
import initialState from './initialState'
import ticketReducer from './ticketReducer'

export const TicketStateContext = createContext(null)
export const TicketDispatchContext = createContext(null)

export function TicketProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, initialState)

  return h(
    TicketStateContext.Provider,
    { value: state },
    h(TicketDispatchContext.Provider, { value: dispatch }, children),
  )
}

export function useTicketState() {
  const context = useContext(TicketStateContext)

  if (context === null) {
    throw new Error('useTicketState must be used within a TicketProvider.')
  }

  return context
}

export function useTicketDispatch() {
  const context = useContext(TicketDispatchContext)

  if (context === null) {
    throw new Error('useTicketDispatch must be used within a TicketProvider.')
  }

  return context
}
