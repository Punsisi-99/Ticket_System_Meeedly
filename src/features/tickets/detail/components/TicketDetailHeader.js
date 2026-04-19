import { createElement as h } from 'react'
import Button from '../../../../components/actions/Button'
import PriorityBadge from '../../../../components/data-display/PriorityBadge'
import StatusBadge from '../../../../components/data-display/StatusBadge'
import { formatLabel } from '../../../../utils/formatLabel'
import { formatTicketDate } from '../utils/ticketDetailMappers'

function goToDashboard() {
  window.history.pushState({}, '', '/tickets')
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function TicketDetailHeader({ ticket, creatorName, assigneeName }) {
  return h(
    'div',
    { className: 'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60' },
    h(
      'div',
      { className: 'space-y-4' },
      h(
        'div',
        { className: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between' },
        h(
          Button,
          {
            variant: 'ghost',
            onClick: goToDashboard,
          },
          'Back to Dashboard',
        ),
        h(
          'span',
          { className: 'inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500' },
          `Ticket ID: ${ticket.id}`,
        ),
      ),
      h('h2', { className: 'text-3xl font-semibold tracking-tight text-slate-950' }, ticket.title),
      h(
        'div',
        { className: 'flex flex-wrap items-center gap-2' },
        h(StatusBadge, { status: ticket.status }),
        h(PriorityBadge, { priority: ticket.priority }),
        h(
          'span',
          { className: 'rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500' },
          formatLabel(ticket.category),
        ),
      ),
      h(
        'p',
        { className: 'text-sm leading-6 text-slate-500' },
        `Created ${formatTicketDate(ticket.createdAt)} | Updated ${formatTicketDate(ticket.updatedAt)}`,
      ),
      h(
        'p',
        { className: 'text-sm leading-6 text-slate-600' },
        `Created by ${creatorName || 'Unknown user'} | Assigned to ${assigneeName || 'Unassigned'}`,
      ),
    ),
  )
}

export default TicketDetailHeader
