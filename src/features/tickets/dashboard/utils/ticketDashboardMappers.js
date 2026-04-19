import {
  TICKET_CATEGORY_LIST,
  TICKET_PRIORITY_LIST,
  TICKET_STATUS_LIST,
} from '../../../../entities/ticket/ticket.constants'
import { formatLabel } from '../../../../utils/formatLabel'
import {
  getAssignedUserDisplayName,
  getUserDisplayName,
  mapValueOptions,
  UNASSIGNED_LABEL,
} from '../../../../utils/ticketFormatting'
import { UNASSIGNED_FILTER_VALUE } from './ticketDashboardConstants'

export function mapStatusOptions() {
  return mapValueOptions(TICKET_STATUS_LIST)
}

export function mapPriorityOptions() {
  return mapValueOptions(TICKET_PRIORITY_LIST)
}

export function mapCategoryOptions() {
  return mapValueOptions(TICKET_CATEGORY_LIST)
}

export function mapSortOptions() {
  return [
    { label: 'Latest', value: 'latest' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Priority', value: 'priority' },
  ]
}

export function mapAssigneeOptions(usersById) {
  const assignableUsers = Object.values(usersById)
    .filter((user) => user.role === 'support' || user.role === 'manager')
    .sort((firstUser, secondUser) => firstUser.name.localeCompare(secondUser.name))

  return [
    { label: UNASSIGNED_LABEL, value: UNASSIGNED_FILTER_VALUE },
    ...assignableUsers.map((user) => ({
      label: user.name,
      value: user.id,
    })),
  ]
}

export function mapRowAssigneeOptions(usersById) {
  return [
    { label: UNASSIGNED_LABEL, value: '' },
    ...mapAssigneeOptions(usersById)
      .filter((option) => option.value !== UNASSIGNED_FILTER_VALUE)
      .map((option) => ({
        label: option.label,
        value: option.value,
      })),
  ]
}

export function getTicketPreview(description, maxLength = 120) {
  if (!description) {
    return ''
  }

  if (description.length <= maxLength) {
    return description
  }

  return `${description.slice(0, maxLength).trim()}...`
}

export function formatDashboardDate(dateString) {
  if (!dateString) {
    return 'N/A'
  }

  const date = new Date(dateString)

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function mapTicketRowViewModel(ticket, usersById) {
  const assigneeName = ticket.assignedToId
    ? getUserDisplayName(usersById?.[ticket.assignedToId])
    : getAssignedUserDisplayName(null)
  const activityDate = ticket.lastReplyAt || ticket.updatedAt
  const hasReplies = Boolean(ticket.lastReplyAt)

  return {
    id: ticket.id,
    title: ticket.title,
    status: ticket.status,
    priority: ticket.priority,
    assignedToId: ticket.assignedToId || '',
    preview: getTicketPreview(ticket.description),
    categoryLabel: formatLabel(ticket.category),
    assigneeName,
    updatedLabel: formatDashboardDate(activityDate),
    activityLabel: hasReplies ? 'Last reply' : 'Updated',
    isHighPriority: ticket.priority === 'high',
    isUnassigned: !ticket.assignedToId,
  }
}
