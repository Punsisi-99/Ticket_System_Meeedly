import {
  TICKET_PRIORITY_LIST,
  TICKET_STATUS_LIST,
} from '../../../../entities/ticket/ticket.constants'
import { formatLabel } from '../../../../utils/formatLabel'
import {
  getUserDisplayName,
  mapValueOptions,
  UNASSIGNED_LABEL,
} from '../../../../utils/ticketFormatting'

export function formatTicketDate(dateString) {
  if (!dateString) {
    return 'N/A'
  }

  const date = new Date(dateString)

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function mapStatusOptions() {
  return mapValueOptions(TICKET_STATUS_LIST)
}

export function mapPriorityOptions() {
  return mapValueOptions(TICKET_PRIORITY_LIST)
}

export function mapAssigneeOptions(usersById) {
  const assignableUsers = Object.values(usersById)
    .filter((user) => user.role === 'support' || user.role === 'manager')
    .sort((firstUser, secondUser) => firstUser.name.localeCompare(secondUser.name))

  return [
    { label: UNASSIGNED_LABEL, value: '' },
    ...assignableUsers.map((user) => ({
      label: user.name,
      value: user.id,
    })),
  ]
}

export function getMessageAuthorLabel(user, authorType) {
  const name = getUserDisplayName(user)
  return `${name} (${formatLabel(authorType)})`
}

export function mapConversationViewModels(comments, usersById) {
  return comments.map((comment) => ({
    id: comment.id,
    authorType: comment.authorType,
    authorLabel: getMessageAuthorLabel(usersById?.[comment.authorId], comment.authorType),
    createdAtLabel: formatTicketDate(comment.createdAt),
    message: comment.message,
  }))
}
