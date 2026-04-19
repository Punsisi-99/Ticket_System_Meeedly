import { createElement as h, memo, useCallback } from 'react'
import ErrorState from '../../../../components/feedback/ErrorState'
import SelectField from '../../../../components/form/SelectField'

function TicketDetailActions({
  ticket,
  assigneeOptions,
  priorityOptions,
  statusOptions,
  isSubmitting,
  actionError,
  onAssignTicket,
  onPriorityChange,
  onStatusChange,
}) {
  const handleAssigneeChange = useCallback(
    (event) => {
      onAssignTicket(event.target.value || null)
    },
    [onAssignTicket],
  )

  const handleStatusSelectChange = useCallback(
    (event) => {
      onStatusChange(event.target.value)
    },
    [onStatusChange],
  )

  const handlePrioritySelectChange = useCallback(
    (event) => {
      onPriorityChange(event.target.value)
    },
    [onPriorityChange],
  )

  return h(
    'div',
    { className: 'space-y-4' },
    actionError
      ? h(ErrorState, {
          title: 'Unable to update ticket',
          message: actionError,
        })
      : null,
    h(SelectField, {
      label: 'Assign ticket',
      name: `ticket-assign-${ticket.id}`,
      value: ticket.assignedToId || '',
      onChange: handleAssigneeChange,
      options: assigneeOptions,
      disabled: isSubmitting,
    }),
    h(
      'p',
      { className: 'text-sm leading-6 text-slate-500' },
      'Reassign the ticket if another support owner should take over.',
    ),
    h(SelectField, {
      label: 'Set priority',
      name: `ticket-priority-${ticket.id}`,
      value: ticket.priority || '',
      onChange: handlePrioritySelectChange,
      options: priorityOptions,
      placeholder: 'Select priority',
      disabled: isSubmitting,
    }),
    h(
      'p',
      { className: 'text-sm leading-6 text-slate-500' },
      'Choose the priority after reviewing the issue details.',
    ),
    h(SelectField, {
      label: 'Update status',
      name: `ticket-status-${ticket.id}`,
      value: ticket.status,
      onChange: handleStatusSelectChange,
      options: statusOptions,
      disabled: isSubmitting,
    }),
    h(
      'p',
      { className: 'text-sm leading-6 text-slate-500' },
      'Keep the status current so the dashboard reflects live progress.',
    ),
  )
}

export default memo(TicketDetailActions)
