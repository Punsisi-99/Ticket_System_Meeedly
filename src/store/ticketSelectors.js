import { defaultDashboardFilters, defaultDashboardState, defaultUiState } from './initialState'
import {
  getTotalPages as getTotalPagesHelper,
  matchesTicketFilters,
  matchesTicketSearch,
  paginateItems as paginateItemsHelper,
  sortCommentsByCreatedAt,
  sortTickets,
} from './ticketSelectorHelpers'
import { getAssignedUserDisplayName, getUserDisplayName, UNASSIGNED_LABEL } from '../utils/ticketFormatting'

// Base selectors
function getSafeState(state) {
  return state || {}
}

export function getTicketsById(state) {
  return getSafeState(state).ticketsById || {}
}

export function getTicketIds(state) {
  return getSafeState(state).ticketIds || []
}

export function getCommentsById(state) {
  return getSafeState(state).commentsById || {}
}

export function getCommentsByTicketId(state) {
  return getSafeState(state).commentsByTicketId || {}
}

export function getUsersById(state) {
  return getSafeState(state).usersById || {}
}

export function getDashboardState(state) {
  return getSafeState(state).dashboard || defaultDashboardState
}

export function getDashboardFilters(state) {
  return getDashboardState(state).filters || defaultDashboardFilters
}

export function getDashboardSearch(state) {
  return getDashboardState(state).search || ''
}

export function getDashboardSort(state) {
  return getDashboardState(state).sort || 'latest'
}

export function getUiState(state) {
  return getSafeState(state).ui || defaultUiState
}

// Entity selectors
export function getAllTickets(state) {
  const ticketsById = getTicketsById(state)

  return getTicketIds(state).map((ticketId) => ticketsById[ticketId]).filter(Boolean)
}

export function getTicketById(state, ticketId) {
  if (!ticketId) {
    return null
  }

  return getTicketsById(state)[ticketId] || null
}

export function getUserById(state, userId) {
  if (!userId) {
    return null
  }

  return getUsersById(state)[userId] || null
}

export function getCommentsForTicket(state, ticketId) {
  if (!ticketId) {
    return []
  }

  const commentsById = getCommentsById(state)
  const commentIds = getCommentsByTicketId(state)[ticketId] || []

  return commentIds.map((commentId) => commentsById[commentId]).filter(Boolean)
}

export function getSortedCommentsForTicket(state, ticketId) {
  return sortCommentsByCreatedAt(getCommentsForTicket(state, ticketId))
}

// Dashboard selectors
export function getSearchedTickets(state) {
  const search = getDashboardSearch(state)

  return getAllTickets(state).filter((ticket) => matchesTicketSearch(ticket, search))
}

export function getFilteredTickets(state) {
  const filters = getDashboardFilters(state)

  return getSearchedTickets(state).filter((ticket) => matchesTicketFilters(ticket, filters))
}

export function getSortedTickets(state) {
  return sortTickets(getFilteredTickets(state), getDashboardSort(state))
}

export function getVisibleTickets(state) {
  return getSortedTickets(state)
}

// Pagination helpers/selectors
export function paginateItems(items, currentPage, pageSize) {
  return paginateItemsHelper(items, currentPage, pageSize)
}

export function getTotalPages(totalItems, pageSize) {
  return getTotalPagesHelper(totalItems, pageSize)
}

export function getPaginatedTickets(state, currentPage, pageSize) {
  return paginateItems(getVisibleTickets(state), currentPage, pageSize)
}

// Stats selectors
export function getTicketCounts(state) {
  const tickets = getAllTickets(state)

  return {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === 'open').length,
    inProgress: tickets.filter((ticket) => ticket.status === 'in_progress').length,
    resolved: tickets.filter((ticket) => ticket.status === 'resolved').length,
    unassigned: tickets.filter((ticket) => !ticket.assignedToId).length,
    highPriority: tickets.filter((ticket) => ticket.priority === 'high').length,
  }
}

