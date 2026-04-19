import { createElement as h } from 'react'

function ErrorState({ title = 'Something went wrong', message, action }) {
  return h(
    'div',
    {
      className: 'rounded-2xl border border-red-200 bg-red-50 px-5 py-4',
      role: 'alert',
    },
    h('h3', { className: 'text-sm font-semibold text-red-700' }, title),
    message ? h('p', { className: 'mt-1 text-sm leading-6 text-red-600' }, message) : null,
    action ? h('div', { className: 'mt-4' }, action) : null,
  )
}

export default ErrorState
