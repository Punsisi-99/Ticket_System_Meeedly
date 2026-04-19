import { createElement as h } from 'react'

function renderMetaItem(label, value) {
  return h(
    'div',
    { className: 'rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3', key: label },
    h(
      'dt',
      { className: 'text-xs font-semibold uppercase tracking-[0.2em] text-slate-500' },
      label,
    ),
    h('dd', { className: 'mt-2 text-sm font-medium text-slate-900' }, value),
  )
}

function TicketMetaPanel({ items }) {
  return h(
    'dl',
    { className: 'grid gap-3' },
    ...items.map((item) => renderMetaItem(item.label, item.value)),
  )
}

export default TicketMetaPanel
