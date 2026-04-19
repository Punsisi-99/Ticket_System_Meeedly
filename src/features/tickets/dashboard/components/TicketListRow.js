import { createElement as h, memo } from 'react'
import PriorityBadge from '../../../../components/data-display/PriorityBadge'
import StatusBadge from '../../../../components/data-display/StatusBadge'
import TicketRowActions from './TicketRowActions'

function TicketListRow({
  ticket,
  assigneeOptions,
  statusOptions,
  isUpdating,
  actionError,
  onAssignTicket,
  onStatusChange,
}) {
  return h(
    'article',
    {
      className: `flex flex-col gap-5 rounded-3xl border p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md xl:flex-row xl:items-start xl:justify-between ${ticket.isHighPriority ? 'border-rose-200 bg-rose-50/50' : ticket.isUnassigned ? 'border-amber-200 bg-amber-50/40' : 'border-slate-200 bg-white'}`,
    },
    h(
      'div',
      { className: 'min-w-0 flex-1' },
      h(
        'div',
        { className: 'flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between' },
        h(
          'a',
          {
            className: 'text-lg font-semibold tracking-tight text-slate-950 transition hover:text-slate-700',
            href: `/tickets/${ticket.id}`,
            'data-route-link': 'true',
          },
          ticket.title,
        ),
        h(
          'div',
          { className: 'flex flex-wrap gap-2' },
          h(StatusBadge, { status: ticket.status }),
          h(PriorityBadge, { priority: ticket.priority }),
        ),
      ),
      h('p', { className: 'mt-3 text-sm leading-6 text-slate-600' }, ticket.preview),
      h(
        'div',
        { className: 'mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500' },
        h('span', null, `Category: ${ticket.categoryLabel}`),
        h('span', null, `Assignee: ${ticket.assigneeName}`),
        h('span', null, `${ticket.activityLabel}: ${ticket.updatedLabel}`),
      ),
    ),
    h(TicketRowActions, {
      ticketId: ticket.id,
      assignedToId: ticket.assignedToId,
      status: ticket.status,
      assigneeOptions,
      statusOptions,
      isUpdating,
      actionError,
      onAssignTicket,
      onStatusChange,
    }),
  )
}

export default memo(TicketListRow)
