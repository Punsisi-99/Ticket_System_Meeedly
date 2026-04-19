import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  assignTicket as assignTicketAction,
  clearFilters,
  setError,
  setFilters,
  setLoading,
  setSearch,
  setSort,
  updateTicketStatus as updateTicketStatusAction,
} from '../../../../store/ticketActions'
import { useTicketDispatch, useTicketState } from '../../../../store/TicketStore'
import { assignTicket, updateTicketStatus } from '../../../../services/ticketService'
import {
  getAssigneeOptions,
  getDashboardEmptyStateInfo,
  getDashboardFilters,
  getDashboardSearch,
  getDashboardSort,
  getHasActiveFilters,
  getPaginatedTickets,
  getQuickFilterCounts,
  getSupportUsers,
  getTicketCounts,
  getTotalPages,
  getVisibleTickets,
} from '../../../../store/ticketSelectors'
import useDebounce from '../../../../shared/hooks/useDebounce'
import { DASHBOARD_PAGE_SIZE } from '../utils/ticketDashboardConstants'
import {
  mapCategoryOptions,
  mapPriorityOptions,
  mapRowAssigneeOptions,
  mapSortOptions,
  mapStatusOptions,
  mapTicketRowViewModel,
} from '../utils/ticketDashboardMappers'

export function useTicketDashboard() {
  const state = useTicketState()
  const dispatch = useTicketDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [actionTicketId, setActionTicketId] = useState('')
  const [actionError, setActionError] = useState('')

  const filters = useMemo(() => getDashboardFilters(state), [state])
  const search = useMemo(() => getDashboardSearch(state), [state])
  const sort = useMemo(() => getDashboardSort(state), [state])
  const visibleTickets = useMemo(() => getVisibleTickets(state), [state])
  const paginatedTickets = useMemo(
    () => getPaginatedTickets(state, currentPage, DASHBOARD_PAGE_SIZE),
    [currentPage, state],
  )
  const ticketCounts = useMemo(() => getTicketCounts(state), [state])
  const quickFilterCounts = useMemo(() => getQuickFilterCounts(state), [state])
  const emptyStateInfo = useMemo(() => getDashboardEmptyStateInfo(state), [state])
  const supportUsers = useMemo(() => getSupportUsers(state), [state])
  const assigneeFilterOptions = useMemo(() => getAssigneeOptions(state), [state])
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 250)

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  useEffect(() => {
    if (debouncedSearch !== search) {
      dispatch(setSearch(debouncedSearch))
    }
  }, [debouncedSearch, dispatch, search])

  const totalPages = useMemo(
    () => Math.max(getTotalPages(visibleTickets.length, DASHBOARD_PAGE_SIZE), 1),
    [visibleTickets.length],
  )

  const rowAssigneeOptions = useMemo(
    () =>
      mapRowAssigneeOptions(
        supportUsers.reduce((accumulator, user) => {
          accumulator[user.id] = user
          return accumulator
        }, {}),
      ),
    [supportUsers],
  )

  const ticketRows = useMemo(
    () => paginatedTickets.map((ticket) => mapTicketRowViewModel(ticket, state.usersById)),
    [paginatedTickets, state.usersById],
  )

  const stats = useMemo(
    () => ({
      total: ticketCounts.total,
      open: ticketCounts.open,
      inProgress: ticketCounts.inProgress,
      resolved: ticketCounts.resolved,
      unassigned: ticketCounts.unassigned,
      highPriority: ticketCounts.highPriority,
    }),
    [
      ticketCounts.highPriority,
      ticketCounts.inProgress,
      ticketCounts.open,
      ticketCounts.resolved,
      ticketCounts.total,
      ticketCounts.unassigned,
    ],
  )

  const statusOptions = useMemo(() => mapStatusOptions(), [])
  const priorityOptions = useMemo(() => mapPriorityOptions(), [])
  const categoryOptions = useMemo(() => mapCategoryOptions(), [])
  const sortOptions = useMemo(() => mapSortOptions(), [])
  const hasActiveFilters = useMemo(() => getHasActiveFilters(state), [state])

  const activeFilterSummary = useMemo(() => {
    const parts = []

    if (search) {
      parts.push(`Search: "${search}"`)
    }

    if (filters.status) {
      parts.push(`Status: ${filters.status.replace('_', ' ')}`)
    }

    if (filters.priority) {
      parts.push(`Priority: ${filters.priority}`)
    }

    if (filters.category) {
      parts.push(`Category: ${filters.category}`)
    }

    if (filters.assignedToId) {
      parts.push(
        filters.assignedToId === 'unassigned' ? 'Assignee: Unassigned' : 'Assignee filtered',
      )
    }

    if (sort !== 'latest') {
      parts.push(`Sort: ${sort}`)
    }

    return parts.join(' | ')
  }, [filters.assignedToId, filters.category, filters.priority, filters.status, search, sort])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, sort, filters.status, filters.priority, filters.category, filters.assignedToId])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const handleSearchChange = useCallback((event) => {
    setSearchInput(event.target.value)
  }, [])

  const handleFilterChange = useCallback(
    (event) => {
      const { name, value } = event.target
      dispatch(setFilters({ [name]: value }))
    },
    [dispatch],
  )

  const handleSortChange = useCallback(
    (event) => {
      dispatch(setSort(event.target.value))
    },
    [dispatch],
  )

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters())
    setSearchInput('')
    setActionError('')
  }, [dispatch])

  const handleQuickFilter = useCallback(
    (filterKey) => {
      if (filterKey === 'all') {
        dispatch(clearFilters())
        setSearchInput('')
        setActionError('')
        return
      }

      if (filterKey === 'open') {
        dispatch(setFilters({ status: 'open', priority: '', category: '', assignedToId: '' }))
        return
      }

      if (filterKey === 'unassigned') {
        dispatch(
          setFilters({ status: '', priority: '', category: '', assignedToId: 'unassigned' }),
        )
        return
      }

      if (filterKey === 'highPriority') {
        dispatch(setFilters({ status: '', priority: 'high', category: '', assignedToId: '' }))
      }
    },
    [dispatch],
  )

  const handlePageChange = useCallback(
    (page) => {
      const nextPage = Math.min(Math.max(page, 1), totalPages)
      setCurrentPage(nextPage)
    },
    [totalPages],
  )

  const handleAssignTicket = useCallback(
    async (ticketId, assignedToId) => {
      setActionTicketId(ticketId)
      setActionError('')
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const updatedTicket = await assignTicket(ticketId, assignedToId)
        dispatch(
          assignTicketAction(updatedTicket.id, updatedTicket.assignedToId, updatedTicket.updatedAt),
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to assign ticket'
        setActionError(message)
        dispatch(setError(message))
      } finally {
        setActionTicketId('')
        dispatch(setLoading(false))
      }
    },
    [dispatch],
  )

  const handleStatusChange = useCallback(
    async (ticketId, status) => {
      setActionTicketId(ticketId)
      setActionError('')
      dispatch(setLoading(true))
      dispatch(setError(null))

      try {
        const updatedTicket = await updateTicketStatus(ticketId, status)
        dispatch(
          updateTicketStatusAction(updatedTicket.id, updatedTicket.status, updatedTicket.updatedAt),
        )
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to update ticket status'
        setActionError(message)
        dispatch(setError(message))
      } finally {
        setActionTicketId('')
        dispatch(setLoading(false))
      }
    },
    [dispatch],
  )

  const isTicketUpdating = useCallback(
    (ticketId) => actionTicketId === ticketId,
    [actionTicketId],
  )

  return {
    stats,
    filters,
    search: searchInput,
    sort,
    visibleTicketsCount: visibleTickets.length,
    ticketRows,
    currentPage,
    totalPages,
    hasActiveFilters,
    emptyStateInfo,
    quickFilterCounts,
    activeFilterSummary,
    actionError,
    statusOptions,
    priorityOptions,
    categoryOptions,
    sortOptions,
    assigneeFilterOptions,
    rowAssigneeOptions,
    handleSearchChange,
    handleFilterChange,
    handleSortChange,
    handleClearFilters,
    handleQuickFilter,
    handlePageChange,
    handleAssignTicket,
    handleStatusChange,
    isTicketUpdating,
  }
}

export default useTicketDashboard
