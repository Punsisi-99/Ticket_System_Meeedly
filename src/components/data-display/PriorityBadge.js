import { createElement as h } from 'react'
import { formatLabel } from '../../utils/formatLabel'

const PRIORITY_STYLES = {
  low: 'border-slate-200 bg-slate-100 text-slate-600',
  medium: 'border-violet-200 bg-violet-50 text-violet-700',
  high: 'border-rose-200 bg-rose-50 text-rose-700',
  default: 'border-slate-200 bg-slate-100 text-slate-600',
}

function PriorityBadge({ priority }) {
  return h(
    'span',
    {
      className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.default}`,
    },
    formatLabel(priority || 'unknown'),
  )
}

export default PriorityBadge
