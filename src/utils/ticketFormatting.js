import { formatLabel } from './formatLabel'

export const UNKNOWN_USER_LABEL = 'Unknown user'
export const UNASSIGNED_LABEL = 'Unassigned'

export function getUserDisplayName(user) {
  return user?.name || UNKNOWN_USER_LABEL
}

export function getAssignedUserDisplayName(user) {
  return user?.name || UNASSIGNED_LABEL
}

export function mapValueOptions(values, labelFormatter = formatLabel) {
  return values.map((value) => ({
    label: labelFormatter(value),
    value,
  }))
}
