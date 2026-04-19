import { createElement as h } from 'react'
import { classNames } from '../../utils/classNames'

const VARIANT_CLASSES = {
  primary:
    'border border-slate-900 bg-slate-900 text-white hover:bg-slate-800 hover:border-slate-800',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100',
  danger:
    'border border-red-600 bg-red-600 text-white hover:border-red-500 hover:bg-red-500',
  ghost:
    'border border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200',
}

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}) {
  return h(
    'button',
    {
      className: classNames(
        'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-slate-900/15 disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary,
      ),
      onClick,
      type,
      disabled,
    },
    children,
  )
}

export default Button
