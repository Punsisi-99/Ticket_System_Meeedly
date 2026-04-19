import { createComment } from '../entities/comment/comment.model'
import { TICKET_CATEGORY, TICKET_PRIORITY, TICKET_STATUS } from '../entities/ticket/ticket.constants'
import { createTicket } from '../entities/ticket/ticket.model'
import { createUser } from '../entities/user/user.model'

const users = [
  createUser({ id: 'u1', name: 'Alice Johnson', role: 'customer' }),
  createUser({ id: 'u2', name: 'Brian Lee', role: 'customer' }),
  createUser({ id: 'u3', name: 'Sarah Chen', role: 'support' }),
  createUser({ id: 'u4', name: 'Daniel Ortiz', role: 'support' }),
  createUser({ id: 'u5', name: 'Maya Patel', role: 'manager' }),
]

const tickets = [
  createTicket({
    id: 't1',
    title: 'Invoice shows duplicate subscription charge',
    description: 'Customer reports seeing the same monthly charge twice on the latest invoice.',
    status: TICKET_STATUS.OPEN,
    priority: TICKET_PRIORITY.HIGH,
    category: TICKET_CATEGORY.BILLING,
    createdById: 'u1',
    assignedToId: 'u3',
    createdAt: '2026-03-20T08:15:00.000Z',
    updatedAt: '2026-03-20T10:10:00.000Z',
    lastReplyAt: '2026-03-20T10:10:00.000Z',
    unreadCount: 1,
  }),
  createTicket({
    id: 't2',
    title: 'Unable to reset password from login page',
    description: 'Reset link appears to submit but no recovery email is received.',
    status: TICKET_STATUS.IN_PROGRESS,
    priority: TICKET_PRIORITY.HIGH,
    category: TICKET_CATEGORY.ACCOUNT,
    createdById: 'u2',
    assignedToId: 'u4',
    createdAt: '2026-03-19T11:40:00.000Z',
    updatedAt: '2026-03-20T09:35:00.000Z',
    lastReplyAt: '2026-03-20T09:35:00.000Z',
    unreadCount: 0,
  }),
  createTicket({
    id: 't3',
    title: 'Dashboard loads slowly after recent update',
    description: 'Page load feels delayed and widgets take a long time to render.',
    status: TICKET_STATUS.OPEN,
    priority: TICKET_PRIORITY.MEDIUM,
    category: TICKET_CATEGORY.TECHNICAL,
    createdById: 'u1',
    assignedToId: null,
    createdAt: '2026-03-18T14:05:00.000Z',
    updatedAt: '2026-03-18T14:05:00.000Z',
    lastReplyAt: null,
    unreadCount: 2,
  }),
  createTicket({
    id: 't4',
    title: 'Need to change billing contact email',
    description: 'Customer wants future invoices sent to a different finance address.',
    status: TICKET_STATUS.RESOLVED,
    priority: TICKET_PRIORITY.LOW,
    category: TICKET_CATEGORY.BILLING,
    createdById: 'u2',
    assignedToId: 'u3',
    createdAt: '2026-03-15T09:00:00.000Z',
    updatedAt: '2026-03-16T16:20:00.000Z',
    lastReplyAt: '2026-03-16T15:55:00.000Z',
    unreadCount: 0,
  }),
  createTicket({
    id: 't5',
    title: 'Two-factor authentication code is invalid',
    description: 'Customer cannot complete sign-in because the verification code is rejected.',
    status: TICKET_STATUS.IN_PROGRESS,
    priority: TICKET_PRIORITY.HIGH,
    category: TICKET_CATEGORY.ACCOUNT,
    createdById: 'u1',
    assignedToId: 'u4',
    createdAt: '2026-03-21T06:25:00.000Z',
    updatedAt: '2026-03-21T08:05:00.000Z',
    lastReplyAt: '2026-03-21T08:05:00.000Z',
    unreadCount: 0,
  }),
  createTicket({
    id: 't6',
    title: 'Exported report is missing columns',
    description: 'CSV export does not include several expected fields in the final file.',
    status: TICKET_STATUS.OPEN,
    priority: TICKET_PRIORITY.MEDIUM,
    category: TICKET_CATEGORY.TECHNICAL,
    createdById: 'u2',
    assignedToId: 'u3',
    createdAt: '2026-03-22T13:45:00.000Z',
    updatedAt: '2026-03-22T15:00:00.000Z',
    lastReplyAt: '2026-03-22T15:00:00.000Z',
    unreadCount: 3,
  }),
  createTicket({
    id: 't7',
    title: 'Request to close duplicate account',
    description: 'Customer accidentally created a second account and wants it removed.',
    status: TICKET_STATUS.RESOLVED,
    priority: TICKET_PRIORITY.LOW,
    category: TICKET_CATEGORY.ACCOUNT,
    createdById: 'u1',
    assignedToId: 'u4',
    createdAt: '2026-03-10T10:30:00.000Z',
    updatedAt: '2026-03-11T12:30:00.000Z',
    lastReplyAt: '2026-03-11T11:50:00.000Z',
    unreadCount: 0,
  }),
  createTicket({
    id: 't8',
    title: 'Need clarification on enterprise add-on pricing',
    description: 'Customer asks whether advanced reporting is billed per workspace or per seat.',
    status: TICKET_STATUS.OPEN,
    priority: TICKET_PRIORITY.MEDIUM,
    category: TICKET_CATEGORY.BILLING,
    createdById: 'u2',
    assignedToId: null,
    createdAt: '2026-03-23T07:20:00.000Z',
    updatedAt: '2026-03-23T07:20:00.000Z',
    lastReplyAt: null,
    unreadCount: 1,
  }),
  createTicket({
    id: 't9',
    title: 'Attachment upload fails for screenshots',
    description: 'Uploading PNG screenshots returns an error during ticket reply.',
    status: TICKET_STATUS.IN_PROGRESS,
    priority: TICKET_PRIORITY.HIGH,
    category: TICKET_CATEGORY.TECHNICAL,
    createdById: 'u1',
    assignedToId: 'u3',
    createdAt: '2026-03-24T12:00:00.000Z',
    updatedAt: '2026-03-24T13:30:00.000Z',
    lastReplyAt: '2026-03-24T13:30:00.000Z',
    unreadCount: 0,
  }),
  createTicket({
    id: 't10',
    title: 'Other request about workspace notification settings',
    description: 'Customer wants help understanding which notifications can be disabled.',
    status: TICKET_STATUS.OPEN,
    priority: TICKET_PRIORITY.LOW,
    category: TICKET_CATEGORY.OTHER,
    createdById: 'u2',
    assignedToId: null,
    createdAt: '2026-03-25T09:50:00.000Z',
    updatedAt: '2026-03-25T10:15:00.000Z',
    lastReplyAt: '2026-03-25T10:15:00.000Z',
    unreadCount: 1,
  }),
]

