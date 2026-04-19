import { createElement as h, memo } from 'react'
import EmptyState from '../../../../components/feedback/EmptyState'
import Pagination from '../../../../components/common/Pagination'
import SectionCard from '../../../../components/common/SectionCard'
import TicketListRow from './TicketListRow'

function TicketList({
  tickets,
  totalCount,
  currentPage,
  totalPages,
  hasActiveFilters,
  actionError,
  emptyStateInfo,
  assigneeOptions,
  statusOptions,
  isTicketUpdating,
  onAssignTicket,
  onStatusChange,
  onPageChange,
  onClearFilters,
}) {
  const emptyAction = emptyStateInfo?.isCompletelyEmpty
    ? h(
        'a',
        {
          href: '/tickets/new',
          'data-route-link': 'true',
          className:
            'inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100',
        },
        'Create a ticket',
      )
    : hasActiveFilters
      ? h(
          'button',
          {
            className:
              'inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100',
            type: 'button',
            onClick: onClearFilters,
          },
          'Clear filters',
        )
      : null

  return h(
    SectionCard,
    { title: 'Tickets' },
    tickets.length === 0
      ? h(EmptyState, {
          title: emptyStateInfo?.message || 'No tickets available',
          description:
            emptyStateInfo?.description || 'Try changing your filters, search term, or sort settings.',
          action: emptyAction,
        })
      : h(
          'div',
          { className: 'space-y-4' },
          h(
            'div',
            {
              className:
                'flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3',
            },
            h(
              'p',
              { className: 'text-sm font-medium text-slate-700' },
              `${totalCount} ticket${totalCount === 1 ? '' : 's'} found`,
            ),
          ),
          ...tickets.map((ticket) =>
            h(TicketListRow, {
              key: ticket.id,
              ticket,
              assigneeOptions,
              statusOptions,
              isUpdating: isTicketUpdating(ticket.id),
              actionError,
              onAssignTicket,
              onStatusChange,
            }),
          ),
          h(Pagination, {
            currentPage,
            totalPages,
            onPageChange,
          }),
        ),
  )
}

export default memo(TicketList)
