import { createElement as h, memo } from 'react'
import EmptyState from '../../../../components/feedback/EmptyState'
import TicketMessageItem from './TicketMessageItem'

function TicketConversation({ messages }) {
  if (!messages.length) {
    return h(EmptyState, {
      title: 'No conversation history yet',
      description: 'Replies from support and customers will appear here.',
    })
  }

  return h(
    'div',
    { className: 'space-y-4' },
    ...messages.map((message) =>
      h(TicketMessageItem, {
        key: message.id,
        message,
      }),
    ),
  )
}

export default memo(TicketConversation)
