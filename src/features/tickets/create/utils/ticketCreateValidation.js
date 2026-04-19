function getTrimmedValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateTicketCreateForm(values) {
  const errors = {}
  const title = getTrimmedValue(values?.title)
  const description = getTrimmedValue(values?.description)
  const category = getTrimmedValue(values?.category)

  if (!title) {
    errors.title = 'Title is required'
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters'
  } else if (title.length > 100) {
    errors.title = 'Title must be 100 characters or less'
  }

  if (!description) {
    errors.description = 'Description is required'
  } else if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters'
  } else if (description.length > 1000) {
    errors.description = 'Description must be 1000 characters or less'
  }

  if (!category) {
    errors.category = 'Category is required'
  }

  return errors
}

export function hasTicketCreateErrors(errors) {
  return Object.keys(errors).length > 0
}
