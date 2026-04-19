import { TICKET_CATEGORY, TICKET_STATUS } from './ticket.constants'

export function getEmptyTicket() {
  return {
    id: '',
    title: '',
    description: '',
    status: TICKET_STATUS.OPEN,
    priority: null,
    category: TICKET_CATEGORY.OTHER,
    createdById: '',
    assignedToId: null,
    createdAt: '',
    updatedAt: '',
    lastReplyAt: null,
    unreadCount: 0,
  }
}

export function createTicket(data = {}) {
  return {
    ...getEmptyTicket(),
    ...data,
  }
}
