import { TICKET_CATEGORY } from '../../../../entities/ticket/ticket.constants'

export const ticketCreateInitialValues = {
  title: '',
  description: '',
  category: TICKET_CATEGORY.OTHER,
}

export default ticketCreateInitialValues
