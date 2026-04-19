import { ACTION_TYPES } from './actionTypes'
import { defaultDashboardFilters } from './initialState'

function updateTicket(state, ticketId, updates) {
  const currentTicket = state.ticketsById[ticketId]

  if (!currentTicket) {
    return state
  }

  return {
    ...state,
    ticketsById: {
      ...state.ticketsById,
      [ticketId]: {
        ...currentTicket,
        ...updates,
      },
    },
  }
}

function createTicketState(state, ticket) {
  return {
    ...state,
    ticketsById: {
      ...state.ticketsById,
      [ticket.id]: ticket,
    },
    ticketIds: [...state.ticketIds, ticket.id],
  }
}

function addReplyState(state, comment) {
  const existingCommentIds = state.commentsByTicketId[comment.ticketId] || []
  const targetTicket = state.ticketsById[comment.ticketId]

  if (!targetTicket) {
    return state
  }

  return {
    ...state,
    commentsById: {
      ...state.commentsById,
      [comment.id]: comment,
    },
    commentsByTicketId: {
      ...state.commentsByTicketId,
      [comment.ticketId]: [...existingCommentIds, comment.id],
    },
    ticketsById: {
      ...state.ticketsById,
      [comment.ticketId]: {
        ...targetTicket,
        updatedAt: comment.createdAt,
        lastReplyAt: comment.createdAt,
      },
    },
  }
}

function setDashboardFilters(state, filters) {
  return {
    ...state,
    dashboard: {
      ...state.dashboard,
      filters: {
        ...state.dashboard.filters,
        ...filters,
      },
    },
  }
}

function clearDashboardFilters(state) {
  return {
    ...state,
    dashboard: {
      ...state.dashboard,
      filters: { ...defaultDashboardFilters },
      search: '',
      sort: 'latest',
    },
  }
}

export function ticketReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LOAD_INITIAL_DATA:
      return {
        ...state,
        ...action.payload,
      }

    case ACTION_TYPES.CREATE_TICKET:
      return createTicketState(state, action.payload)

    case ACTION_TYPES.ADD_REPLY:
      return addReplyState(state, action.payload)

    case ACTION_TYPES.ASSIGN_TICKET:
      return updateTicket(state, action.payload.ticketId, {
        assignedToId: action.payload.assignedToId,
        updatedAt: action.payload.updatedAt,
      })

    case ACTION_TYPES.UPDATE_TICKET_PRIORITY:
      return updateTicket(state, action.payload.ticketId, {
        priority: action.payload.priority,
        updatedAt: action.payload.updatedAt,
      })

    case ACTION_TYPES.UPDATE_TICKET_STATUS:
      return updateTicket(state, action.payload.ticketId, {
        status: action.payload.status,
        updatedAt: action.payload.updatedAt,
      })

    case ACTION_TYPES.SET_FILTERS:
      return setDashboardFilters(state, action.payload)

    case ACTION_TYPES.SET_SEARCH:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          search: action.payload,
        },
      }

    case ACTION_TYPES.SET_SORT:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          sort: action.payload,
        },
      }

    case ACTION_TYPES.CLEAR_FILTERS:
      return clearDashboardFilters(state)

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: action.payload,
        },
      }

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
        },
      }

    default:
      return state
  }
}

export default ticketReducer
