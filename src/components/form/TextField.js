import { createElement as h } from 'react'

function TextField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
}) {
  const inputId = name || label || 'text-field'

  return h(
    'div',
    { className: 'space-y-2' },
    label
      ? h(
          'label',
          { className: 'block text-sm font-medium text-slate-700', htmlFor: inputId },
          label,
          required ? h('span', { className: 'text-red-500' }, ' *') : null,
        )
      : null,
    h('input', {
      className:
        'block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500',
      id: inputId,
      name,
      type: 'text',
      value: value || '',
      onChange,
      placeholder: placeholder || '',
      required,
      disabled,
      'aria-invalid': Boolean(error),
      'aria-describedby': error ? `${inputId}-error` : undefined,
    }),
    error
      ? h(
          'p',
          { className: 'text-sm font-medium text-red-600', id: `${inputId}-error` },
          error,
        )
      : null,
  )
}

export default TextField
