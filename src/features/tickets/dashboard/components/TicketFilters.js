import { createElement as h, memo } from 'react'
import SectionCard from '../../../../components/common/SectionCard'
import SelectField from '../../../../components/form/SelectField'

function TicketFilters({
  filters,
  statusOptions,
  priorityOptions,
  categoryOptions,
  assigneeOptions,
  onFilterChange,
}) {
  return h(
    SectionCard,
    { title: 'Filters' },
    h(
      'div',
      { className: 'grid gap-4 md:grid-cols-2 xl:grid-cols-4' },
      h(SelectField, {
        label: 'Status',
        name: 'status',
        value: filters.status,
        onChange: onFilterChange,
        options: statusOptions,
        placeholder: 'All statuses',
      }),
      h(SelectField, {
        label: 'Priority',
        name: 'priority',
        value: filters.priority,
        onChange: onFilterChange,
        options: priorityOptions,
        placeholder: 'All priorities',
      }),
      h(SelectField, {
        label: 'Category',
        name: 'category',
        value: filters.category,
        onChange: onFilterChange,
        options: categoryOptions,
        placeholder: 'All categories',
      }),
      h(SelectField, {
        label: 'Assignee',
        name: 'assignedToId',
        value: filters.assignedToId,
        onChange: onFilterChange,
        options: assigneeOptions,
        placeholder: 'All assignees',
      }),
    ),
  )
}

export default memo(TicketFilters)
