import { createElement as h } from 'react'
import { classNames } from '../../utils/classNames'

function SectionCard({ title, children, className }) {
  return h(
    'section',
    {
      className: classNames(
        'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6',
        className,
      ),
    },
    title
      ? h(
          'div',
          { className: 'mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4' },
          h('h3', { className: 'text-lg font-semibold tracking-tight text-slate-950' }, title),
        )
      : null,
    h('div', { className: 'space-y-4' }, children),
  )
}

export default SectionCard
