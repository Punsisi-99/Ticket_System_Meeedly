import { createElement as h } from 'react'
import Button from '../../../../components/actions/Button'
import ErrorState from '../../../../components/feedback/ErrorState'
import SelectField from '../../../../components/form/SelectField'
import TextAreaField from '../../../../components/form/TextAreaField'
import TextField from '../../../../components/form/TextField'
import { TICKET_CATEGORY_LIST } from '../../../../entities/ticket/ticket.constants'
import { formatLabel } from '../../../../utils/formatLabel'
import { useTicketCreate } from '../hooks/useTicketCreate'
import { mapConstantValuesToOptions } from '../utils/ticketCreateMappers'

const categoryOptions = mapConstantValuesToOptions(TICKET_CATEGORY_LIST, formatLabel)

function TicketCreateForm() {
  const {
    values,
    errors,
    isSubmitting,
    submitError,
    submitSuccess,
    createdTicketId,
    canSubmit,
    handleChange,
    handleSubmit,
    handleReset,
  } = useTicketCreate()

  return h(
    'form',
    { className: 'space-y-4', onSubmit: handleSubmit, noValidate: true },
    submitSuccess
      ? h(
          'div',
          {
            className: 'rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700',
            role: 'status',
            'aria-live': 'polite',
          },
          h('p', { className: 'text-sm font-semibold' }, submitSuccess),
          createdTicketId
            ? h(
                'p',
                { className: 'mt-1 text-sm text-emerald-700/90' },
                `Ticket ID: ${createdTicketId}`,
              )
            : null,
          h(
            'div',
            { className: 'mt-4 flex flex-wrap gap-3' },
            h(
              'a',
              {
                href: '/tickets',
                'data-route-link': 'true',
                className: 'text-sm font-semibold text-emerald-800 underline underline-offset-4',
              },
              'Go to Dashboard',
            ),
            createdTicketId
              ? h(
                  'a',
                  {
                    href: `/tickets/${createdTicketId}`,
                    'data-route-link': 'true',
                    className: 'text-sm font-semibold text-emerald-800 underline underline-offset-4',
                  },
                  'View Ticket',
                )
              : null,
          ),
        )
      : null,
    submitError
      ? h(ErrorState, {
          title: 'Unable to create ticket',
          message: submitError,
        })
      : null,
    h(TextField, {
      label: 'Title',
      name: 'title',
      value: values.title,
      onChange: handleChange,
      placeholder: 'Example: Unable to reset password after enabling 2FA',
      required: true,
      disabled: isSubmitting,
      error: errors.title,
    }),
    h(
      'p',
      { className: 'text-sm leading-6 text-slate-500' },
      'Use a short, specific summary so support can understand the issue quickly.',
    ),
    h(SelectField, {
      label: 'Category',
      name: 'category',
      value: values.category,
      onChange: handleChange,
      options: categoryOptions,
      required: true,
      disabled: isSubmitting,
      error: errors.category,
    }),
    h(TextAreaField, {
      label: 'Description',
      name: 'description',
      value: values.description,
      onChange: handleChange,
      placeholder:
        'Describe what happened, what you expected, when it started, and any steps or context that may help support reproduce the issue.',
      required: true,
      disabled: isSubmitting,
      error: errors.description,
      rows: 7,
    }),
    h(
      'p',
      { className: 'text-sm leading-6 text-slate-500' },
      'Include relevant pages, expected behavior, and anything you already tried. Priority will be set later by the support team.',
    ),
    h(
      'div',
      { className: 'flex justify-end' },
      h(
        'p',
        { className: 'text-xs font-medium uppercase tracking-wide text-slate-500' },
        `${values.description.trim().length}/1000 characters`,
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
          disabled: !canSubmit,
        },
        isSubmitting ? 'Submitting...' : 'Submit Ticket',
      ),
      h(
        Button,
        {
          type: 'button',
          variant: 'ghost',
          disabled: isSubmitting,
          onClick: handleReset,
        },
        'Reset',
      ),
    ),
  )
}

export default TicketCreateForm
