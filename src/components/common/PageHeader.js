import { createElement as h } from 'react'

function PageHeader({ title, subtitle, actions }) {
  return h(
    'div',
    { className: 'flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between' },
    h(
      'div',
      { className: 'space-y-2' },
      h('p', { className: 'text-xs font-semibold uppercase tracking-[0.24em] text-slate-500' }, 'Support Workspace'),
      h('h2', { className: 'text-3xl font-semibold tracking-tight text-slate-950' }, title),
      subtitle
        ? h('p', { className: 'max-w-3xl text-sm leading-6 text-slate-600 sm:text-base' }, subtitle)
        : null,
    ),
    actions ? h('div', { className: 'flex flex-wrap items-center gap-3' }, actions) : null,
  )
}

export default PageHeader
