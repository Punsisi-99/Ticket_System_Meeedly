import { defaultDashboardFilters } from './initialState'

const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1,
}

export function normalizeSearchText(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

export function matchesText(value, searchText) {
  if (!searchText) {
    return true
  }

  return String(value || '').toLowerCase().includes(searchText)
}

export function matchesTicketSearch(ticket, searchText) {
  const normalizedSearch = normalizeSearchText(searchText)

  if (!normalizedSearch) {
    return true
  }

  return (
    matchesText(ticket?.title, normalizedSearch) ||
    matchesText(ticket?.description, normalizedSearch)
  )
}

export function matchesTicketFilters(ticket, filters = defaultDashboardFilters) {
  if (!ticket) {
    return false
  }

  if (filters.status && ticket.status !== filters.status) {
    return false
  }

  if (filters.priority && ticket.priority !== filters.priority) {
    return false
  }

  if (filters.category && ticket.category !== filters.category) {
    return false
  }

  if (filters.assignedToId) {
    if (filters.assignedToId === 'unassigned') {
      return !ticket.assignedToId
    }

    if (ticket.assignedToId !== filters.assignedToId) {
      return false
    }
  }

  return true
}

export function sortTickets(tickets, sortValue) {
  const items = [...tickets]

  if (sortValue === 'oldest') {
    return items.sort(
      (firstTicket, secondTicket) =>
        new Date(firstTicket?.createdAt || 0).getTime() -
        new Date(secondTicket?.createdAt || 0).getTime(),
    )
  }

  if (sortValue === 'priority') {
    return items.sort((firstTicket, secondTicket) => {
      const priorityDifference =
        (PRIORITY_ORDER[secondTicket?.priority] || 0) - (PRIORITY_ORDER[firstTicket?.priority] || 0)

      if (priorityDifference !== 0) {
        return priorityDifference
      }

      return (
        new Date(secondTicket?.updatedAt || 0).getTime() -
        new Date(firstTicket?.updatedAt || 0).getTime()
      )
    })
  }

  return items.sort(
    (firstTicket, secondTicket) =>
      new Date(secondTicket?.updatedAt || 0).getTime() -
      new Date(firstTicket?.updatedAt || 0).getTime(),
  )
}

export function sortCommentsByCreatedAt(comments) {
  return [...comments].sort(
    (firstComment, secondComment) =>
      new Date(firstComment?.createdAt || 0).getTime() -
      new Date(secondComment?.createdAt || 0).getTime(),
  )
}

export function getTotalPages(totalItems, pageSize) {
  const safePageSize = Number(pageSize)

  if (!safePageSize || safePageSize <= 0) {
    return 0
  }

  return Math.ceil(Math.max(totalItems, 0) / safePageSize)
}

export function paginateItems(items, currentPage, pageSize) {
  const safeItems = Array.isArray(items) ? items : []
  const safePageSize = Number(pageSize)
  const safePage = Number(currentPage)

  if (!safePageSize || safePageSize <= 0) {
    return []
  }

  if (!safePage || safePage <= 0) {
    return []
  }

  const totalPages = getTotalPages(safeItems.length, safePageSize)

  if (safePage > totalPages) {
    return []
  }

  const startIndex = (safePage - 1) * safePageSize

  return safeItems.slice(startIndex, startIndex + safePageSize)
}
