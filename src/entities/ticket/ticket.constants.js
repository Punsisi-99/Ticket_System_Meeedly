export const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
}

export const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

export const TICKET_CATEGORY = {
  BILLING: 'billing',
  TECHNICAL: 'technical',
  ACCOUNT: 'account',
  OTHER: 'other',
}

export const TICKET_STATUS_LIST = Object.values(TICKET_STATUS)
export const TICKET_PRIORITY_LIST = Object.values(TICKET_PRIORITY)
export const TICKET_CATEGORY_LIST = Object.values(TICKET_CATEGORY)