export function getQuickFilterCounts(state) {
  const counts = getTicketCounts(state)

  return {
    all: counts.total,
    open: counts.open,
    unassigned: counts.unassigned,
    highPriority: counts.highPriority,
  }
}

// Dashboard UI selectors
export function getHasActiveFilters(state) {
  const filters = getDashboardFilters(state)
  const search = getDashboardSearch(state)
  const sort = getDashboardSort(state)

  return Boolean(
    search ||
      filters.status ||
      filters.priority ||
      filters.category ||
      filters.assignedToId ||
      sort !== 'latest',
  )
}

export function getDashboardEmptyStateInfo(state) {
  const totalTickets = getAllTickets(state).length
  const visibleTickets = getVisibleTickets(state).length
  const filters = getDashboardFilters(state)
  const search = getDashboardSearch(state)
  const hasFilters = Boolean(
    filters.status || filters.priority || filters.category || filters.assignedToId,
  )
  const hasSearch = Boolean(search)
  const hasActiveFilters = getHasActiveFilters(state)
  const isCompletelyEmpty = totalTickets === 0
  const isFilteredEmpty = totalTickets > 0 && visibleTickets === 0

  if (isCompletelyEmpty) {
    return {
      isCompletelyEmpty: true,
      isFilteredEmpty: false,
      hasSearch: false,
      hasFilters: false,
      hasActiveFilters: false,
      message: 'No tickets have been submitted yet.',
      description: 'Create a ticket to start tracking support requests.',
    }
  }

  if (isFilteredEmpty) {
    return {
      isCompletelyEmpty: false,
      isFilteredEmpty: true,
      hasSearch,
      hasFilters,
      hasActiveFilters,
      message: 'No tickets match your current search or filters.',
      description: 'Try clearing filters or adjusting your search to widen the results.',
    }
  }

  return {
    isCompletelyEmpty: false,
    isFilteredEmpty: false,
    hasSearch,
    hasFilters,
    hasActiveFilters,
    message: '',
    description: '',
  }
}

export function getSupportUsers(state) {
  return Object.values(getUsersById(state)).filter(
    (user) => user?.role === 'support' || user?.role === 'manager',
  )
}

export function getAssigneeOptions(state) {
  const supportUsers = [...getSupportUsers(state)].sort((firstUser, secondUser) =>
    firstUser.name.localeCompare(secondUser.name),
  )

  return [
    { label: 'All Assignees', value: '' },
    { label: UNASSIGNED_LABEL, value: 'unassigned' },
    ...supportUsers.map((user) => ({
      label: user.name,
      value: user.id,
    })),
  ]
}

// Detail selectors
export function getTicketDetailData(state, ticketId) {
  const ticket = getTicketById(state, ticketId)

  if (!ticket) {
    return {
      ticket: null,
      creator: null,
      assignee: null,
      comments: [],
      lastReply: null,
      commentCount: 0,
    }
  }

  const comments = getSortedCommentsForTicket(state, ticketId)

  return {
    ticket,
    creator: getUserById(state, ticket.createdById),
    assignee: getUserById(state, ticket.assignedToId),
    comments,
    lastReply: comments[comments.length - 1] || null,
    commentCount: comments.length,
  }
}

export function getTicketMetaDisplayData(state, ticketId) {
  const detailData = getTicketDetailData(state, ticketId)

  if (!detailData.ticket) {
    return {
      creatorName: getUserDisplayName(null),
      assigneeName: getAssignedUserDisplayName(null),
      createdAtLabel: '',
      updatedAtLabel: '',
      lastReplyAtLabel: '',
      commentCount: 0,
    }
  }

  return {
    creatorName: getUserDisplayName(detailData.creator),
    assigneeName: getAssignedUserDisplayName(detailData.assignee),
    createdAtLabel: detailData.ticket.createdAt || '',
    updatedAtLabel: detailData.ticket.updatedAt || '',
    lastReplyAtLabel: detailData.ticket.lastReplyAt || '',
    commentCount: detailData.commentCount,
  }
}
