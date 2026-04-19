import { createElement as h, memo } from 'react'
import Button from '../../../../components/actions/Button'
import SectionCard from '../../../../components/common/SectionCard'

function renderStatItem(label, value) {
  return h(
    'div',
    {
      className:
        'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm shadow-slate-200/50',
      key: label,
    },
    h(
      'span',
      { className: 'block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500' },
      label,
    ),
    h(
      'strong',
      { className: 'mt-2 block text-3xl font-semibold tracking-tight text-slate-950' },
      String(value),
    ),
  )
}

function TicketDashboardStats({ stats, quickFilterCounts, onQuickFilter }) {
  return h(
    SectionCard,
    { title: 'Ticket Summary' },
    h(
      'div',
      { className: 'space-y-4' },
      h(
        'div',
        { className: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3' },
        renderStatItem('Total', stats.total),
        renderStatItem('Open', stats.open),
        renderStatItem('In Progress', stats.inProgress),
        renderStatItem('Resolved', stats.resolved),
        renderStatItem('Unassigned', stats.unassigned),
        renderStatItem('High Priority', stats.highPriority),
      ),
      h(
        'div',
        { className: 'flex flex-wrap gap-2' },
        h(Button, { variant: 'ghost', onClick: () => onQuickFilter('all') }, `All (${quickFilterCounts.all})`),
        h(Button, { variant: 'ghost', onClick: () => onQuickFilter('open') }, `Open (${quickFilterCounts.open})`),
        h(Button, { variant: 'ghost', onClick: () => onQuickFilter('unassigned') }, `Unassigned (${quickFilterCounts.unassigned})`),
        h(Button, { variant: 'ghost', onClick: () => onQuickFilter('highPriority') }, `High Priority (${quickFilterCounts.highPriority})`),
      ),
    ),
  )
}

export default memo(TicketDashboardStats)
