import { createComment } from '../entities/comment/comment.model'
import { createTicket } from '../entities/ticket/ticket.model'
import { mockData } from './mockData'
import { generateId } from '../utils/generateId'
import { getCurrentIsoDate } from '../utils/date'

const MOCK_DELAY_MS = 200

let database = createDatabaseSnapshot()

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function createDatabaseSnapshot() {
  return {
    ticketsById: deepClone(mockData.ticketsById),
    ticketIds: deepClone(mockData.ticketIds),
    commentsById: deepClone(mockData.commentsById),
    commentsByTicketId: deepClone(mockData.commentsByTicketId),
    usersById: deepClone(mockData.usersById),
  }
}

function resolveAfterDelay(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(deepClone(value))
    }, MOCK_DELAY_MS)
  })
}

function getTicketOrThrow(ticketId) {
  const ticket = database.ticketsById[ticketId]

  if (!ticket) {
    throw new Error('Ticket not found')
  }

  return ticket
}

function getCommentsForTicket(ticketId) {
  const commentIds = database.commentsByTicketId[ticketId] || []

  return commentIds
    .map((commentId) => database.commentsById[commentId])
    .filter(Boolean)
}

export async function fetchAllTickets() {
  return resolveAfterDelay({
    ticketsById: database.ticketsById,
    ticketIds: database.ticketIds,
    usersById: database.usersById,
  })
}

export async function fetchTicketById(ticketId) {
  const ticket = getTicketOrThrow(ticketId)
  const comments = getCommentsForTicket(ticketId)

  return resolveAfterDelay({
    ticket,
    comments,
    assignedUser: ticket.assignedToId ? database.usersById[ticket.assignedToId] || null : null,
    createdByUser: ticket.createdById ? database.usersById[ticket.createdById] || null : null,
  })
}

export async function fetchCommentsByTicketId(ticketId) {
  getTicketOrThrow(ticketId)

  return resolveAfterDelay(getCommentsForTicket(ticketId))
}

export async function createTicketRecord(ticketData) {
  const timestamp = getCurrentIsoDate()
  const ticket = createTicket({
    ...ticketData,
    id: generateId('ticket'),
    createdAt: timestamp,
    updatedAt: timestamp,
    lastReplyAt: null,
    unreadCount: 0,
  })

  database = {
    ...database,
    ticketsById: {
      ...database.ticketsById,
      [ticket.id]: ticket,
    },
    ticketIds: [...database.ticketIds, ticket.id],
  }

  return resolveAfterDelay(ticket)
}

export async function createReplyRecord(commentData) {
  const ticket = getTicketOrThrow(commentData.ticketId)
  const timestamp = getCurrentIsoDate()
  const comment = createComment({
    ...commentData,
    id: generateId('comment'),
    createdAt: timestamp,
  })
  const existingCommentIds = database.commentsByTicketId[comment.ticketId] || []

  database = {
    ...database,
    commentsById: {
      ...database.commentsById,
      [comment.id]: comment,
    },
    commentsByTicketId: {
      ...database.commentsByTicketId,
      [comment.ticketId]: [...existingCommentIds, comment.id],
    },
    ticketsById: {
      ...database.ticketsById,
      [comment.ticketId]: {
        ...ticket,
        updatedAt: timestamp,
        lastReplyAt: timestamp,
      },
    },
  }

  return resolveAfterDelay(comment)
}

export async function assignTicketRecord(ticketId, assignedToId) {
  const ticket = getTicketOrThrow(ticketId)
  const timestamp = getCurrentIsoDate()
  const updatedTicket = {
    ...ticket,
    assignedToId: assignedToId || null,
    updatedAt: timestamp,
  }

  database = {
    ...database,
    ticketsById: {
      ...database.ticketsById,
      [ticketId]: updatedTicket,
    },
  }

  return resolveAfterDelay(updatedTicket)
}

export async function updateTicketStatusRecord(ticketId, status) {
  const ticket = getTicketOrThrow(ticketId)
  const timestamp = getCurrentIsoDate()
  const updatedTicket = {
    ...ticket,
    status,
    updatedAt: timestamp,
  }

  database = {
    ...database,
    ticketsById: {
      ...database.ticketsById,
      [ticketId]: updatedTicket,
    },
  }

  return resolveAfterDelay(updatedTicket)
}

export async function updateTicketPriorityRecord(ticketId, priority) {
  const ticket = getTicketOrThrow(ticketId)
  const timestamp = getCurrentIsoDate()
  const updatedTicket = {
    ...ticket,
    priority,
    updatedAt: timestamp,
  }

  database = {
    ...database,
    ticketsById: {
      ...database.ticketsById,
      [ticketId]: updatedTicket,
    },
  }

  return resolveAfterDelay(updatedTicket)
}

export async function resetMockDatabase() {
  database = createDatabaseSnapshot()

  return resolveAfterDelay({
    ticketsById: database.ticketsById,
    ticketIds: database.ticketIds,
    commentsById: database.commentsById,
    commentsByTicketId: database.commentsByTicketId,
    usersById: database.usersById,
  })
}
