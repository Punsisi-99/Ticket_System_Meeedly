import { ACTION_TYPES } from './actionTypes'

export function loadInitialData(payload) {
  return {
    type: ACTION_TYPES.LOAD_INITIAL_DATA,
    payload,
  }
}

export function createTicket(ticket) {
  return {
    type: ACTION_TYPES.CREATE_TICKET,
    payload: ticket,
  }
}

export function addReply(comment) {
  return {
    type: ACTION_TYPES.ADD_REPLY,
    payload: comment,
  }
}

export function assignTicket(ticketId, assignedToId, updatedAt = new Date().toISOString()) {
  return {
    type: ACTION_TYPES.ASSIGN_TICKET,
    payload: {
      ticketId,
      assignedToId,
      updatedAt,
    },
  }
}

export function updateTicketPriority(ticketId, priority, updatedAt = new Date().toISOString()) {
  return {
    type: ACTION_TYPES.UPDATE_TICKET_PRIORITY,
    payload: {
      ticketId,
      priority,
      updatedAt,
    },
  }
}

export function updateTicketStatus(ticketId, status, updatedAt = new Date().toISOString()) {
  return {
    type: ACTION_TYPES.UPDATE_TICKET_STATUS,
    payload: {
      ticketId,
      status,
      updatedAt,
    },
  }
}

export function setFilters(filters) {
  return {
    type: ACTION_TYPES.SET_FILTERS,
    payload: filters,
  }
}

export function setSearch(search) {
  return {
    type: ACTION_TYPES.SET_SEARCH,
    payload: search,
  }
}

export function setSort(sort) {
  return {
    type: ACTION_TYPES.SET_SORT,
    payload: sort,
  }
}

export function clearFilters() {
  return {
    type: ACTION_TYPES.CLEAR_FILTERS,
  }
}

export function setLoading(loading) {
  return {
    type: ACTION_TYPES.SET_LOADING,
    payload: loading,
  }
}

export function setError(error) {
  return {
    type: ACTION_TYPES.SET_ERROR,
    payload: error,
  }
}
