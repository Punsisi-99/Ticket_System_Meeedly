import { createElement as h, useMemo } from 'react'
import EmptyState from '../../components/feedback/EmptyState'
import ErrorState from '../../components/feedback/ErrorState'
import LoadingState from '../../components/feedback/LoadingState'
import SectionCard from '../../components/common/SectionCard'
import MainLayout from '../../components/layout/MainLayout'
import PageContainer from '../../components/layout/PageContainer'
import PageHeader from '../../components/common/PageHeader'
import TicketConversation from '../../features/tickets/detail/components/TicketConversation'
import TicketDetailActions from '../../features/tickets/detail/components/TicketDetailActions'
import TicketDetailHeader from '../../features/tickets/detail/components/TicketDetailHeader'
import TicketMetaPanel from '../../features/tickets/detail/components/TicketMetaPanel'
import TicketReplyForm from '../../features/tickets/detail/components/TicketReplyForm'
import { formatTicketDate } from '../../features/tickets/detail/utils/ticketDetailMappers'
import { useTicketDetail } from '../../features/tickets/detail/hooks/useTicketDetail'

function TicketDetailPage({ ticketId }) {
  const detail = useTicketDetail(ticketId)
  const conversationProps = useMemo(() => detail.conversationItems, [detail.conversationItems])

  if (detail.isLoading) {
    return h(
      MainLayout,
      null,
      h(
        PageContainer,
        null,
        h(PageHeader, {
          title: 'Ticket Details',
          subtitle: `Selected ticket ID: ${ticketId || 'N/A'}`,
        }),
        h(LoadingState, { message: 'Loading ticket details...' }),
      ),
    )
  }

  if (detail.loadError) {
    return h(
      MainLayout,
      null,
      h(
        PageContainer,
        null,
        h(PageHeader, {
          title: 'Ticket Details',
          subtitle: `Selected ticket ID: ${ticketId || 'N/A'}`,
        }),
        h(ErrorState, {
          title: 'Unable to load ticket',
          message: detail.loadError,
        }),
      ),
    )
  }

  if (detail.notFound || !detail.ticket) {
    return h(
      MainLayout,
      null,
      h(
        PageContainer,
        null,
        h(PageHeader, {
          title: 'Ticket Details',
          subtitle: `Selected ticket ID: ${ticketId || 'N/A'}`,
        }),
        h(EmptyState, {
          title: 'Ticket not found',
          description: 'The requested ticket could not be found. It may have been removed or the link may be incorrect.',
          action: h(
            'a',
            {
              href: '/tickets',
              'data-route-link': 'true',
              className:
                'inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100',
            },
            'Back to Dashboard',
          ),
        }),
      ),
    )
  }

  return h(
    MainLayout,
    null,
    h(
      PageContainer,
      null,
      h(PageHeader, {
        title: 'Ticket Details',
        subtitle: 'Review ticket information, conversation history, and support actions.',
      }),
      h(TicketDetailHeader, {
        ticket: detail.ticket,
        creatorName: detail.metaDisplayData.creatorName,
        assigneeName: detail.metaDisplayData.assigneeName,
      }),
      h(
        'div',
        { className: 'grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(20rem,0.95fr)]' },
        h(
          'div',
          { className: 'space-y-6' },
          h(
            SectionCard,
            { title: 'Ticket Overview' },
            h(
              'p',
              { className: 'text-sm leading-6 text-slate-500' },
              `Created by ${detail.metaDisplayData.creatorName} on ${formatTicketDate(detail.ticket.createdAt)}`,
            ),
            h(
              'p',
              { className: 'whitespace-pre-wrap text-sm leading-7 text-slate-700' },
              detail.ticket.description,
            ),
          ),
          h(
            SectionCard,
            { title: 'Conversation History' },
            h(TicketConversation, { messages: conversationProps }),
          ),
          h(
            SectionCard,
            { title: 'Add Reply' },
            h(TicketReplyForm, {
              value: detail.replyValue,
              error: detail.replyError,
              submitError: detail.replySubmitError,
              submitSuccess: detail.replySuccess,
              isSubmitting: detail.isReplySubmitting,
              onChange: detail.handleReplyChange,
              onSubmit: detail.handleReplySubmit,
              onReset: detail.handleReplyReset,
            }),
          ),
        ),
        h(
          'div',
          { className: 'space-y-6' },
          h(
            SectionCard,
            { title: 'Metadata' },
            h(TicketMetaPanel, { items: detail.metaItems }),
          ),
          h(
            SectionCard,
            { title: 'Actions' },
            h(TicketDetailActions, {
              ticket: detail.ticket,
              assigneeOptions: detail.assigneeOptions,
              priorityOptions: detail.priorityOptions,
              statusOptions: detail.statusOptions,
              isSubmitting: detail.isActionSubmitting,
              actionError: detail.actionError,
              onAssignTicket: detail.handleAssignTicket,
              onPriorityChange: detail.handlePriorityChange,
              onStatusChange: detail.handleStatusChange,
            }),
          ),
        ),
      ),
    ),
  )
}

export default TicketDetailPage
