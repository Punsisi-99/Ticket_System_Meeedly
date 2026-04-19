import { useMemo, useState } from 'react'
import {
  createTicket as createTicketAction,
  setError,
  setLoading,
} from '../../../../store/ticketActions'
import { useTicketDispatch } from '../../../../store/TicketStore'
import { createTicket as createTicketService } from '../../../../services/ticketService'
import ticketCreateInitialValues from '../utils/ticketCreateInitialValues'
import { mapTicketFormToCreatePayload } from '../utils/ticketCreateMappers'
import {
  hasTicketCreateErrors,
  validateTicketCreateForm,
} from '../utils/ticketCreateValidation'

const CURRENT_USER_ID = 'u1'

function clearSubmissionState(setters) {
  setters.setSubmitError('')
  setters.setSubmitSuccess('')
  setters.setCreatedTicketId('')
}

export function useTicketCreate() {
  const dispatch = useTicketDispatch()
  const [values, setValues] = useState(ticketCreateInitialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const [createdTicketId, setCreatedTicketId] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })

    clearSubmissionState({ setSubmitError, setSubmitSuccess, setCreatedTicketId })
  }

  function handleReset() {
    setValues(ticketCreateInitialValues)
    setErrors({})
    clearSubmissionState({ setSubmitError, setSubmitSuccess, setCreatedTicketId })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateTicketCreateForm(values)
    setErrors(validationErrors)

    if (hasTicketCreateErrors(validationErrors)) {
      return
    }

    const payload = mapTicketFormToCreatePayload(values, CURRENT_USER_ID)

    setIsSubmitting(true)
    clearSubmissionState({ setSubmitError, setSubmitSuccess, setCreatedTicketId })
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const createdTicket = await createTicketService(payload)

      dispatch(createTicketAction(createdTicket))
      setSubmitSuccess('Your support request was submitted successfully.')
      setCreatedTicketId(createdTicket.id)
      setValues(ticketCreateInitialValues)
      setErrors({})
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create ticket'
      setSubmitError(message)
      dispatch(setError(message))
    } finally {
      setIsSubmitting(false)
      dispatch(setLoading(false))
    }
  }

  const canSubmit = useMemo(() => {
    return Boolean(values.title.trim() && values.description.trim() && !isSubmitting)
  }, [isSubmitting, values.description, values.title])

  return {
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
  }
}

export default useTicketCreate
