import { createElement as h } from 'react'

function SearchInput({ value, onChange, placeholder, disabled = false }) {
  return h(
    'div',
    { className: 'relative' },
    h('span', { className: 'pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400' }, '⌕'),
    h('input', {
      className:
        'block w-full rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500',
      type: 'search',
      value: value || '',
      onChange,
      placeholder: placeholder || 'Search',
      disabled,
      'aria-label': 'Search',
    }),
  )
}

export default SearchInput
