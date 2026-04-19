function getTrimmedValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateTicketReply(values) {
  const errors = {}
  const message = getTrimmedValue(values?.message)

  if (!message) {
    errors.message = 'Reply message is required'
  } else if (message.length < 2) {
    errors.message = 'Reply message must be at least 2 characters'
  } else if (message.length > 2000) {
    errors.message = 'Reply message must be 2000 characters or less'
  }

  return errors
}

export function hasTicketReplyErrors(errors) {
  return Object.keys(errors).length > 0
}
