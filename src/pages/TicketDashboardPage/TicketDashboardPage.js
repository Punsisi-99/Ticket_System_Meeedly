import { createElement as h, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader'
import MainLayout from '../../components/layout/MainLayout'
import PageContainer from '../../components/layout/PageContainer'
import ErrorState from '../../components/feedback/ErrorState'
import TicketDashboardStats from '../../features/tickets/dashboard/components/TicketDashboardStats'
import TicketFilters from '../../features/tickets/dashboard/components/TicketFilters'
import TicketList from '../../features/tickets/dashboard/components/TicketList'
import TicketToolbar from '../../features/tickets/dashboard/components/TicketToolbar'
import { useTicketDashboard } from '../../features/tickets/dashboard/hooks/useTicketDashboard'

function TicketDashboardPage() {
  const dashboard = useTicketDashboard()
  const statsProps = useMemo(() => dashboard.stats, [dashboard.stats])

  return h(
    MainLayout,
    null,
    h(
      PageContainer,
      null,
      h(PageHeader, {
        title: 'Ticket Dashboard',
        subtitle:
          'Monitor ticket activity, manage assignments, and keep support work moving with a clean triage view.',
      }),
      dashboard.actionError
        ? h(ErrorState, {
            title: 'Dashboard action failed',
            message: dashboard.actionError,
          })
        : null,
      h(TicketDashboardStats, {
        stats: statsProps,
        quickFilterCounts: dashboard.quickFilterCounts,
        onQuickFilter: dashboard.handleQuickFilter,
      }),
      h(TicketToolbar, {
        search: dashboard.search,
        sort: dashboard.sort,
        sortOptions: dashboard.sortOptions,
        hasActiveFilters: dashboard.hasActiveFilters,
        activeSummary: dashboard.activeFilterSummary,
        onSearchChange: dashboard.handleSearchChange,
        onSortChange: dashboard.handleSortChange,
        onClearFilters: dashboard.handleClearFilters,
      }),
      h(TicketFilters, {
        filters: dashboard.filters,
        statusOptions: dashboard.statusOptions,
        priorityOptions: dashboard.priorityOptions,
        categoryOptions: dashboard.categoryOptions,
        assigneeOptions: dashboard.assigneeFilterOptions,
        onFilterChange: dashboard.handleFilterChange,
      }),
      h(TicketList, {
        tickets: dashboard.ticketRows,
        totalCount: dashboard.visibleTicketsCount,
        currentPage: dashboard.currentPage,
        totalPages: dashboard.totalPages,
        hasActiveFilters: dashboard.hasActiveFilters,
        actionError: dashboard.actionError,
        emptyStateInfo: dashboard.emptyStateInfo,
        assigneeOptions: dashboard.rowAssigneeOptions,
        statusOptions: dashboard.statusOptions,
        isTicketUpdating: dashboard.isTicketUpdating,
        onAssignTicket: dashboard.handleAssignTicket,
        onStatusChange: dashboard.handleStatusChange,
        onPageChange: dashboard.handlePageChange,
        onClearFilters: dashboard.handleClearFilters,
      }),
    ),
  )
}

export default TicketDashboardPage
