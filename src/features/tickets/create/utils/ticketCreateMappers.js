import { mapValueOptions } from '../../../../utils/ticketFormatting'

function getTrimmedValue(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export function mapTicketFormToCreatePayload(values, currentUserId) {
  return {
    title: getTrimmedValue(values?.title),
    description: getTrimmedValue(values?.description),
    category: getTrimmedValue(values?.category),
    createdById: currentUserId,
  }
}

export function mapConstantValuesToOptions(values, formatLabel) {
  return mapValueOptions(values, formatLabel)
}
