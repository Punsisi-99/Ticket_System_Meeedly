import { TICKET_CATEGORY_LIST, TICKET_PRIORITY_LIST, TICKET_STATUS_LIST } from '../entities/ticket/ticket.constants'
import {
  assignTicketRecord,
  createReplyRecord,
  createTicketRecord,
  fetchAllTickets,
  fetchCommentsByTicketId,
  fetchTicketById,
  resetMockDatabase,
  updateTicketPriorityRecord,
  updateTicketStatusRecord,
} from './mockTicketApi'

function requireValue(value, message) {
  if (value === undefined || value === null || value === '') {
    throw new Error(message)
  }
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeOptionalString(value) {
  const normalizedValue = normalizeString(value)
  return normalizedValue || ''
}

function validateAllowedValue(value, allowedValues, message) {
  if (value && !allowedValues.includes(value)) {
    throw new Error(message)
  }
}

export async function getTickets() {
  return fetchAllTickets()
}

export async function getTicketById(ticketId) {
  requireValue(ticketId, 'Ticket ID is required')
  return fetchTicketById(ticketId)
}

export async function getCommentsByTicketId(ticketId) {
  requireValue(ticketId, 'Ticket ID is required')
  return fetchCommentsByTicketId(ticketId)
}

export async function createTicket(ticketInput) {
  const title = normalizeString(ticketInput?.title)
  const description = normalizeString(ticketInput?.description)
  const createdById = normalizeString(ticketInput?.createdById)
  const category = normalizeOptionalString(ticketInput?.category)
  const priority = normalizeOptionalString(ticketInput?.priority)

  requireValue(title, 'Ticket title is required')
  requireValue(description, 'Ticket description is required')
  requireValue(createdById, 'Created by ID is required')

  validateAllowedValue(category, TICKET_CATEGORY_LIST, 'Invalid ticket category')
  validateAllowedValue(priority, TICKET_PRIORITY_LIST, 'Invalid ticket priority')

  return createTicketRecord({
    title,
    description,
    createdById,
    category: category || undefined,
    priority: priority || undefined,
  })
}

export async function addReply(replyInput) {
  const ticketId = normalizeString(replyInput?.ticketId)
  const authorId = normalizeString(replyInput?.authorId)
  const authorType = normalizeString(replyInput?.authorType)
  const message = normalizeString(replyInput?.message)

  requireValue(ticketId, 'Ticket ID is required')
  requireValue(authorId, 'Author ID is required')
  requireValue(authorType, 'Author type is required')
  requireValue(message, 'Reply message is required')

  return createReplyRecord({
    ticketId,
    authorId,
    authorType,
    message,
  })
}

export async function assignTicket(ticketId, assignedToId) {
  const normalizedTicketId = normalizeString(ticketId)

  requireValue(normalizedTicketId, 'Ticket ID is required')

  return assignTicketRecord(normalizedTicketId, normalizeOptionalString(assignedToId) || null)
}

export async function updateTicketStatus(ticketId, status) {
  const normalizedTicketId = normalizeString(ticketId)
  const normalizedStatus = normalizeString(status)

  requireValue(normalizedTicketId, 'Ticket ID is required')
  requireValue(normalizedStatus, 'Status is required')
  validateAllowedValue(normalizedStatus, TICKET_STATUS_LIST, 'Invalid ticket status')

  return updateTicketStatusRecord(normalizedTicketId, normalizedStatus)
}

export async function updateTicketPriority(ticketId, priority) {
  const normalizedTicketId = normalizeString(ticketId)
  const normalizedPriority = normalizeString(priority)

  requireValue(normalizedTicketId, 'Ticket ID is required')
  requireValue(normalizedPriority, 'Priority is required')
  validateAllowedValue(normalizedPriority, TICKET_PRIORITY_LIST, 'Invalid ticket priority')

  return updateTicketPriorityRecord(normalizedTicketId, normalizedPriority)
}

export async function resetTicketsData() {
  return resetMockDatabase()
}
