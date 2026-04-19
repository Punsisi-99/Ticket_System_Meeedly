import { createElement as h } from 'react'

function EmptyState({ title, description, action }) {
  return h(
    'div',
    { className: 'rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center' },
    h(
      'div',
      { className: 'mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-500 shadow-sm' },
      '•',
    ),
    h('h3', { className: 'text-lg font-semibold text-slate-950' }, title),
    description
      ? h('p', { className: 'mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600' }, description)
      : null,
    action ? h('div', { className: 'mt-5 flex justify-center' }, action) : null,
  )
}

export default EmptyState
