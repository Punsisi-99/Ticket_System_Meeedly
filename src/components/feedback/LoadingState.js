import { createElement as h } from 'react'

function LoadingState({ message = 'Loading...' }) {
  return h(
    'div',
    {
      className: 'flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm',
      role: 'status',
      'aria-live': 'polite',
    },
    h('div', { className: 'h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900' }),
    h('p', { className: 'mt-4 text-sm font-medium text-slate-600' }, message),
  )
}

export default LoadingState
