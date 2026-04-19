import { createElement as h, memo } from 'react'
import { classNames } from '../../../../utils/classNames'

const AUTHOR_TYPE_STYLES = {
  customer: 'border-slate-200 bg-white',
  support: 'border-blue-200 bg-blue-50/70',
  manager: 'border-amber-200 bg-amber-50/70',
}

function TicketMessageItem({ message }) {
  return h(
    'article',
    {
      className: classNames(
        'rounded-3xl border p-5 shadow-sm',
        AUTHOR_TYPE_STYLES[message.authorType] || AUTHOR_TYPE_STYLES.customer,
      ),
    },
    h(
      'div',
      { className: 'mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between' },
      h('strong', { className: 'text-sm font-semibold text-slate-900' }, message.authorLabel),
      h(
        'span',
        { className: 'text-xs font-medium uppercase tracking-wide text-slate-500' },
        message.createdAtLabel,
      ),
    ),
    h('p', { className: 'whitespace-pre-wrap text-sm leading-6 text-slate-700' }, message.message),
  )
}

export default memo(TicketMessageItem)
