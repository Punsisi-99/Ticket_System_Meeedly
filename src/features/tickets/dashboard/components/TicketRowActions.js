import { createElement as h, memo, useCallback } from 'react'
import ErrorState from '../../../../components/feedback/ErrorState'
import SelectField from '../../../../components/form/SelectField'

function TicketRowActions({
  ticketId,
  assignedToId,
  status,
  assigneeOptions,
  statusOptions,
  isUpdating,
  actionError,
  onAssignTicket,
  onStatusChange,
}) {
  const handleAssigneeChange = useCallback(
    (event) => {
      onAssignTicket(ticketId, event.target.value || null)
    },
    [onAssignTicket, ticketId],
  )

  const handleStatusSelectChange = useCallback(
    (event) => {
      onStatusChange(ticketId, event.target.value)
    },
    [onStatusChange, ticketId],
  )

  return h(
    'div',
    { className: 'grid w-full gap-3 xl:w-72' },
    actionError
      ? h(ErrorState, {
          title: 'Action failed',
          message: actionError,
        })
      : null,
    h(SelectField, {
      label: 'Assign',
      name: `assignee-${ticketId}`,
      value: assignedToId || '',
      onChange: handleAssigneeChange,
      options: assigneeOptions,
      disabled: isUpdating,
    }),
    h(SelectField, {
      label: 'Status',
      name: `status-${ticketId}`,
      value: status,
      onChange: handleStatusSelectChange,
      options: statusOptions,
      disabled: isUpdating,
    }),
    h(
      'a',
      {
        className: 'inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100',
        href: `/tickets/${ticketId}`,
        'data-route-link': 'true',
      },
      'View',
    ),
  )
}

export default memo(TicketRowActions)
