import { mockData } from '../services/mockData'

export const defaultDashboardFilters = {
  status: '',
  priority: '',
  category: '',
  assignedToId: '',
}

export const defaultDashboardState = {
  filters: { ...defaultDashboardFilters },
  search: '',
  sort: 'latest',
}

export const defaultUiState = {
  loading: false,
  error: null,
}

export const initialState = {
  ticketsById: mockData.ticketsById,
  ticketIds: mockData.ticketIds,
  commentsById: mockData.commentsById,
  commentsByTicketId: mockData.commentsByTicketId,
  usersById: mockData.usersById,
  dashboard: {
    ...defaultDashboardState,
    filters: { ...defaultDashboardState.filters },
  },
  ui: {
    ...defaultUiState,
  },
}

export default initialState
