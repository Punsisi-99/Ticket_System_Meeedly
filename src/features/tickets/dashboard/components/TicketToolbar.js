import { createElement as h, memo } from 'react'
import Button from '../../../../components/actions/Button'
import SearchInput from '../../../../components/form/SearchInput'
import SelectField from '../../../../components/form/SelectField'
import SectionCard from '../../../../components/common/SectionCard'

function navigateToCreateTicket() {
  window.history.pushState({}, '', '/tickets/new')
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function TicketToolbar({
  search,
  sort,
  sortOptions,
  hasActiveFilters,
  activeSummary,
  onSearchChange,
  onSortChange,
  onClearFilters,
}) {
  return h(
    SectionCard,
    { title: 'Search and Sort' },
    h(
      'div',
      { className: 'flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between' },
      h(
        'div',
        { className: 'w-full xl:max-w-2xl' },
        h(SearchInput, {
          value: search,
          onChange: onSearchChange,
          placeholder: 'Search by ticket title or description',
        }),
        activeSummary
          ? h('p', { className: 'mt-3 text-sm leading-6 text-slate-600' }, activeSummary)
          : null,
      ),
      h(
        'div',
        { className: 'flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end' },
        h(SelectField, {
          label: 'Sort',
          name: 'sort',
          value: sort,
          onChange: onSortChange,
          options: sortOptions,
        }),
        h(
          Button,
          {
            variant: 'secondary',
            onClick: onClearFilters,
            disabled: !hasActiveFilters,
          },
          'Clear Filters',
        ),
        h(
          Button,
          {
            variant: 'primary',
            onClick: navigateToCreateTicket,
          },
          'Create Ticket',
        ),
      ),
    ),
  )
}

export default memo(TicketToolbar)