const comments = [
  createComment({ id: 'c1', ticketId: 't1', authorId: 'u1', authorType: 'customer', message: 'I was billed twice for the same subscription period.', createdAt: '2026-03-20T08:15:00.000Z' }),
  createComment({ id: 'c2', ticketId: 't1', authorId: 'u3', authorType: 'support', message: 'I am reviewing the invoice activity and will share an update shortly.', createdAt: '2026-03-20T10:10:00.000Z' }),

  createComment({ id: 'c3', ticketId: 't2', authorId: 'u2', authorType: 'customer', message: 'The password reset form says success but no email reaches my inbox.', createdAt: '2026-03-19T11:40:00.000Z' }),
  createComment({ id: 'c4', ticketId: 't2', authorId: 'u4', authorType: 'support', message: 'I checked delivery logs and am escalating the reset email issue.', createdAt: '2026-03-19T13:05:00.000Z' }),
  createComment({ id: 'c5', ticketId: 't2', authorId: 'u2', authorType: 'customer', message: 'Thanks, I still do not see the message in spam or promotions.', createdAt: '2026-03-20T09:35:00.000Z' }),

  createComment({ id: 'c6', ticketId: 't3', authorId: 'u1', authorType: 'customer', message: 'The dashboard takes around 15 seconds to fully display after login.', createdAt: '2026-03-18T14:05:00.000Z' }),

  createComment({ id: 'c7', ticketId: 't4', authorId: 'u2', authorType: 'customer', message: 'Please update our billing contact to finance@example.com.', createdAt: '2026-03-15T09:00:00.000Z' }),
  createComment({ id: 'c8', ticketId: 't4', authorId: 'u3', authorType: 'support', message: 'The billing contact has been updated for future invoices.', createdAt: '2026-03-16T15:55:00.000Z' }),

  createComment({ id: 'c9', ticketId: 't5', authorId: 'u1', authorType: 'customer', message: 'My authentication code is rejected immediately after entering it.', createdAt: '2026-03-21T06:25:00.000Z' }),
  createComment({ id: 'c10', ticketId: 't5', authorId: 'u4', authorType: 'support', message: 'I reset the 2FA enrollment and sent steps for reconfiguration.', createdAt: '2026-03-21T08:05:00.000Z' }),

  createComment({ id: 'c11', ticketId: 't6', authorId: 'u2', authorType: 'customer', message: 'The export works, but several columns are missing from the CSV.', createdAt: '2026-03-22T13:45:00.000Z' }),
  createComment({ id: 'c12', ticketId: 't6', authorId: 'u3', authorType: 'support', message: 'I have reproduced the missing columns issue in the export module.', createdAt: '2026-03-22T15:00:00.000Z' }),

  createComment({ id: 'c13', ticketId: 't7', authorId: 'u1', authorType: 'customer', message: 'I accidentally created a duplicate account and want it closed.', createdAt: '2026-03-10T10:30:00.000Z' }),
  createComment({ id: 'c14', ticketId: 't7', authorId: 'u4', authorType: 'support', message: 'The duplicate account has been closed and the active account remains unchanged.', createdAt: '2026-03-11T11:50:00.000Z' }),

  createComment({ id: 'c15', ticketId: 't8', authorId: 'u2', authorType: 'customer', message: 'Can you clarify how the enterprise reporting add-on is billed?', createdAt: '2026-03-23T07:20:00.000Z' }),

  createComment({ id: 'c16', ticketId: 't9', authorId: 'u1', authorType: 'customer', message: 'PNG screenshot uploads fail whenever I attach them to a reply.', createdAt: '2026-03-24T12:00:00.000Z' }),
  createComment({ id: 'c17', ticketId: 't9', authorId: 'u3', authorType: 'support', message: 'We are investigating upload validation for image attachments.', createdAt: '2026-03-24T12:40:00.000Z' }),
  createComment({ id: 'c18', ticketId: 't9', authorId: 'u1', authorType: 'customer', message: 'The issue happens in both Chrome and Edge with small files.', createdAt: '2026-03-24T13:30:00.000Z' }),

  createComment({ id: 'c19', ticketId: 't10', authorId: 'u2', authorType: 'customer', message: 'I want to understand which workspace notifications can be disabled.', createdAt: '2026-03-25T09:50:00.000Z' }),
  createComment({ id: 'c20', ticketId: 't10', authorId: 'u5', authorType: 'manager', message: 'This request will be documented for the support knowledge base.', createdAt: '2026-03-25T10:15:00.000Z' }),
]

function toByIdMap(items) {
  return items.reduce((accumulator, item) => {
    accumulator[item.id] = item
    return accumulator
  }, {})
}

function groupCommentIdsByTicketId(commentItems) {
  return commentItems.reduce((accumulator, comment) => {
    if (!accumulator[comment.ticketId]) {
      accumulator[comment.ticketId] = []
    }

    accumulator[comment.ticketId].push(comment.id)
    return accumulator
  }, {})
}

export const usersById = toByIdMap(users)
export const userIds = users.map((user) => user.id)

export const ticketsById = toByIdMap(tickets)
export const ticketIds = tickets.map((ticket) => ticket.id)

export const commentsById = toByIdMap(comments)
export const commentIds = comments.map((comment) => comment.id)
export const commentsByTicketId = groupCommentIdsByTicketId(comments)

export const mockData = {
  usersById,
  userIds,
  ticketsById,
  ticketIds,
  commentsById,
  commentIds,
  commentsByTicketId,
}
