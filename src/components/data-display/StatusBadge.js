import { createElement as h } from 'react'
import { formatLabel } from '../../utils/formatLabel'

const STATUS_STYLES = {
  open: 'border-blue-200 bg-blue-50 text-blue-700',
  in_progress: 'border-amber-200 bg-amber-50 text-amber-700',
  resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  default: 'border-slate-200 bg-slate-100 text-slate-600',
}

function StatusBadge({ status }) {
  return h(
    'span',
    {
      className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${STATUS_STYLES[status] || STATUS_STYLES.default}`,
    },
    formatLabel(status || 'unknown'),
  )
}

export default StatusBadge
