import { createElement as h, memo } from 'react'
import Button from '../../../../components/actions/Button'
import ErrorState from '../../../../components/feedback/ErrorState'
import TextAreaField from '../../../../components/form/TextAreaField'

function TicketReplyForm({
  value,
  error,
  submitError,
  submitSuccess,
  isSubmitting,
  onChange,
  onSubmit,
  onReset,
}) {
  return h(
    'form',
    { className: 'space-y-4', onSubmit: onSubmit, noValidate: true },
    submitSuccess
      ? h(
          'div',
          {
            className:
              'rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700',
            role: 'status',
            'aria-live': 'polite',
          },
          submitSuccess,
        )
      : null,
    submitError
      ? h(ErrorState, {
          title: 'Unable to send reply',
          message: submitError,
        })
      : null,
    h(TextAreaField, {
      label: 'Reply',
      name: 'message',
      value,
      onChange,
      placeholder: 'Write a clear response with next steps, context, or resolution details.',
      required: true,
      disabled: isSubmitting,
      error,
      rows: 6,
    }),
    h(
      'p',
      { className: 'text-sm leading-6 text-slate-500' },
      'Replies are visible in the ticket conversation history.',
    ),
    h(
      'div',
      { className: 'flex justify-end' },
      h(
        'p',
        { className: 'text-xs font-medium uppercase tracking-wide text-slate-500' },
        `${value.trim().length}/2000 characters`,
      ),
    ),
    h(
      'div',
      { className: 'flex flex-wrap gap-3 pt-1' },
      h(
        Button,
        {
          type: 'submit',
          variant: 'primary',
          disabled: isSubmitting,
        },
        isSubmitting ? 'Sending...' : 'Send Reply',
      ),
      h(
        Button,
        {
          type: 'button',
          variant: 'ghost',
          disabled: isSubmitting,
          onClick: onReset,
        },
        'Clear',
      ),
    ),
  )
}

export default memo(TicketReplyForm)
